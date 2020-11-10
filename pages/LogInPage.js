
import React, { Component } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import styles from './LoginPageStyles';

const firebase = require("firebase");
require("firebase/firestore");
import ApiKeys from '../constants/ApiKeys';

export default class LoginPage extends Component {

    state = {
        email:'',
        password:''
    }

    onFooterLinkPress = () => {
        this.props.navigation.navigate('RegistrationPage')
    }

    onLoginPress = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist")
                        return;
                    }
                    const user = firestoreDocument.data()

                    this.props.navigation.navigate('Home');
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        style={styles.logo}
                        source={require('../assets/icon.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => this.setState({email:text})}
                        value={this.state.email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => this.setState({password:text})}
                        value={this.state.password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>
                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>Don't have an account? <Text onPress={this.onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}