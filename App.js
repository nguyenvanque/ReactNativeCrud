// App.js

import React, { Component } from 'react';
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
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Splash from './src/screens/Splash';
import Product from './src/screens/Product';
import Profile from './src/screens/Profile';
import ChangePassword from './src/screens/ChangePassword';
import AddProduct from './src/screens/AddProduct';
import UpdateProduct from './src/screens/UpdateProduct';
import DetailsProduct from './src/screens/DetailsProduct';






// const Stack = createStackNavigator();

// function ActionBarIcon() {
//   return (
//     <Image
//       source={require('./src/image/ic_menu.png')}

//       style={{ width: 20, height: 20, marginLeft: 15 }} tintColor='#fff' />
//   );
// }
// function NavStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Splash"

//       screenOptions={{
//         headerShown: false,
//         headerTitleAlign: 'center',
//         headerStyle: {
//           height: 70,
//           backgroundColor: '#ff5b2d',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           color: '#fff'
//         },


//       }}
//     >
//       <Stack.Screen
//         name="Splash"
//         component={Splash}
//         options={{ title: 'HeyApp' }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{
//           title: 'Login',
//           headerLeft: props => <ActionBarIcon {...props} />
//         }}
//       />
//       <Stack.Screen
//         name="Register"
//         component={Register}
//         options={{ title: 'Register' }}
//       />
//       <Stack.Screen
//         name="Product"
//         component={Product}
//         options={{ title: 'Product' ,
//         headerLeft : props => <ActionBarIcon {...props} />
//       }}
//       />
//       <Stack.Screen
//         name="ChangePassword"
//         component={ChangePassword}
//         options={{
//           title: 'ChangePassword',
//           headerLeft: props => <ActionBarIcon {...props} />
//         }}
//       />
//       <Stack.Screen
//         name="AddProduct"
//         component={AddProduct}
//         options={{
//           title: 'AddProduct',
//           headerLeft: props => <ActionBarIcon {...props} />
//         }}
//       />
//       <Stack.Screen
//         name="UpdateProduct"
//         component={UpdateProduct}
//         options={{
//           title: 'UpdateProduct',
//           headerLeft: props => <ActionBarIcon {...props} />
//         }}
//       />
//       <Stack.Screen
//         name="DetailsProduct"
//         component={DetailsProduct}
//         options={{
//           title: 'DetailsProduct',
//           headerLeft: props => <ActionBarIcon {...props} />
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{ title: 'Profile' ,
//         headerLeft : props => <ActionBarIcon {...props} />
//       }}
//       />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar translucent backgroundColor="grey"  />
//       <NavStack />
//     </NavigationContainer>
//   );
// }



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const ProductStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Product"
        component={Product}
        options={{title: 'Product'}}
      />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{title: 'UpdateProduct'}}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{title: 'AddProduct'}}
      />
       <Stack.Screen
        name="DetailsProduct"
        component={DetailsProduct}
        options={{title: 'DetailsProduct'}}
      />
    </Stack.Navigator>
  );
};
const ProfiletStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: 'ChangePassword'}}
      />
    </Stack.Navigator>
  );
};
const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProductStack"
      activeColor="#fff"
      inactiveColor="#000"
      barStyle={{backgroundColor: '#ff5b2d'}}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="bell" color="#fff" size={25} />
          ),
        }}
        name="ProductStack"
        component={ProductStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color="#fff" size={25} />
          ),
        }}
        name="ProfiletStack"
        component={ProfiletStack}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Register'}}
        />
     
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{title: 'TabNavigation'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

