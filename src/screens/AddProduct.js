
import React, { Component, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
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

const _AddProduct = (name, price, info,imageUrl) => {
   
    database().ref('Product/').push({
        name,
        price,
        info,
        imageUrl,
    }).then((data) => {
        //success callback
        console.log('data ', data)
        ToastAndroid.show('Thêm thành công',ToastAndroid.LONG)

    }).catch((error) => {
        //error callback
        console.log('error ', error)
    })
}

const AddProduct = ({ navigation }) => {
    const [nameProduct, setNameProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [info, setInfo] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Thêm</Text>
            <Image style={styles.imageLogin} source={{
                            uri: imageUrl
                        }} />

            <View style={styles.inputView} >
                <Image style={styles.imageInput} tintColor='#cacccf'
                    source={require('../image/ic_email.png')} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Tên sản phẩm"
                    value={nameProduct}
                    placeholderTextColor="#cacccf"
                    onChangeText={(text) => { setNameProduct(text) }}
                />
            </View>


            <View style={styles.inputView} >
                <Image style={styles.imageInput} tintColor='#cacccf'
                    source={require('../image/ic_lock.png')} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Giá sản phẩm"
                    value={priceProduct}
                    placeholderTextColor="#cacccf"
                    onChangeText={(text) => { setPriceProduct(text) }}

                />

            </View>
            <View style={styles.inputView} >
                <Image style={styles.imageInput} tintColor='#cacccf'
                    source={require('../image/ic_lock.png')} />
                <TextInput

                    style={styles.inputText}
                    placeholder="Tình trạng sản phẩm"
                    value={info}
                    placeholderTextColor="#cacccf"
                    onChangeText={(text) => { setInfo(text) }}

                />

            </View>
            <View style={styles.inputView} >
                <Image style={styles.imageInput} tintColor='#cacccf'
                    source={require('../image/ic_lock.png')} />
                <TextInput

                    style={styles.inputText}
                    placeholder="Link hình ảnh"
                    value={imageUrl}
                    placeholderTextColor="#cacccf"
                    onChangeText={(text) => { setImageUrl(text) }}
                />

            </View>

            <View style={styles.loginBtn} >
                <Text style={styles.loginText}
                    onPress={() => {
                        _AddProduct(nameProduct, priceProduct, info,imageUrl);
                        navigation.navigate('Product');

                    }}>Thêm sản phẩm</Text>
            </View>


            <View style={styles.registerView}>
                <Text style={styles.registerText}>Oke !  </Text>
                <Text style={styles.registerText02}
                    onPress={() => {
                        navigation.navigate('Product');
                    }}>Danh sách sản phẩm</Text>
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

export default AddProduct;

