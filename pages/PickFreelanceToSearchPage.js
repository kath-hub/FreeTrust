import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { ScrollView,Image,TouchableHighlight, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';
import { Button, Menu, Divider, Provider } from 'react-native-paper';



import * as firebase from 'firebase';
import 'firebase/firestore';

export default class PickFreelanceToSearchPage extends React.Component {



    constructor(props){
        super(props);
    
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
               
                
      }

      

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
        source={require('../assets/emcee.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Fitness Coach"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={require('../assets/fitnesscoach.png')}
          />
        </TouchableHighlight>

      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Graphic Designer"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={require('../assets/graphicdesigner.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Magician"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={require('../assets/magician.png')}
          />
        </TouchableHighlight>
        
      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Makeup Artist"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={require('../assets/makeupartist.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Photographer"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={require('../assets/photographer.png')}
          />
        </TouchableHighlight>
        
      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Private Tutor"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={require('../assets/privatetutor.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Translator"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={require('../assets/translator.png')}
          />
        </TouchableHighlight>
        
      </View>

      <View style={{marginBottom:20,flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Video Editor"})}}>

        <Image 
        style={{height:150,width:150}}          
        source={require('../assets/videoeditor.png')}
        />


        

        </TouchableHighlight>

        <TouchableHighlight style={{overflow:'hidden',borderRadius:150,alignSelf: 'center'}} onPress={()=>{this.props.navigation.navigate('SearchPage',{freelancetype:"Web Developer"})}}>

          <Image 
          style={{height:150,width:150}}          
          source={require('../assets/webdevelopor.png')}
          />
        </TouchableHighlight>
        
      </View>

      </ScrollView>


     );

 }
}
