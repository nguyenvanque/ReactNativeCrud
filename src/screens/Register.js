
import React, { Component, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastAndroid} from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput, Alert
} from 'react-native';


const _Register=async(email,password)=>{
  auth()
  .createUserWithEmailAndPassword(email, password)
  .then(() => {
    const user =auth().currentUser;
    const uid=user.uid;
    Alert.alert('Dang ky thanh cong',uid );
    
    database().ref('Users/').child(uid).set({
      uid,
      name:"",
      phone:"",
      email,
   
    }).then((data) => {
      console.log('data', data);
    }).catch((error) => {
      console.log('error', error);
    });

  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
    }

    console.error(error);
  });
}

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HeyAPP</Text>
      <Image style={styles.imageLogin} source={require('../image/people.jpg')} />

      <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_email.png')} />
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          value={email}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setEmail(text) }}
        />
      </View>


      <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_lock.png')} />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          value={password}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setPassword(text) }}

        />

      </View>
      <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_lock.png')} />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm Password..."
          value={confirmPassword}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setConfirmPassword(text) }}

        />

      </View>
      <View style={styles.loginBtn} >
        <Text style={styles.loginText}
          onPress={() => {
            _Register(email,password)
          }}>Register</Text>
      </View>


      <View style={styles.registerView}>
        <Text style={styles.registerText}>You have account !  </Text>
        <Text style={styles.registerText02}
          onPress={() => {
            navigation.navigate('Login');
          }}>Login</Text>
      </View>
      <View style={styles.backGroundContainer}>
        <View style={styles.backGroundLeft}></View>
        <View style={styles.backGroundRight}></View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    fontWeight: "bold",
    fontSize: 40,

    color: "#ff5b2d",
    marginBottom: 20,
    marginTop: -10
  },
  imageLogin: {
    width: 300,
    height: 120,
    marginBottom: 20
  },
  inputView: {
    width: "85%",
    flexDirection: 'row',
    backgroundColor: "#edeef2",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    alignItems: 'center',
    padding: 20
  },
  imageInput: {
    width: 20,
    height: 20,
  },
  inputText: {
    width: "100%",
    height: 50,
    color: "white",
    fontSize: 16,
    color: 'black'
  },
  forgot: {
    fontSize: 14,
    color: '#ff5b2d',
    fontWeight: 'bold',
  },
  loginBtn: {
    width: "85%",
    backgroundColor: "#ff5b2d",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    color: "white",
    padding: 20
  },
  registerView: {
    flexDirection: 'row',
    marginTop: 10
  },
  registerText: {
    fontWeight: 'bold',
    color: "#dddddd",
    fontSize: 15,
  },
  registerText02: {
    fontWeight: 'bold',
    color: "#ff5b2d",
    fontSize: 15
  },


  icon: {
    marginRight: 5,
    width: 25,
    height: 25
  },
  textGoogle: {
    color: 'red'
    , fontWeight: 'bold'
  },
  textFacebook: {
    color: 'blue',
    fontWeight: 'bold'
  },

  backGroundContainer: {
    flexDirection: 'row',
    marginBottom: -120,

  },
  backGroundRight: {
    backgroundColor: '#ffded5',
    width: 140,
    height: 140,
    borderRadius: 120,
    marginLeft: 250,
    marginTop: 20
  },
  backGroundLeft: {
    backgroundColor: '#ffded5',
    width: 140,
    height: 140,
    borderRadius: 120,
  }
});

export default Register;

