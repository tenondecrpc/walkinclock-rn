import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar as RnStatusBar, TouchableOpacity, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeEmail = (value) => {
    setEmail(value);
  }

    const onChangePassword = (value) => {
    setPassword(value);
  }

  const login = () => {
    if (!email) {
      Alert.alert('Complete su correo');
      return;
    }
    if (!password) {
      Alert.alert('Complete su clave');
      return;
    }
    AsyncStorage.setItem('@email', email);
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}>
        <Text style={styles.emailTitle}>Correo</Text>
        <TextInput style={styles.emailValue} value={email} onChangeText={onChangeEmail} placeholder="Ingrese su correo" />
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.passwordTitle}>Clave</Text>
        <TextInput style={styles.passwordValue} value={password} onChangeText={onChangePassword} placeholder="Ingrese su clave" secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.loginButtonContainer}>
        <Button
          title="Login"
          color="orange"
          onPress={login}
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
  emailContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  emailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 26,
    marginRight: 10
  },
  emailValue: {
    width: 250,
    height: 40,
    borderWidth: 0.5,
    textAlign: 'center'
  },
  passwordContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  passwordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    height: 26,
    marginRight: 10
  },
  passwordValue: {
    width: 250,
    height: 40,
    borderWidth: 0.5,
    textAlign: 'center'
  },
  loginButtonContainer: {
    width: '100%',
    height: 60,
  }
});