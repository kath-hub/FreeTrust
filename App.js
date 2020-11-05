import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';


export default class App extends React.Component {

  constructor(props){
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

    
  }

  render() {
      return (

        <View style={styles.container}>                 
          <SearchPage />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
