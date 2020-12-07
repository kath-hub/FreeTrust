


import React from 'react';
import { ScrollView, TextInput, Image, TouchableHighlight ,TouchableOpacity, Alert, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'expo-image-picker';
import ImageModal from 'react-native-image-modal';
import DialogInput from 'react-native-dialog-input';

import * as firebase from 'firebase';


import SearchPage from '../SearchPage';
import PickFreelanceToSearchPage from '../PickFreelanceToSearchPage';



export default class SSEditProfile extends React.Component {

    

    
    

    constructor(props){
        super(props);
        this.state = {
                  id:"",
                  profilePicture:"",
                  name:"",
                  introduction:"",
                  phoneNumber:"",
                }
        if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
       
        firebase.firestore().collection("ss").doc(this.props.route.params.item.id).onSnapshot(doc=>{
                  

          this.setState({
            id:doc.id,
            name:doc.data().name,
            introduction:doc.data().introduction,
            phoneNumber:doc.data().phoneNumber,
                            
          })

  
        })

        firebase
          .storage()
          .ref()
          .child(this.props.route.params.item.id+'_dp')
          .getDownloadURL()
          .then((url) => {
            this.setState({profilePicture: url});
          })
          .catch((e) => console.log('dp not uploaded ', e));
          

    }

       
        
  
          
    

saveOnPress(){
  var ref = firebase.firestore().collection("ss").doc(this.props.route.params.item.id);
  ref.update(
    {
      introduction:this.state.introduction,
      phoneNumber:this.state.phoneNumber,
    }
      ).then(()=>{
        Alert.alert(
    'Profile Updated',
    'Your Profile Has Updated',
    [
      { text: 'OK', onPress: () => this.props.navigation.navigate('PersonalProfilePage') }
    ],
    { cancelable: false }
    )
    })
  .catch(function error(e){
    Alert.alert(
      'Some fields are empty',
      'Please fill in all the fields',
      [
        { text: 'OK'}
      ],
      { cancelable: false }
      )



  })

        
  
  
}




  _pickImage = async (imgType) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaType: 'photo',
      allowsEditing: true,
      //aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult,imgType);
  };

  
  _handleImagePicked = async (pickerResult,imgType) => {
    try {

      if (!pickerResult.cancelled) {
        const uploadUrl = await this.uploadImageAsync(pickerResult.uri,imgType);

        if (imgType=='dp'){
          //console.log(uploadUrl)
          this.setState({ profilePicture: uploadUrl });
          firebase.firestore().collection("ss").doc(this.props.route.params.item.id).update({profilePicture:this.state.profilePicture})
        }
        if (imgType=='c'){
          //console.log(uploadUrl)
          var c = this.state.credentials
          var newC ={imgName:this.state.id+'_c_'+this.state.credentials.length,url:uploadUrl};  

          c.push(newC)

          this.setState({ credentials: c });
          firebase.firestore().collection("ss").doc(this.props.route.params.item.id).update({credentials:this.state.credentials})

        }

        if (imgType=='pg'){
          console.log(uploadUrl)
          var pg = this.state.portfolioGallery
          var newPg ={imgName:this.state.id+'_pg_'+this.state.portfolioGallery.length,url:uploadUrl};  

          pg.push(newPg)

          this.setState({ portfolioGallery: pg });
          firebase.firestore().collection("ss").doc(this.props.route.params.item.id).update({portfolioGallery:this.state.portfolioGallery})

        }
        
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } 
  };

  uploadImageAsync = async (uri,imgType)=> {
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


    let ref=null;


    if (imgType=='dp'){
      ref = firebase
      .storage()
      .ref()
      .child(this.state.id+'_dp');
    }

    else if(imgType=='c'){
      
      var cid=this.state.credentials.length;

      ref = firebase
      .storage()
      .ref()
      .child(this.state.id+'_c_'+cid);

 
    }

    else if(imgType=='pg'){
      
      var cid=this.state.portfolioGallery.length;

      ref = firebase
      .storage()
      .ref()
      .child(this.state.id+'_pg_'+cid);

 
    }
    


    const snapshot = await ref.put(blob);
  
    blob.close();

    
    return await snapshot.ref.getDownloadURL();
  };


  deleteButton(img,imgType){
    console.log(img.imgName)
    Alert.alert(
      "Delete Picture",
      "Are you sure you want to delete this?",
      [
        {
          text: "Yes",
          onPress: () => {

            firebase.storage().ref().child(img.imgName).delete().then(()=> {
              if (imgType=='c'){
                let c=this.state.credentials
                const index = c.indexOf(img);
                if (index > -1) {
                  c.splice(index, 1);
                  this.setState({ credentials: c });
                  firebase.firestore().collection("ss").doc(this.props.route.params.item.id).update({credentials:this.state.credentials})
                }
              }

              if (imgType=='pg'){
                let pg=this.state.portfolioGallery
                const index = pg.indexOf(img);
                if (index > -1) {
                  pg.splice(index, 1);
                  this.setState({ portfolioGallery: pg });
                  firebase.firestore().collection("ss").doc(this.props.route.params.item.id).update({portfolioGallery:this.state.portfolioGallery})
                }
              }
              

              Alert.alert(
                "Delete Successful",
                "Delete Successful",
                [
                  {
                    text: "OK",
                  },
                ],
                { cancelable: false }
              );
            }).catch(function(error) {
              console.log(error)
              // Uh-oh, an error occurred!
              Alert.alert(
                "Delete Failed",
                "Delete Failed",
                [
                  {
                    text: "OK",
                  },
                ],
                { cancelable: false }
              );
            });
          }
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

  }


 render() {

    
     return (  

      <ScrollView style={{ backgroundColor: 'white' }}>


        

          <TouchableHighlight style={{overflow:'hidden',borderRadius:50,alignSelf: 'center'}} onPress={()=>this._pickImage('dp')}>

          <Image 
          style={styles.tinyLogo}          
          source={this.state.profilePicture?{uri: this.state.profilePicture,}:require('../../assets/blankdp.jpg')}
          />

          
          </TouchableHighlight>
        <Text style={{alignSelf: 'center', fontSize: 15}}>(Click above to change display picture)</Text>
        <Text style={{alignSelf: 'center', fontSize: 25}}>{this.state.name}</Text>





        <View style={styles.container,{marginTop:10,flexDirection:"column"}}>
            <View style={{flexDirection:"column", alignItems: 'flex-start'}}>
              <Text style={{marginLeft: 20, fontSize:20, fontWeight: 'bold', color: '#788eec',}}>{`Detailed Self Introduction:`}</Text>
              <Text style={{marginLeft: 20, fontSize:15, color: 'gray'}}>{`(This will appear on your profile page)`}</Text>
            </View>
            
            <View style={{marginHorizontal:20,marginVertical:10,borderWidth:1,padding:10}}>
            <TextInput

                    style={styles.input,{fontSize:20,height:100}}
                    multiline={true}
                    placeholder={`Clients will see your self introduction\nwhen they have clicked into your profile`}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.setState({introduction:text})}
                    value={this.state.introduction}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>
            
        </View>

        <View style={styles.container,{flexDirection:"column"}}>
            <View style={{flexDirection:"column", alignItems: 'flex-start'}}>
              <Text style={{marginLeft: 20, fontSize:20, fontWeight: 'bold', color: '#788eec',}}>{`Your contact number:`}</Text>
              <Text style={{marginLeft: 20, fontSize:15, color: 'gray'}}>{`Only those who you have made a connection with can\nsee your contact number:`}</Text>
            </View>

            <View style={{marginHorizontal:20,marginVertical:10,borderWidth:1,padding:10}}>
            <TextInput

                    style={styles.input,{fontSize:20}}
                    placeholder={`Your phone number \n(for communication purposes)`}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.setState({phoneNumber:text})}
                    value={this.state.phoneNumber}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            </View>
            
        </View>

        
            <View style={{marginTop:45,alignItems:'center'}}>
              <TouchableOpacity  style={{width:100,borderRadius:50,backgroundColor:'#788eec'}}  onPress={()=>this.saveOnPress()}><Text style={{alignSelf: 'center',fontSize: 25}}>Save</Text></TouchableOpacity >
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
    width:'90%',
    height: 48,
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