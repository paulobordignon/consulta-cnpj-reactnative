import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Landing() {
  const navigation = useNavigation();

  function handleNavigateToSearchCnpj() {
    navigation.navigate('SearchCnpj');
  }

  return (
    <View style={styles.background}>
      <View style={styles.containerLogo}>
        <Image source={require('../../images/logoteste.png')} />
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.submitButton} onPress={handleNavigateToSearchCnpj}>
          <Text style={styles.submitButtonText}>Consultar CNPJ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}