import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ScrollView,Image,TouchableHighlight, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import EditProfile from './EditProfile/EditProfile'
import StarRating from 'react-native-star-rating';
import { Button, Menu, Divider, Provider } from 'react-native-paper';



import * as firebase from 'firebase';
import 'firebase/firestore';

export default class PickFreelanceToSearchPage extends React.Component {

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


  
 
     return (  

      <ScrollView style={{backgroundColor:'#788eec'}}>
      <View style={{marginLeft:20,padding:20,alignContent:'center',justifyContent:'center'}}>
        <Text style={{fontSize:25}}>{`What kind of freelance service\nare you looking for?`}</Text>
      </View>


      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Emcee"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/emcee.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Fitness Coach"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/fitnesscoach.png')}
          />
        </TouchableHighlight>

      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Graphic Designer"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/graphicdesigner.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Magician"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/magician.png')}
          />
        </TouchableHighlight>
        
      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Makeup Artist"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/makeupartist.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Photographer"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/photographer.png')}
          />
        </TouchableHighlight>
        
      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Private Tutor"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/privatetutor.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Translator"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/translator.png')}
          />
        </TouchableHighlight>
        
      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Video Editor"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/videoeditor.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Web Developer"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../assets/webdevelopor.png')}
          />
        </TouchableHighlight>
        
      </View>

      </ScrollView>


     );

 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#788eec',
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

  ratingText: {
    color: 'gray',
    fontSize: 18,
    marginBottom: 5,
    paddingLeft: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5
}
});
