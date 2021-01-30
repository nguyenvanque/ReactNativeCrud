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
import { useRoute } from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TextInput, Alert, Button,
    Dimensions
} from 'react-native';


const DetailsProduct = ({ navigation }) => {
    const route = useRoute();
    const params = route.params;


    return (
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={styles.container}>
                <Image source={{
                    uri: params.dataDetail.image
                }}
                    resizeMode="stretch"
                    style={styles.imageDetail} />
                <View>
                    <Text style={styles.nameProduct}>
                        Tên sản phẩm:   {params.dataDetail.name}
                    </Text>
                    <Text style={styles.price}>
                        Giá sản phẩm:   {params.dataDetail.price}
                    </Text>
                    <Text style={styles.info}>
                   Trạng thái:   {params.dataDetail.info}
                    </Text>
                    <Text style={styles.backProduct} onPress={() => {
                        navigation.navigate('Product');
                    }}>
                        Danh sách sản phẩm

            </Text>
                </View>


            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },

    nameProduct: {
        fontSize: 25,
        marginHorizontal: 20,
        marginVertical: 10,
        fontWeight:'bold'
    },
    price:{
        fontSize: 18,
        marginHorizontal: 20,
       
    },
    info:{
        fontSize: 18,
        marginHorizontal: 20, 
       
        
    },

    backProduct: {
        fontWeight: 'bold',
        color: "#ff5b2d",
        fontSize: 15,
        marginTop: 150,

        textAlign: 'center'

    },
    imageDetail: {
        width: Dimensions.get('window').width,

        height: 350,
        marginTop: 20

    }
});

export default DetailsProduct;

