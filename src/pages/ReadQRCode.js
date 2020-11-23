import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../services/api';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export default function ReadQRCode() {

  const navigation = useNavigation();

  function handleNavigateToMain() {
    navigation.navigate('Main');
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cnpj, setCNPJ] = useState(null);
  const [ultimaConsulta, setUltimaConsulta] = useState('a');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists empresas (id integer primary key not null, razaoSocial text, cnpj text);"
      );
    });
  }, []);

  async function saveRepository(repository) {
    const data = {
      razaoSocial: repository.nome,
      cnpj: repository.cnpj,
    };
    db.transaction(
      tx => {
        tx.executeSql("insert into empresas (razaoSocial, cnpj) values (?, ?)", [data.razaoSocial, data.cnpj]);
        tx.executeSql("select * from empresas order by id desc limit 1", [], (_, { rows: { _array } }) =>
          //console.log(JSON.stringify(_array))
          setUltimaConsulta(_array)
        );
      },
    );

  }

  async function handleCNPJSubmit() {
    try {
      const response = await api.get(`/cnpj/${cnpj}`);
      await saveRepository(response.data);
    } catch (err) {
      console.log(err);
    }

  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setCNPJ(data);
    alert(`O QRCode foi escaneado com sucesso.`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando acesso a camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }

  return (

    <View style={styles.background}>

      <View style={styles.header}>
        <View style={styles.topBar}>
          <BorderlessButton onPress={handleNavigateToMain}>
            <Feather name="arrow-left" size={25} color="#fafafa" />
          </BorderlessButton>
          <Text style={styles.topBarText}>Consulte o CNPJ</Text>
        </View>
        <Text style={styles.title}>Realizamos consultas através da leitura de QRCode.</Text>
      </View>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barCode}
      />


      <View style={styles.container}>

        {scanned && <Text style={styles.text}>CNPJ: {cnpj}</Text>}

        <TouchableOpacity style={styles.submitButton} onPress={() => setScanned(false)}>
          <Text style={styles.submitButtonText}>Ler QRCode Novamente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleCNPJSubmit}>
          <Text style={styles.submitButtonText}>Consultar CNPJ</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.lastContainer}>
        <Text style={styles.textTitle}>Última Consulta</Text>
        <Text style={styles.text}>Razão Social: {ultimaConsulta[0].razaoSocial}</Text>
        <Text style={styles.text}>CNPJ: {ultimaConsulta[0].cnpj}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    padding: 40,
    backgroundColor: '#103A75',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    color: '#fafafa',
  },
  title: {
    fontFamily: 'Nunito_600SemiBold',
    color: '#FFF',
    fontSize: 18,
    lineHeight: 25,
    maxWidth: 260,
    marginVertical: 20,
  },
  barCode: {
    marginTop: 10,
    padding: 150,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  lastContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  submitButton: {
    backgroundColor: '#103A75',
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 7,
  },
  submitButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 17,
    color: '#fafafa',
  },
  text: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 17,
    color: '#444444',
  },
  textTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 20,
    color: '#444444',
  },
})