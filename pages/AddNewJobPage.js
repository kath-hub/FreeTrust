import React, { Component } from 'react'
import {Alert, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ScrollView, ViewPagerAndroid } from 'react-native'


const firebase = require("firebase");
require("firebase/firestore");
import ApiKeys from '../constants/ApiKeys';

export default class AddNewJobPage extends Component {

    state = {
        jobTitle:"",
        jobDetail:"",
        creater:"",
        createrId:"",
        createDate:"",
    }

    constructor(props){
        super(props);
        this.state.createrId = this.props.route.params.id;
        var date = new Date();
        date = date.toISOString().split('T')[0]
        this.state.createDate = date

        var user = firebase.auth().currentUser;

    }

    onAddPress = () => {
        console.log("press")

        if (this.state.jobTitle===""){
            Alert.alert(
                'Empty Job Title',
                'Please fill in job title',
                [
                  { text: 'OK', onPress: () => {} }
                ],
                { cancelable: false }
              );

            return null
        }

        if (this.state.jobDetail===""){
            Alert.alert(
                'Empty Job Detail',
                'Please fill in job detail',
                [
                  { text: 'OK', onPress: () => {} }
                ],
                { cancelable: false }
              );

            return null
        }

        console.log(this.state)

        var userRef = firebase.firestore().collection("users").where("id", '==', this.state.createrId)
        userRef.get().then(querySnapshot => {
        if (!querySnapshot.empty){
            const userDoc = querySnapshot.docs[0].data()
            var name = userDoc.name
    
            this.setState({creater:name})
            console.log("inside get")
            console.log(this.state)
        }
        })
        .then( () => {    
            console.log("updating jobs for the user")    
            var receiverRef = firebase.firestore().collection("ss").doc(this.state.createrId);
            receiverRef.update({
                jobs: firebase.firestore.FieldValue.arrayUnion(this.state)
            })
            .then( () => {
                console.log("jobs updated for user") 
                firebase.firestore().collection("jobs").add(this.state)

            })
            .then(() => {
                            console.log("jobs collection successfully updated!");
                            Alert.alert(
                                'Job submitted',
                                'Your Job has been received',
                                [
                                  { text: 'OK', onPress: () => {} }
                                ],
                                { cancelable: false }
                                )
                            }).catch(function error(e){
                                Alert.alert(
                                  e,
                                  [
                                    { text: 'OK'}
                                  ],
                                  { cancelable: false }
                                  )
                            
                            })
        })

        // .catch((error) => {
        //     alert(error)
        // });



    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{flexDirection: 'column', alignContent: 'center'}}>
                        
                        <View style={{flex: 0.5, margin: 10, flexDirection: 'row'}}>
                            <Text style={{fontSize: 18}}>Job Title:</Text>
                        </View>
                        <TextInput
                            style={styles.title}
                            multiline={true}
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => this.setState({jobTitle:text})}
                            value={this.state.title}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={{flexDirection: 'column', alignContent: 'center'}}>
                        
                        <View style={{flex: 0.5, margin: 10, flexDirection: 'row'}}>
                            <Text style={{fontSize: 18}}>Job Detail:</Text>
                        </View>
                        <TextInput
                            style={styles.comment}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => this.setState({jobDetail:text})}
                            value={this.state.comment}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onAddPress()}>
                        <Text style={styles.buttonTitle}>Add</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    comment: {
        height: 90,
        width: 280,
        borderRadius: 5,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    title: {
        height: 48,
        width: 280,
        borderRadius: 5,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    input: {
        height: 48,
        width: 280,
        borderRadius: 5,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});
