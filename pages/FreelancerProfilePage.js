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

class FreelancerProfile extends Component {

  static defaultProps = {
    containerStyle: {},
  }

  renderContactHeader = () => {
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
          <FreelanceProfileTabView item={this.props} />
        </ScrollView>
    )
  }
}

class FreelancerProfilePage extends Component {

  state = {
    id: "",
    name: "",
    email: "",
    userType: 1,
    profileData: {},

  }

  constructor(props){
    super(props);

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }

    var user = this.props.route.params.item.data()

    if (user) {
      this.state.id = user.id
      this.state.profileData = user

      console.log("freeoutput")
      console.log(user)
      console.log("okay")

    } else {
      this.props.navigation.navigate('Home')
    }
  }

  componentDidMount(){
    const userDocument  = firebase.firestore().collection("users").where("id", '==', this.state.id)
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.empty){

        const userDoc = querySnapshot.docs[0].data()

        this.setState({name:userDoc.name})
        this.setState({email:userDoc.email})

        return userDoc
      }
    })

    userDocument.then( userDoc =>{
      console.log(userDoc)

      console.log("Loading freelancer profile")
      this.profile  = firebase.firestore().collection("freelancers")
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

    })

  }
    
  
  render(){

  console.log("line149")
  console.log(this.state);
  return <FreelancerProfile {...this.state} {...this.props}/>}
}

export default FreelancerProfilePage

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