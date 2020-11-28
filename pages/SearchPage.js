import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { Image,TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PickFreelanceToSearchPage from './PickFreelanceToSearchPage'
import EditProfile from './EditProfile/EditProfile'
import StarRating from 'react-native-star-rating';
import { Button, Menu, Divider, Provider } from 'react-native-paper';



import * as firebase from 'firebase';
import 'firebase/firestore';


export default class SearchPage extends React.Component {

    state = {
      freelancers:[],
      searchLoc:"",
      menuVisible:false
    }

    


    constructor(props){
        super(props);

        this.pickerRef = React.createRef()
    
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
    this.props.navigation.navigate('EditProfile',{item})
  };

  filterLocation(){

  }

 render() {
  function loc(locations) {

  
    const list = []
  
    locations.forEach((location) => {
      
      if (location=="Central and Western"){
        list.push(<Text style={styles.locations}>Central and</Text>)
        list.push(<Text style={styles.locations}>Western</Text>)
      }
      else{list.push(<Text style={styles.locations}>{location}</Text>)}
    })
  
    return (
      <View>
        {list}
      </View>
    )
  }
 
  const renderItem = ({ item }) => (
    
    

      (item.data().freelancerType==this.props.route.params.freelancetype && (this.state.searchLoc==""?true:item.data().locations.indexOf(this.state.searchLoc)>-1) )?
      <TouchableOpacity style={styles.rowCellStyle} onPress={()=>this.onPress(item)}> 
        
        
        
        <View style={styles.itemleft}>
          <Image 
          style={{height:85,width:85,borderRadius:85,borderWidth:1}}          
          source={item.data().profilePicture?{uri: item.data().profilePicture,}:require('../assets/blankdp.jpg')}
          />
          <Text style={styles.name}>{item.data().name}</Text><Text style={styles.serviceFee}>{item.data().serviceFee}</Text>
        </View>
        <View style={styles.itemmiddle}><Text style={styles.locations}>{loc(item.data().locations)}</Text>
         
          
          
          </View>
          <View style={styles.itemright}> 
          
          
          <Text style={{fontSize:20}}>Rating:</Text>

          <StarRating 
          disabled={true}
          rating={item.data().averageRating}
          numberOfStars={5}
          name='rating'
          starSize={23}
          marginVertical= '5'
          />
          <Text style={{fontSize:15,marginVertical: 2,}}>+({item.data().reviews.length})</Text>
          <Text style={styles.bio}>{item.data().bio}</Text>
          </View>

          
          
        </TouchableOpacity>:null
  );

  

     return (
      <Provider>
        <SafeAreaView style={styles.container}>
          
          
         
        <View style={{width:'100%',alignSelf:'flex-start',justifyContent: 'space-between', flexDirection:"row"}}> 
          <Text style={{marginLeft:3,fontSize:25,alignSelf:'center'}}>{this.props.route.params.freelancetype}</Text>
          <View style={{marginTop:25,alignSelf:'flex-end',justifyContent: 'center'}}>
            <Menu
              visible={this.state.menuVisible}
              onDismiss={()=>this.setState({menuVisible:false})}
              anchor={
                
                <TouchableOpacity style={{marginBottom:20,alignSelf:'flex-end',width:180, height:50, borderWidth:1, borderRadius:7,backgroundColor:'#76b6fe',  justifyContent: 'center',alignItems:'center' , flexDirection:'row'}} onPress={()=>this.setState({menuVisible:true})}>
                <Image 
                    style={{borderRadius:80,width:40,height:40,overflow:"hidden"}}          
                    source={require('../assets/search.png')}
                  />            
                <Text style={{alignSelf:'center',fontSize:20}}>Filter Location</Text>
              </TouchableOpacity>

              }
              style={{alignSelf:"center",justifyContent: 'center'}}
            >
              <Menu.Item onPress={() => {this.setState({searchLoc:"", menuVisible:false})}} title="Show All" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Online", menuVisible:false})}} title="Online" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Central and Western", menuVisible:false})}} title="Central and Western" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Eastern", menuVisible:false})}} title="Eastern" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Islands", menuVisible:false})}} title="Islands" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Kowloon City", menuVisible:false})}} title="Kowloon City" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Kwai Tsing", menuVisible:false})}} title="Kwai Tsing" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Kwun Tong", menuVisible:false})}} title="Kwun Tong" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"North", menuVisible:false})}} title="North" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Sai Kung", menuVisible:false})}} title="Sai Kung" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Sha Tin", menuVisible:false})}} title="Sha Tin" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Sham Shui Po", menuVisible:false})}} title="Sham Shui Po" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Southern", menuVisible:false})}} title="Southern" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Tai Po", menuVisible:false})}} title="Tai Po" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Tsuen Wan", menuVisible:false})}} title="Tsuen Wan" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Tuen Mun", menuVisible:false})}} title="Tuen Mun" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Wan Chai", menuVisible:false})}} title="Wan Chai" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Wong Tai Sin", menuVisible:false})}} title="Wong Tai Sin" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Yau Tsim Mong", menuVisible:false})}} title="Yau Tsim Mong" />
              <Menu.Item onPress={() => {this.setState({searchLoc:"Yuen Long", menuVisible:false})}} title="Yuen Long" />

              
            </Menu>
          </View>
        </View>
          
          <FlatList
            data={this.state.freelancers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </Provider>

        

     );

 }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:20,
    marginBottom:20,
    padding: 10,
  },

  rowCellStyle:{

    flexDirection: 'row',
    //marginRight:40,
    //marginLeft:40,
    marginBottom:20,
    //paddingTop:20,
    //paddingBottom:20,
    backgroundColor:'#788eec',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,

  },

  itemleft: { 
    //flexDirection: "row",
    //alignItems: 'center',
    //height:120,
    width:'33%',
    //justifyContent: "space-between",
    marginVertical:12,
    marginLeft:12
  },
  itemmiddle: { 
    flexDirection: "row",
    //flexDirection: "column",
    //alignItems: 'flex-start',
    //height:120,
    width:'30%',
    //justifyContent: "space-between",
    marginVertical:12,
    marginLeft:12

  },
  itemright: { 
    //flexDirection: "row",
    alignItems: 'flex-start',
    //justifyContent: "space-between",
    //height:120,
    width:'30%',
    marginVertical:12,
    marginRight:12,
    //marginLeft:12
  },
  name: {
    fontSize: 22,    
  },
  serviceFee:{
    marginVertical: 2,
    fontSize: 20,
  },

  locations:{
    fontSize: 18,
    flex: 1, 
    flexWrap: 'wrap'
  },

  bio: {
    fontSize: 22,
    marginTop:5,
    fontWeight:"700"
  },
});
