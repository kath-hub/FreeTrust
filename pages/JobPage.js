import React, { Component } from 'react'
import {StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'


const firebase = require("firebase");
require("firebase/firestore");
import ApiKeys from '../constants/ApiKeys';
import JobList from '../Components/JobList';

export default class JobPage extends Component {

    state = {
        jobList:[],
    }

    constructor(props){
        super(props);
    
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
        
        const jobsDocument  = firebase.firestore().collection("jobs")
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty){
    
            var jobs = [];
            querySnapshot.forEach(function(doc) {
                jobs.push(doc.data());
            });

            jobs.forEach( function(obj, index) {
                obj.id = index.toString();
            })
            this.state.jobList = jobs
          }
        })

      }

    componentDidMount(){

        const jobsDocument  = firebase.firestore().collection("jobs")
        .onSnapshot(querySnapshot => {
          if (!querySnapshot.empty){
    
            var jobs = [];
            querySnapshot.forEach(function(doc) {
                jobs.push(doc.data());
            });

            jobs.forEach( function(obj, index) {
                obj.id = index.toString();
            })

            this.setState({jobList:jobs})
          }
        })

    }





    render(){
        return (
            <View style={styles.container}>
                <JobList  navigation={this.props.navigation} data={this.state.jobList}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
})
