import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export default function SearchCnpj() {
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

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setCNPJ(data);
    alert(`O QRCode foi escaneado com sucesso.`);
  };

  async function handleCNPJSubmit() {
    try {
      const response = await api.get(`/cnpj/${cnpj}`);
      await saveRepository(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function saveRepository(repository) {
    const data = {
      razaoSocial: repository.nome,
      cnpj: repository.cnpj,
    };
    db.transaction(
      tx => {
        tx.executeSql("insert into empresas (razaoSocial, cnpj) values (?, ?)", [data.razaoSocial, data.cnpj]);
        tx.executeSql("select * from empresas order by id desc limit 1", [], (_, { rows: { _array } }) =>
          setUltimaConsulta(_array)
        );
      },
    );
  }

  if (hasPermission === null) {
    return <Text>Solicitando acesso a camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }

  return (

    <ScrollView style={styles.background}>

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
        <TouchableOpacity style={styles.submitButton} onPress={handleCNPJSubmit} onPressOut={() => setScanned(false)}>
          <Text style={styles.submitButtonText}>Nova Consulta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastContainer}>
        {ultimaConsulta != 'a' && <Text style={styles.textTitle}>Última consulta realizada</Text>}
        {ultimaConsulta != 'a' && <Text style={styles.text}>Razão Social: {ultimaConsulta[0].razaoSocial}</Text>}
        {ultimaConsulta != 'a' && <Text style={styles.text}>CNPJ: {ultimaConsulta[0].cnpj}</Text>}
      </View>

    </ScrollView>
  );
}