import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfilePage from './pages/ProfilePage'

import * as firebase from 'firebase';

export default class SearchPage extends React.Component {



 render() {
     return (
        <View style={{paddingTop:20}}>
            <Text>"SearchPage here"</Text>
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
