import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
            freelancers.push(doc.data())
          })
          this.setState({freelancers})
          console.log(freelancers)
        }
          
        )
        
      }

      

  componentDidMount() {

  }

  

 render() {

     return (
        <View style={{paddingTop:20}}>

          <div>
          {
            this.state.freelancers && 
            this.state.freelancers.map(freelancer => {
              return(
                <div>
                  <p>{freelancer.name}</p>
                  <p>{freelancer.freelancetype}</p>
                  <p>{freelancer.selfintro}</p>
                </div>
              )
            }

            )
          }
          </div>

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
