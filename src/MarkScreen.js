import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar as RnStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import fingerprint from '../src/icon/fingerprint.png';

export default function MarkScreen({navigation}) {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [name, setName] = useState();

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
    console.log('fall back to password authentication');
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

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your password',
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
        'Please login with your password',
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

    const nameFromStorage = await AsyncStorage.getItem('@name');
    setName(nameFromStorage);
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Huella Dactilar</Text>
        <TouchableWithoutFeedback onPress={handleBiometricAuth}>
          <Image
            style={styles.image}
            source={fingerprint}
          />
        </TouchableWithoutFeedback>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>Nombre</Text>
          <TextInput
            style={styles.nameValue}
            value={name}
            placeholder="Nombre validado"
            editable={false}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: RnStatusBar.currentHeight,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    height: 40
  },
  image: {
    marginTop: 40,
    width: 128,
    height: 128
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50
  },
  nameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    height: 24,
    marginRight: 10
  },
  nameValue: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center'
  }
});
