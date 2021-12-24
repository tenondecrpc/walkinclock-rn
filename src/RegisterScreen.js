import React, {useState, useEffect} from 'react';
import {
  View, Text, TextInput, StyleSheet, StatusBar as RnStatusBar, TouchableOpacity, Button, Alert,
  TouchableWithoutFeedback, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import fingerprint from '../src/icon/fingerprint.png';

export default RegisterScreen = ({navigation}) => {
  const [name, setName] = useState();
  const [dni, setDni] = useState();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log("Is Biometric Supported", compatible);
      setIsBiometricSupported(compatible);
      handleBiometricAuth();
    })();
  }, []);

  const fallBackToDefaultAuth = () => {
    console.log('fall back to dni authentication');
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (dni) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your dni',
        'Biometric Authentication not supported',
        'OK',
        () => fallBackToDefaultAuth()
      );

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        'Biometric record not found',
        'Please login with your dni',
        'OK',
        () => fallBackToDefaultAuth()
      );

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Verificación de huella',
      cancelLabel: 'Cancelar',
      disableDeviceFallback: true,
    });
    // Log the user in on success
    if (biometricAuth) console.log('success');

    console.log('isBiometricAvailable', { isBiometricAvailable });
    console.log('supportedBiometrics', { supportedBiometrics });
    console.log('savedBiometrics', { savedBiometrics });
    console.log('biometricAuth', { biometricAuth });

    AsyncStorage.setItem('@auth', 'YES');
    AsyncStorage.setItem('@name', name);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameTitle}>Nombre</Text>
        <TextInput style={styles.nameValue} value={name} placeholder="Verifique su nombre" />
      </View>
      <View style={styles.dniContainer}>
        <Text style={styles.dniTitle}>Documento</Text>
        <TextInput style={styles.dniValue} value={dni}  placeholder="Verifique su documento" />
      </View>
      <TouchableWithoutFeedback onPress={handleBiometricAuth}>
        <Image
          style={styles.image}
          source={fingerprint}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.registerButtonContainer}>
        <Button
          title="Registrar"
          color="green"
          onPress={handleBiometricAuth}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: RnStatusBar.currentHeight,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  nameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 26,
    marginRight: 10
  },
  nameValue: {
    width: 250,
    height: 40,
    borderWidth: 0.5,
    textAlign: 'center'
  },
  dniContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dniTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 26,
    marginRight: 10
  },
  dniValue: {
    width: 250,
    height: 40,
    borderWidth: 0.5,
    textAlign: 'center'
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 20,
  },
  registerButtonContainer: {
    width: '100%',
    height: 60,
  }
});