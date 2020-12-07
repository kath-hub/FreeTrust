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
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';
const firebase = require("firebase");
require("firebase/firestore");
import ApiKeys from '../constants/ApiKeys';

import FreelanceProfileTabView from '../Components/FreelancerProfileTabView'
import SSProfileTabView from '../Components/SSProfileTabView'

class PersonalProfile extends Component {

  static defaultProps = {
    containerStyle: {},
  }

  onEditPress = (item) => {

    if (this.props.userType===1){
      console.log("freelancer editprofile")
      this.props.navigation.navigate('FreelancerEditProfile',{item})
    }

    if (this.props.userType===0){
      console.log("ss editprofile")
      this.props.navigation.navigate('SSEditProfile',{item})
    }
  }

  renderFreelancerHeader = () => {
    return (
      <View style={styles.headerContainer}>
            <View style={styles.userRow}>
            <Image
              style={styles.userImage}
              source={(this.props.profileData["profilePicture"]!=="")?{uri: this.props.profileData["profilePicture"]}:require('../assets/blankdp.jpg')}
            />
            <View style={styles.userNameRow}>
              <Text style={styles.userNameText}>{this.props.name}</Text>
            </View>
            <View style={styles.userBioRow}>
              <Text style={styles.userBioText}>{this.props.profileData["bio"]}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                    <View>
                        <Text style={styles.ratingText}>Average Rating: </Text>
                    </View>
                    
                    <View style={{flex: 0.5}}>
                        <StarRating 
                            disabled={true}
                            rating={this.props.profileData["averageRating"]}
                            numberOfStars={5}
                            fullStarColor='#edca79'
                            emptyStarColor='#E5E5EA'
                            name='rating'
                            starSize={22}
                            marginVertical= '5'
                            />
                        </View>
                </View>
                <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onEditPress(this.props.profileData)}>
                        <Text style={styles.buttonTitle}>edit</Text>
                    </TouchableOpacity>
                
            </View>
        
      </View>
    )
  }

    renderSSHeader = () => {
    return (
      <View style={styles.headerContainer}>
            <View style={styles.userRow}>
            <Image
              style={styles.userImage}
              source={(this.props.profileData["profilePicture"]!=="")?{uri: this.props.profileData["profilePicture"]}:require('../assets/blankdp.jpg')}
            />
            <View style={styles.userNameRow}>
              <Text style={styles.userNameText}>{this.props.name}</Text>
            </View>
            <View style={styles.userBioRow}>
              <Text style={styles.userBioText}>{this.props.profileData["bio"]}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                    <View>
                        <Text style={styles.ratingText}>Average Rating: </Text>
                    </View>
                    
                    <View style={{flex: 0.5}}>
                        <StarRating 
                            disabled={true}
                            rating={this.props.profileData["averageRating"]}
                            numberOfStars={5}
                            fullStarColor='#edca79'
                            emptyStarColor='#E5E5EA'
                            name='rating'
                            starSize={22}
                            marginVertical= '5'
                            />
                        </View>
                </View>
                <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onEditPress(this.props.profileData)}>
                        <Text style={styles.buttonTitle}>edit</Text>
                    </TouchableOpacity>
                
            </View>
        
      </View>
    )
  }

  renderHeaderView = () => {
    if (this.props.userType===1){
      console.log("rendering freelancer header view")
      return this.renderFreelancerHeader()
    }

    if (this.props.userType===0){
      console.log("rendering ss header view")
      return this.renderSSHeader()
    }

  }

  renderTabView = () => {
    if (this.props.userType===1){
      console.log("rendering freelancer tab view")
      return (
        <FreelanceProfileTabView item={this.props} navigation={this.props.navigation}/>
      )
    }

    if (this.props.userType===0){
      console.log("rendering ss tab view")
      return (
        <SSProfileTabView item={this.props} navigation={this.props.navigation}/>
      )
    }

  }

  render() {

    return (
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderHeaderView()}
            </View>
          </View>
          <View>
          {this.renderTabView()}
          </View>
          
        </ScrollView>
    )
  }
}

class PersonalProfilePage extends Component {

  state = {
    id: "",
    name: "",
    email: "",
    userType: -1,
    profileData: {},
    signIn: 0, //0: not signed in, 1 = signed

  }

  constructor(props){
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      this.state.id = user.uid
      this.state.email = user.email
      this.state.signIn = 1

    } else {
      // No user is signed in.
      this.props.navigation.navigate('LoginPage')
    }
  }

  componentDidMount(){
    const userDocument  = firebase.firestore().collection("users").where("id", '==', this.state.id)
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
        .onSnapshot(querySnapshot => {
          if(!querySnapshot.empty) {
            console.log("freelancer get")
            var profileData = querySnapshot.docs[0].data()
            // profileData.profilePicture = "https://i.imgur.com/X64evcq.jpg"
            this.setState({profileData:profileData})
            // console.log(profileData);
            
          }
          else {
            console.log("No profile data");
          }
        })
      }

      if (userDoc.userType === 0){
        console.log("Loading service seeker profile")
        this.profile  = firebase.firestore().collection("ss")
        .where("id", '==', userDoc.id)
        .onSnapshot(querySnapshot => {
          if(!querySnapshot.empty) {
            console.log("freelancer get")
            var profileData = querySnapshot.docs[0].data()
            this.setState({profileData:profileData})            
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
  return <PersonalProfile {...this.state} {...this.props}/>}
}

export default PersonalProfilePage

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
    fontSize: 14,
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

  ratingText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
},

button: {
  backgroundColor: '#E1E1E1',
  marginLeft: 30,
  marginRight: 30,
  marginTop: 20,
  height: 20,
  width: 40,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: 'center'
},
buttonTitle: {
  color: 'gray',
  fontSize: 16,
  fontWeight: "bold"
},
})