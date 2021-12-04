import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StatusBar as RnStatusBar,
} from 'react-native';

export default function HomeScreen({navigation}) {

  const goMark = async () => {
    navigation.navigate('Mark');
  };

  const goLogin= async () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}> 
          <TouchableOpacity style={styles.markButtonContainer}>
            <Button
              title="Marcación"
              color="red"
              onPress={goMark}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButtonContainer}>
            <Button
              title="Registro"
              color="green"
              onPress={goLogin}
            />
          </TouchableOpacity>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: RnStatusBar.currentHeight,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  markButtonContainer: {
    width: '100%',
    height: 60,
  },
  registerButtonContainer: {
    width: '100%',
    height: 60,
  }
});
