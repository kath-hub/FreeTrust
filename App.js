
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfilePage from './pages/ProfilePage'
import PersonalProfilePage from './pages/PersonalProfilePage'
import SearchPage from './pages/SearchPage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';


class Home extends React.Component {

  constructor(props){
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
  };

  render() {

    const Tab = createBottomTabNavigator();
    return (

    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'SearchPage') {
          iconName = focused
            ? 'account-search'
            : 'account-search-outline';
        } else if (route.name === 'PersonalProfilePage') {
          iconName = focused ? 'account-circle' : 'account-circle-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#788eec',
      inactiveTintColor: 'gray',
      showLabel: false
    }}>
      <Tab.Screen name="SearchPage" component={SearchPage} />
      <Tab.Screen name="PersonalProfilePage" component={PersonalProfilePage} />

    </Tab.Navigator>
    );
  }
}

export default class App extends React.Component {

  constructor(props){
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

    
  };

  
  
  render() {
      return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName= "Home">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        

        </Stack.Navigator>
      </NavigationContainer>
      );
  }
}
const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
