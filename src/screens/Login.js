/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { useNavigation } from '@react-navigation/native';
import TabProduct from '../../App'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput, Alert, Button
} from 'react-native';
import Product from './Product';


GoogleSignin.configure({
  webClientId: '142309612135-p1d4begm4h59fk153ne5552e8ia7bhm4.apps.googleusercontent.com',
});
const onGoogleButtonPress = async () => {
  // Get the users ID token
  const { accessToken, idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const onFacebookButtonPress = async () => {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();







  const _checkLogin = (email, password) => {

    if (email == "" && password == "") {
      Alert.alert('Email và mật khẩu không được trống')
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('Đăng nhập thành công');
          navigation.navigate('TabNavigation')
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

  }
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (user) {
    navigation.navigate('TabNavigation');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HeyAPP</Text>
      <Image style={styles.imageLogin} source={require('../image/people.jpg')} />

      <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_email.png')} />
        <TextInput
          style={styles.inputText}
          placeholder="Enter Email..."
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
          placeholder="Enter Password..."
          value={password}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setPassword(text) }}

        />
      </View>
      <View style={styles.loginBtn} >
        <Text style={styles.loginText}
          onPress={() => 
            _checkLogin(email, password)}>LOGIN</Text>
      </View>
      <View>

        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
      <View style={styles.signInGoogleFacebook}>
        <View style={styles.signInGoogle}>
          <Image style={styles.icon} source={require('../image/ic_google.png')} />
          <Text style={styles.textGoogle}
            onPress={() => onGoogleButtonPress().then(() => navigation.navigate('TabNavigation'))}>Google</Text>
        </View>
        <View style={styles.signInFacebook}>
          <Image style={styles.icon} source={require('../image/ic_facebook.png')}
            onPress={() => onFacebookButtonPress().then(() => navigation.navigate('TabNavigation'))} />
          <Text style={styles.textFacebook}

            onPress={() => onFacebookButtonPress().then(() => navigation.navigate('TabNavigation'))}
          >Facebook</Text>
        </View>
      </View>
      <View style={styles.registerView}>
        <Text style={styles.registerText}>Don't have account !  </Text>
        <Text style={styles.registerText02}
          onPress={() => {
            navigation.navigate('Register');
          }}>Register</Text>
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
    flexDirection: 'row'
  },
  registerText: {
    fontWeight: 'bold',
    color: "#dddddd"
  },
  registerText02: {
    fontWeight: 'bold',
    color: "#ff5b2d"
  },

  signInGoogleFacebook: {
    flexDirection: 'row',
  },
  signInGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: '#edeef2',
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,

  },
  signInFacebook: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#edeef2',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10
  },
  icon: {
    marginRight: 5,
    width: 25,
    height: 25
  },
  textGoogle: {
    color: 'red',
    fontWeight: 'bold'
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

export default Login;

