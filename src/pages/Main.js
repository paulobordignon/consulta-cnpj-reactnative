import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Main() {
  const navigation = useNavigation();

  function handleNavigateToReadQRCode() {
    navigation.navigate('ReadQRCode');
  }

  return (
    <View style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../images/logo.png')} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitButton} onPress={handleNavigateToReadQRCode}>
          <Text style={styles.submitButtonText}>Consultar CNPJ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
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
})