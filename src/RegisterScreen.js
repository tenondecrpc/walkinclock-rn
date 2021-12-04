import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar as RnStatusBar, TouchableOpacity, Button} from 'react-native';

export default RegisterScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const register = () => {
    console.log('registrar');
  }

  return (
    <View style={styles.container}>
      <View style={styles.emailContainer}>
        <Text style={styles.emailTitle}>Correo</Text>
        <TextInput style={styles.emailValue} value={email} placeholder="Ingrese su correo" />
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.passwordTitle}>Clave</Text>
        <TextInput style={styles.passwordValue} value={password} placeholder="Ingrese su clave" secureTextEntry={true} />
      </View>
      <TouchableOpacity style={styles.registerButtonContainer}>
        <Button
          title="Registrarse"
          color="orange"
          onPress={register}
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
  registerButtonContainer: {
    width: '100%',
    height: 60,
  }
});