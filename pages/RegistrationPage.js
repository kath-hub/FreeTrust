import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import RadioButton from '../Components/RadioButton'
import styles from './RegistrationPageStyles';

const firebase = require("firebase");
require("firebase/firestore");
import ApiKeys from '../constants/ApiKeys';

export default function RegistrationPage({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [userType, setUserType] = useState(0)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [serviceSeekerCheck, setServiceSeekerCheck] = useState(false);
    const [freelancerCheck, setFreelancerCheck] = useState(false);

    
    const radioHandler = () => {
        if(freelancerCheck){
            setFreelancerCheck(false); 
        }
        setUserType(0);
        setServiceSeekerCheck(true);
    }
        
    const radioHandler2 = () => {
        if(serviceSeekerCheck){
            setServiceSeekerCheck(false);
        } 
        setUserType(1);
        setFreelancerCheck(true);
    }


    const onFooterLinkPress = () => {
        navigation.navigate('LoginPage')
    }

    const onRegisterPress = () => {

        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then( async (response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                    userType
                };
                const usersRef = firebase.firestore().collection('users')
                await usersRef
                    .doc(uid)
                    .set(data)
                    .catch((error) => {
                        alert(error)
                    });

                const profileData = {
                    id: uid,
                    fullName,
                };

                if (userType === 0){
                    const ssRef = firebase.firestore().collection('ss')
                    await ssRef
                    .doc(uid)
                    .set(profileData)
                    .catch((error) => {
                        alert(error)
                    });
                }

                if (userType === 1){
                    const freelancerRef = firebase.firestore().collection('freelancers')
                    await freelancerRef
                    .doc(uid)
                    .set(profileData)
                    .catch((error) => {
                        alert(error)
                    });
                }

                Alert.alert(
                    'Registration Successful',
                    'Log in',
                    [
                      { text: 'OK', onPress: () => navigation.navigate('Login', data) }
                    ],
                    { cancelable: false }
                  );
            })
            .catch((error) => {
                alert(error)
        });
    }


    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <Image
                    style={styles.logo}
                    source={require('../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <View style={{ height: 48, flexDirection: 'row' , alignItems: "center", justifyContent: 'center'}}>
                    <Text style={{ size: 16, color: "#aaaaaa"}}>Service Seeker:</Text>
                    <RadioButton checked={serviceSeekerCheck} onPress={radioHandler}/>
                    <Text style={{ size: 16, color: "#aaaaaa"}}>Freelancer:</Text>
                    <RadioButton checked={freelancerCheck} onPress={radioHandler2}/>
                </View>

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </ScrollView>
        </View>
    )
}
