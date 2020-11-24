import React from 'react';
import {  ScrollView, TextInput, TouchableWithoutFeedback,TouchableOpacity, Alert, StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';
import SearchPage from '../ProfilePage';

export default class EditProfile extends React.Component {

    

    
    

    constructor(props){
        super(props);
        this.state = {
                  name:"",
                  freelancerType:"",
                  locations:[],
                  serviceFee:"",
                  bio:"",
                  introduction:"",
                  credentials:""
                }
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
       
        firebase.firestore().collection("freelancers").doc(this.props.route.params.item.id).onSnapshot(doc=>{
                  

        this.setState({
          name:doc.data().name,
          freelancerType:doc.data().freelancerType,
          locations:doc.data().locations,
          serviceFee:doc.data().serviceFee,
          bio:doc.data().bio,
          introduction:doc.data().introduction,
          credentials:doc.data().credentials,      
        
        })
        
  
          }
        )

      }


 
    componentDidMount(){
      
      


        
    }
                  
        
      
        
        
  
          
      

saveOnPress(){
  var ref = firebase.firestore().collection("freelancers").doc(this.props.route.params.item.id);
  ref.update(
    {
      serviceFee:this.state.serviceFee,
      locations:this.state.locations
    }
      );
  this.props.navigation.navigate(SearchPage);
  Alert.alert(
    'Profile Updated',
    'Your Profile Has Updated',
    [
      { text: 'OK', onPress: () => this.props.navigation.navigate('Home') }
    ],
    { cancelable: false }
  );
}

locationsOnPress (loc){
  let locs = this.state.locations

  var i = locs.indexOf(loc)

  if (i>-1){
    locs.splice(i,1)
  }
  else{
    locs.push(loc)
  }

  this.setState({locations:locs})
}

locButtonStat(loc){
        if (this.state.locations.length>=4){
          if (this.state.locations.indexOf(loc)>-1){
            return false
          }
          return true
        }
        return false;
      }

 render() {

  

      


     return (  

      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>
            <Text style={{marginLeft: 20,}}>{`Service Fee:`}</Text>
            <TextInput

                    style={styles.input}
                    placeholder='serviceFee'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.setState({serviceFee:text})}
                    value={this.state.serviceFee}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            
        </View>

        

        <View  style={{marginLeft: 20,marginBottom:15}} ><Text style={{fontSize:20}}>{`Your Work Location(s): \n(Select up to 4 choices)`}</Text></View >
        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:'white'}} ><Text style={{textAlign: 'center'}}></Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Online")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Online")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Online")}><Text style={{textAlign: 'center', fontSize:20}}>Online</Text></TouchableOpacity >
              
        </View>

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Central and Western")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Central and Western")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Central and Western")}><Text style={{textAlign: 'center', fontSize:15}}>Central and Western</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Eastern")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Eastern")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Eastern")}><Text style={{textAlign: 'center', fontSize:20}}>Eastern</Text></TouchableOpacity >
        </View>


        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Islands")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Islands")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Islands")}><Text style={{textAlign: 'center', fontSize:20}}>Islands</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Kowloon City")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Kowloon City")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Kowloon City")}><Text style={{textAlign: 'center', fontSize:20}}>Kowloon City</Text></TouchableOpacity >
        </View>

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Kwai Tsing")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Kwai Tsing")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Kwai Tsing")}><Text style={{textAlign: 'center', fontSize:20}}>Kwai Tsing</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Kwun Tong")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Kwun Tong")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Kwun Tong")}><Text style={{textAlign: 'center', fontSize:20}}>Kwun Tong</Text></TouchableOpacity >
        </View>

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("North")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("North")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("North")}><Text style={{textAlign: 'center', fontSize:20}}>North</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Sai Kung")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Sai Kung")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Sai Kung")}><Text style={{textAlign: 'center', fontSize:20}}>Sai Kung</Text></TouchableOpacity >
        </View>

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Sha Tin")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Sha Tin")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Sha Tin")}><Text style={{textAlign: 'center', fontSize:20}}>Sha Tin</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Sham Shui Po")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Sham Shui Po")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Sham Shui Po")}><Text style={{textAlign: 'center', fontSize:20}}>Sham Shui Po</Text></TouchableOpacity >
        </View> 

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Southern")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Southern")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Southern")}><Text style={{textAlign: 'center', fontSize:20}}>Southern</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Tai Po")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Tai Po")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Tai Po")}><Text style={{textAlign: 'center', fontSize:20}}>Tai Po</Text></TouchableOpacity >
        </View> 

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Tsuen Wan")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Tsuen Wan")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Tsuen Wan")}><Text style={{textAlign: 'center', fontSize:20}}>Tsuen Wan</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Tuen Mun")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Tuen Mun")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Tuen Mun")}><Text style={{textAlign: 'center', fontSize:20}}>Tuen Mun</Text></TouchableOpacity >
        </View>

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Wan Chai")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Wan Chai")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Wan Chai")}><Text style={{textAlign: 'center', fontSize:20}}>Wan Chai</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Wong Tai Sin")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Wong Tai Sin")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Wong Tai Sin")}><Text style={{textAlign: 'center', fontSize:20}}>Wong Tai Sin</Text></TouchableOpacity >
        </View> 

        <View style={{flexDirection:"row", justifyContent:"space-around", marginBottom:10}}>
              <TouchableOpacity  disabled={this.locButtonStat("Yau Tsim Mong")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Yau Tsim Mong")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Yau Tsim Mong")}><Text style={{textAlign: 'center', fontSize:20}}>Yau Tsim Mong</Text></TouchableOpacity >
              <TouchableOpacity  disabled={this.locButtonStat("Yuen Long")} style={{borderRadius: 15, justifyContent: 'center', height:30, width: '40%', backgroundColor:this.state.locations.indexOf("Yuen Long")>-1?'green':'grey'}} onPress={()=>this.locationsOnPress("Yuen Long")}><Text style={{textAlign: 'center', fontSize:20}}>Yuen Long</Text></TouchableOpacity >
        </View>


        
            <View>
              <TouchableOpacity  style={{backgroundColor:'#641'}}  onPress={()=>this.saveOnPress()}><Text style={{fontSize: 50}}>Save</Text></TouchableOpacity >
            </View>
      </ScrollView>

     );

 
}

}

const styles = StyleSheet.create({

  container: {
    flexDirection:"row",
    flex: 2,
    alignItems: 'center'
},

  input: {
    height: 48,
    width: '70%',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 20,
    paddingLeft: 16
},

  


  name: {
    fontSize: 32,    
  },


});