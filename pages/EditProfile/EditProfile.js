import React from 'react';
import { ScrollView, TextInput, Image, TouchableHighlight ,TouchableOpacity, Alert, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase';


import SearchPage from '../ProfilePage';



export default class EditProfile extends React.Component {

    

    
    

    constructor(props){
        super(props);
        this.state = {
                  id:"",
                  profilePicture:"",
                  name:"",
                  freelancerType:"",
                  locations:[],
                  serviceFee:"",
                  bio:"",
                  introductiion:"",
                  credentials:""
                }
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
       
        firebase.firestore().collection("freelancers").doc(this.props.route.params.item.id).onSnapshot(doc=>{
                  

          this.setState({
            id:doc.id,
            name:doc.data().name,
            freelancerType:doc.data().freelancerType,
            locations:doc.data().locations,
            serviceFee:doc.data().serviceFee,
            bio:doc.data().bio,
            introduction:doc.data().introduction,
            credentials:doc.data().credentials
                            
          })

  
        })

        firebase
          .storage()
          .ref()
          .child(this.props.route.params.item.id+'_dp')
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            this.setState({profilePicture: url});
          })
          .catch((e) => console.log('dp not uploaded ', e));
          

        
    }

 
    componentDidMount(){
      

      
      

        
    }
                  
        
      
        
        
  
          
    

saveOnPress(){
  var ref = firebase.firestore().collection("freelancers").doc(this.props.route.params.item.id);
  ref.update(
    {
      serviceFee:this.state.serviceFee,
      locations:this.state.locations,
      bio:this.state.bio,
      freelancerType:this.state.freelancerType,
      introduction:this.state.introduction,
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
      return false;
    }
    return true;
  }
  return false;
}


pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.cancelled) {
      this.setState({profilePicture:result.uri});

      var name=this.state.id;

      firebase.storage()
      .ref(name)
      .putFile(this.state.profilePicture)
      .then((snapshot) => {
        //You can check the image is now uploaded in the storage bucket
        console.log(` has been successfully uploaded.`);
      })
      .catch((e) => console.log('uploading image error => ', e));
        }

    
  };
    


  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await this.uploadImageAsync(pickerResult.uri);
        this.setState({ profilePicture: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } 
  };

  uploadImageAsync = async (uri)=> {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

  
    const ref = firebase
      .storage()
      .ref()
      .child(this.state.id+'_dp');
    const snapshot = await ref.put(blob);
  
    blob.close();

    
    return await snapshot.ref.getDownloadURL();
  }

 render() {


    

     return (  

      <ScrollView style={{ backgroundColor: 'white' }}>


        

          <TouchableHighlight style={{overflow:'hidden',borderRadius:50,alignSelf: 'center'}} onPress={this._pickImage}>

          <Image 
          style={styles.tinyLogo}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../../assets/blankdp.jpg')}
          />

          
          </TouchableHighlight>

        <Text style={{alignSelf: 'center', fontSize: 25}}>{this.state.name}</Text>


        <View style={{flexDirection:"column", alignItems: 'center'}}>
        <DropDownPicker
         placeholder="Freelance Type: "
          items={[
              {label: 'Emcee', value: 'Emcee'},
              {label: 'Fitness Coach', value: 'Fitness Coach'},
              {label: 'Graphic Designer', value: 'Graphic Designer'},
              {label: 'Magician', value: 'Magician'},
              {label: 'Makeup Artist', value: 'Makeup Artist'},
              {label: 'Photographer', value: 'Photographer'},
              {label: 'Translator', value: 'Translator'},
              {label: 'Video Editor', value: 'Video Editor'},
              {label: 'Web Developer', value: 'Web Developer'},
              
          ]}
          defaultValue={this.state.freelancerType}
          containerStyle={{height: 40, width:150,alignItems: 'center'}}
          onChangeItem={item => this.setState({
            freelancerType: item.value
          })}
        />
        </View>


        <View style={styles.container}>
            <View style={{flexDirection:"column", alignItems: 'flex-start'}}>
              <Text style={{marginLeft: 20, fontSize:20}}>{`Profile Highlight:`}</Text>
              <Text style={{marginLeft: 20, fontSize:15}}>{`(This will appear\n on the search page)`}</Text>
            </View>
            
            <TextInput

                    style={styles.input}
                    placeholder='Profile Highlight'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.setState({bio:text})}
                    value={this.state.bio}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            
        </View>


        <View style={styles.container}>
            <Text style={{marginLeft: 20, fontSize:20}}>{`Service Fee:`}</Text>
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

        <View style={styles.container,{flexDirection:"column"}}>
            <View style={{flexDirection:"column", alignItems: 'flex-start'}}>
              <Text style={{marginLeft: 20, fontSize:20}}>{`Detailed Self Introduction:`}</Text>
              <Text style={{marginLeft: 20, fontSize:15}}>{`(This will appear on your profile page)`}</Text>
            </View>
            
            <TextInput

                    style={styles.input,{marginLeft:20,fontSize:20}}
                    placeholder={`Clients will see your self introduction\nwhen they have clicked into your profile`}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.setState({introduction:text})}
                    value={this.state.introduction}
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


        
            <View style={{alignItems:'center'}}>
              <TouchableOpacity  style={{width:100,borderRadius:50,backgroundColor:'#17E0FF'}}  onPress={()=>this.saveOnPress()}><Text style={{alignSelf: 'center',fontSize: 25}}>Save</Text></TouchableOpacity >
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

  tinyLogo: {
    width: 100,
    height: 100
    
  },


  input: {
    fontSize:20,
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

  



});