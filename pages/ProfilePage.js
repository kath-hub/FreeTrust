import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import ProfilePage from './ProfilePage.js';

import * as firebase from 'firebase';

export default class SearchPage extends React.Component {

    state = {
      freelancers:[]
    }

    


    constructor(props){
        super(props);
    
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
               
        this.subscriber  = firebase.firestore().collection("freelancers").onSnapshot(docs=>{
                    
          let freelancers = []
          docs.forEach(doc => {
            freelancers.push(doc)
          })
          this.setState({freelancers})
        }
          
        )

        
      }

      

  componentDidMount() {

  }

  onPress (item) {

  };

 render() {


  
 
  const renderItem = ({ item }) => (

      <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>this.onPress(item)}> 
        <View style={styles.itemleft}><Text style={styles.name}>{item.data().name}</Text><Text style={styles.freelancetype}>{item.data().freelancetype}</Text></View>
          <View style={styles.itemright}><Text style={styles.selfintro}>{item.data().selfintro}</Text></View>
          
          
        </TouchableOpacity>
  );

  

     return (  

        <Text style={styles.container}>{this.props.route.params.item.id}</Text>



     );

 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  itemleft: { 
    //flexDirection: "row",
    //alignItems: 'center',
    height:120,
    width:'40%',
    //justifyContent: "space-between",
    backgroundColor: '#87CEFA',
    padding: 20,
    marginVertical: 8,
    //marginHorizontal: 16,
  },
  itemright: { 
    //flexDirection: "row",
    alignItems: 'center',
    //justifyContent: "space-between",
    height:120,
    width:'50%',
    backgroundColor: '#87CEFA',
    padding: 25,
    marginVertical: 8,
    //marginHorizontal: 16,
  },
  name: {
    fontSize: 32,    
  },
  freelancetype: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#52527a"
  },
  selfintro: {
    fontSize: 20,
    //textAlign:"right"
  },
});
