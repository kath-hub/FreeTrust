import React, { Component } from 'react';
import {
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types';
const firebase = require("firebase");
require("firebase/firestore");
import ApiKeys from '../constants/ApiKeys';

import ProfileTabView from '../Components/ProfileTabView'






class PersonalProfile extends Component {

  static defaultProps = {
    containerStyle: {},
  }


  renderDescription = () => {
    return (
      <View>
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.descriptionText}>{this.props.profileData["bio"]}</Text>
      </View>
    )
  }



  renderContactHeader = () => {
    return (
      <View style={styles.headerContainer}>
            <View style={styles.userRow}>
            <Image
              style={styles.userImage}
              source={{uri: this.props.profileData["profilePicture"]}}
            />
            <View style={styles.userNameRow}>
              <Text style={styles.userNameText}>{this.props.name}</Text>
            </View>
            <View style={styles.userBioRow}>
              <Text style={styles.userBioText}>{this.props.profileData["bio"]}</Text>
            </View>
            </View>
        
      </View>
    )
  }

  render() {
    return (
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <ProfileTabView first={this.props.profileData["introduction"]} second={this.props.contact}/>
        </ScrollView>
    )
  }
}

class PersonalProfilePage extends Component {

  state = {
    uid: "",
    name: "",
    email: "",
    userType: -1,
    profileData: {},

  }

  constructor(props){
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      this.state.uid = user.uid
      this.state.email = user.email

    } else {
      // No user is signed in.
    }
  }

  componentDidMount(){
    const userDocument  = firebase.firestore().collection("users").where("id", '==', this.state.uid)
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.empty){

        const userDoc = querySnapshot.docs[0].data()

        this.setState({name:userDoc.name})
        this.setState({userType:userDoc.userType})

        return userDoc
      }
    })

    userDocument.then( userDoc =>{
      console.log(userDoc)

      if (userDoc.userType === 1){
        console.log("Loading freelancer profile")

        this.profile  = firebase.firestore().collection("freelancers")
        .where("id", '==', userDoc.id)
        .get()
        .then(querySnapshot => {
          if(!querySnapshot.empty) {
            console.log("freelancer get")
            var profileData = querySnapshot.docs[0].data()
            profileData.profilePicture = "https://i.imgur.com/X64evcq.jpg"
            this.setState({profileData:profileData})
            // console.log(profileData);
            
          }
          else {
            console.log("No profile data");
          }
        })
      }

    })

  }
    
  
  render(){

  console.log(this.state);
  return <PersonalProfile {...productData} {...this.props}/>}
}

export default PersonalProfilePage

const productData = {
  name: "Jennis BNK48",
  username: "Jennis_BNK48",
  profileData: {
    bio: "Singer",
    title: "338 Spear St #26G",
    address: "San Francisco, CA 94105",
    phone: "12345678",
    profilePicture:
      "https://i.imgur.com/X64evcq.jpg",
    introduction: "Enjoy true urban living in this spacious one bedroom, one bath home at The Infinity. This full service home is finished with Studio Becker cabinetry, hardwood floors, Bosch and Thermador appliances, in-unit washer/dryer and custom lighting. Premium Secure Undergroud"
  }
}

const Colors = {
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#788eec',
  purple: '#5856D6',
  pink: '#FF2D55',

  white: '#FFFFFF',
  customGray: '#EFEFF4',
  lightGray: '#E5E5EA',
  lightGray2: '#D1D1D6',
  midGray: '#C7C7CC',
  gray: '#8E8E93',
  black: '#000000',
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: 25,
    marginBottom: 10,
  },
  scroll: {
    backgroundColor: '#FFF',
    //flex: 1,
   //marginBottom: 55,
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
  },
  name: {
    color: Colors.black,
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 5,
  },
  detailText: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subDetailText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '100',
    letterSpacing: 0.5,
    lineHeight: 28,
  },
  descriptionText: {
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 2,
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})