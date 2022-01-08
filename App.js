/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TextInput,
   useColorScheme,
   View,
   Image,
   TouchableOpacity,
   Linking,
   Alert,
   ActivityIndicator,
 } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/home';
import Result from './src/search';
const Stack = createNativeStackNavigator();

 export default function App () {
   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false, }} />
        <Stack.Screen name="Result" component={Result} 
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#7475cf',
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
   )
 }

 