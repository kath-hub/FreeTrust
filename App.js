
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PickFreelanceToSearchPage from './pages/PickFreelanceToSearchPage'
import PersonalProfilePage from './pages/PersonalProfilePage'
import SearchPage from './pages/SearchPage'
import RegistrationPage from './pages/RegistrationPage'
import EditProfile from './pages/EditProfile/EditProfile'
import LoginPage from './pages/LoginPage'
import JobPage from './pages/JobPage'
import FreelancerProfilePage from './pages/FreelancerProfilePage'
import SSProfilePage from './pages/SSProfilePage'
import AddReviewPage from './pages/AddReviewPage'
import AddNewJobPage from './pages/AddNewJobPage'


import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';

console.ignoredYellowBox = ['Warning:']

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

        if (route.name === 'PickFreelanceToSearchPage') {
          iconName = focused
            ? 'account-search'
            : 'account-search-outline';
        } else if (route.name === 'PersonalProfilePage') {
          iconName = focused ? 'account-circle' : 'account-circle-outline';
        } else if (route.name === 'JobPage') {
          iconName = focused ? 'briefcase-search' : 'briefcase-search-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#788eec',
      inactiveTintColor: 'gray',
      showLabel: false
    }}>
      <Tab.Screen name="PickFreelanceToSearchPage" component={PickFreelanceToSearchPage} />
      <Tab.Screen name="JobPage" component={JobPage}/>
      <Tab.Screen name="PersonalProfilePage" component={PersonalProfilePage}/>

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
        <Stack.Navigator initialRouteName= "LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{title: 'Log in',}}/>
        <Stack.Screen name="RegistrationPage" component={RegistrationPage} options={{title: 'Register',}}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PickFreelanceToSearchPage" component={PickFreelanceToSearchPage} />
        <Stack.Screen name="SearchPage" component={SearchPage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="PersonalProfilePage" component={PersonalProfilePage}/>
        <Stack.Screen name="FreelancerProfilePage" component={FreelancerProfilePage} options={{headerShown: false}}/>
        <Stack.Screen name="SSProfilePage" component={SSProfilePage} options={{headerShown: false}}/>
        <Stack.Screen name="JobPage" component={JobPage} />
        <Stack.Screen name="AddReviewPage" component={AddReviewPage} />
        <Stack.Screen name="AddNewJobPage" component={AddNewJobPage} />
        

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
