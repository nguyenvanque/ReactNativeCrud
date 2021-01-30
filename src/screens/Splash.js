/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component,useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


  const Splash= ({navigation})=> {
   useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login')
        },2000)
   },[])
    return (
      <View style={styles.container}>
           <Image style={styles.imageSplash}
          source={require('../image/ic_splash.jpg')}
          resizeMode="center" />
        <Text style={styles.textSplash}>Hey App</Text>
       
      </View>
    );
  }
const styles = StyleSheet.create({
    container:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:'white'
    },
    imageSplash:{
        width:"90%",
        height:400,
    },
    textSplash:{
        fontSize:25,
        fontWeight:'bold',
        color:'grey'
    }
  
});

export default Splash;
