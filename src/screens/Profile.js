
import React, { Component, useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TextInput, Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = () => {
    const navigation = useNavigation();
    const user =auth().currentUser;

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Image style={{width:50,height:50,marginTop:20}}
                      source={require('../image/avatar.png')}      
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Text style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Nguyen Van Que</Text>
                        <Text style={styles.caption}>{user.email}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Image style={styles.addIcon}
                        tintColor='grey' source={require('../image/ic_location.png')}
                    />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>VietNam, Ho Chi Minh City</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.addIcon}
                                  tintColor='grey' source={require('../image/ic_phone.png')}
                    />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+84-98413489</Text>
                </View>
                <View style={styles.row}>
                    <Image style={styles.addIcon}
                                   tintColor='grey'source={require('../image/ic_email.png')}
                    />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Text>$140.50</Text>
                    <Text>Wallet</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text>12</Text>
                    <Text>Orders</Text>
                </View>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableOpacity onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Image style={styles.addIcon}
                            tintColor='grey' source={require('../image/ic_favorite.png')}
                        />
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableOpacity>
              
            </View>
            <View style={styles.menuWrapper}>
                <TouchableOpacity onPress={() => {navigation.navigate('ChangePassword'); }}>
                    <View style={styles.menuItem}>
                        <Image style={styles.addIcon}
                            tintColor='grey' source={require('../image/ic_lock.png')}
                        />
                        <Text style={styles.menuItemText}>Change password</Text>
                    </View>
                </TouchableOpacity>
              
            </View>
            <View style={styles.menuWrapper}>
                <TouchableOpacity onPress={() => {
                        auth()
                        .signOut()
                        .then(() => navigation.navigate('Login'));
                 }}>
                    <View style={styles.menuItem}>
                        <Image style={styles.addIcon}
                            tintColor='grey' source={require('../image/ic_logout.png')}
                        />
                        <Text style={styles.menuItemText}>Log Out</Text>
                    </View>
                </TouchableOpacity>
              
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      userInfoSection: {
        marginTop:30,
        paddingHorizontal: 30,
        marginBottom: 25,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
      addIcon: {
        width: 20,
        height: 20,
    }
});

export default Profile;

