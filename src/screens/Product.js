import React, { useState, useEffect } from 'react';
import Swipeout from 'react-native-swipeout'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import Dialog from "react-native-dialog";


import {
    StyleSheet,
    View,
    Text,
    Image, Alert,
    FlatList, Dimensions, Button, Modal,
    ActivityIndicator,
    ToastAndroid,
    StatusBar
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const ListItem = (props) => {
    const navigation = useNavigation();
    const [showDialog, setShowDialog] = useState(false);
    const swipeoutSetting = {
        autoClose: true,
        onClose: () => {
            console.log('Close')
        },
        onOpen: () => {
            console.log('Onpen')
        },
        backgroundColor: '#fff',
        right: [
            {
                component: (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor:'#a8dee0'
                        }}
                    >
                        <Image style={{ width: 20, height: 21 }} tintColor='#fff' source={require('../image/ic_edit.png')} />
                    </View>
                ),
                text: 'Update',
                type: 'secondary',

                backgroundColor: 'green',
                onPress: () => {
                    const id = props.item._key;
                    const data =
                    {
                        id: props.item._key,
                        name: props.item.name,
                        price: props.item.price,
                        info: props.item.info,
                        image: props.item.imageUrl,
                    }

                    navigation.push('UpdateProduct', { data });
                }
            },
            {
                component: (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor:'#fe676e'
                        }}
                    >
                        <Image style={{ width: 18, height: 21 }} tintColor='#fff' source={require('../image/ic_delete.png')} />
                    </View>
                ),
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        //title
                        'Thông báo',
                        //body
                        'Bạn có muốn xóa hay không ?',
                        [
                            { text: 'No', onPress: () => { } },
                            { text: 'OK', onPress: () => removeItem(props.item._key) },
                        ],
                        { cancelable: false },
                    );
                    // 
                }
            },
        ],

    }
    const removeItem = async (key) => {
        try {
            await database()
                .ref(`/Product/`)
                .child(key)
                .remove();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Swipeout {...swipeoutSetting}>
            <TouchableOpacity
            >
                <View style={styles.card}>
                    <View style={styles.cardImgWrapper}>
                        <Image
                            source={{
                                uri: props.item.imageUrl
                            }}
                            resizeMode="cover"
                            style={styles.cardImg}
                        />
                    </View>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardTitle}>{props.item.name}</Text>
                        {/* <StarRating ratings={4} reviews={99} /> */}
                        <Text style={styles.cardDetails}>
                            {props.item.info}
                        </Text>
                        <Text style={styles.price}>
                            {props.item.price}
                        </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        const id = props.item._key;
                        const dataDetail =
                        {
                            id: props.item._key,
                            name: props.item.name,
                            price: props.item.price,
                            info: props.item.info,
                            image: props.item.imageUrl,
                        }
    
                        navigation.navigate('DetailsProduct', { dataDetail });
                    }}>
                    <Image  tintColor="black" style={{width:8,height:12,
                   
                   marginRight:20}}     source={require('../image/ic_row_right.png')}/>
                    </TouchableOpacity>
                  
                    
                </View>

            </TouchableOpacity>


        </Swipeout>
    );

};

const Product = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const indicatorStyle = true ? { ...styles.onlineIndicator, ...styles.online } : styles.onlineIndicator;
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [product, setProduct] = useState([]); // Initial empty array of users

    const [productData, setProductData] = useState([]); // Initial empty array of users

    useEffect(() => {
        const getAllProduct = database()
            .ref(`/Product/`)
            .on('value', snapshot => {
                let products = [];
                if (snapshot) {
                    snapshot.forEach(element => {
                        const product = {
                            _key: element.key,
                            name: element.val().name,
                            price: element.val().price,
                            info: element.val().info,
                            imageUrl: element.val().imageUrl,
                        };
                        products.push(product)
                        setLoading(false);
                    });
                    setProduct(products)
                }
            });
        // Unsubscribe from events when no longer in use
        return () => database()
            .ref(`/Product/`).off('value', getAllProduct)
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
            <View style={styles.containerHeader}>
                <View style={styles.leftNav}>
                    <Text style={styles.helloText}>Hello, Smith</Text>
                    <TouchableOpacity activeOpacity={0.5} 
                    style={styles.locationContainer}>
                        <Text style={styles.locationText}>Accra, Ghana</Text>
                        <Icon name="chevron-down" size={20} color="#6f9e76" />
                    </TouchableOpacity>
                </View>
                <View style={styles.ImageAvartar}>
                    <TouchableOpacity activeOpacity={0.5}
                     onPress={() => {
                        navigation.navigate('Profile');
                    }}
                    >
                        <Image style={styles.avatar} resizeMode="contain"
                            source={require('../image/avatar.png')}
                        />
                    </TouchableOpacity>
                    <View style={indicatorStyle} />
                </View>
            </View>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold', textAlign:
                    'center', color: 'black'
            }}
            > Products</Text>
            <FlatList
                keyExtractor={item => item._key}
                data={product} renderItem={({ item }) => <ListItem item={item} />} />
            <View style={styles.setting}>
                <View style={styles.floatingButton}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AddProduct');
                        }}>
                        <Image style={styles.addIcon}

                            tintColor='#fff' source={require('../image/ic_add.png')}
                        />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    );
};
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        
    },
    listContainer: {
        flexDirection: 'row',
        // margin: width * 3.6 / 187.5,
        padding: width * 3.6 / 187.5,
        borderRadius: width * 3.6 / 187.5,
    },

    setting: {
        flexDirection: 'row',
        position: 'relative'
    },

    containerHeader: {
        paddingHorizontal: 24,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    helloText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    ImageAvartar: {
        width: 50,
        height: 50,
        borderRadius: 20,
        position: 'relative',

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100
    },

    onlineIndicator: {
        width: 16,
        height: 16,
        borderRadius: 20,
        borderColor: '#ffffff',
        borderWidth: 3,
        backgroundColor: '#a2a2a2',
        position: 'absolute',
        top: -1,
        right: -5
    },

    online: {
        backgroundColor: '#56b365'
    },

    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    locationText: {
        color: '#a2a2a2',
        marginEnd: 8
    }
    ,
    cardsWrapper: {
        width: '90%',
        alignSelf: 'center',
  
      



    },
    card: {
        height: 90,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',

      


    },
    cardImgWrapper: {
        flex: 1,
        alignItems: 'center',
       


    },
    cardImg: {
        height: '80%',
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,


    },
    cardInfo: {
        flex: 2.5,
        backgroundColor: '#fff',

    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        fontFamily: 'Roboto-Bold'

    },
    cardDetails: {
        fontSize: 15,
        color: '#000',
    },
    price: {
        fontSize: 15,
        color: '#ff5b2d',

    },


    floatingButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#ff5b2d',
        alignItems: 'center',
        justifyContent: 'center',
        position:
        'absolute',
        right: 20,
        bottom: 20

    },

    addIcon: {
        width: 20,
        height: 20,
    }
});
export default Product;
