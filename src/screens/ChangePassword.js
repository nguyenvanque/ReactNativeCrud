
import React, { Component, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

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


const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setConfirmnewpassword] = useState('');
  const navigation = useNavigation();

const  reauthenticate = (currentPassword) => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
 const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword).then(() => {
      var user =auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        ToastAndroid.show('Đổi mật khẩu thành công',ToastAndroid.LONG)
        console.log('Đổi mật khẩu thành công')

      }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Change Password</Text>
      <Image style={styles.imageLogin} source={require('../image/people.jpg')} />
      <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_lock.png')} />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Old Password..."
          value={oldPassword}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setoldPassword(text) }}

        />

      </View>
      <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_lock.png')} />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="New Password..."
          value={newpassword}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setNewPassword(text) }}

        />

      </View>
      {/* <View style={styles.inputView} >
        <Image style={styles.imageInput} tintColor='#cacccf'
          source={require('../image/ic_lock.png')} />
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm New Password..."
          value={confirmnewpassword}
          placeholderTextColor="#cacccf"
          onChangeText={(text) => { setConfirmnewpassword(text) }}

        />

      </View> */}
      <View style={styles.loginBtn} >
        <Text style={styles.loginText}
          onPress={() => {
            changePassword(oldPassword,newpassword)
          }}>Change password</Text>
      </View>


      <View style={styles.registerView}>
        <Text style={styles.registerText}>You have account !  </Text>
        <Text style={styles.registerText02}
          onPress={() => {
            navigation.navigate('Product');
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

export default ChangePassword;

