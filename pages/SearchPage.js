import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfilePage from './ProfilePage'
import EditProfile from './EditProfile/EditProfile'
import StarRating from 'react-native-star-rating';




import * as firebase from 'firebase';
import 'firebase/firestore';

export default class SearchPage extends React.Component {

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
    this.props.navigation.navigate('EditProfile',{item})
  };

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

      <TouchableOpacity style={styles.rowCellStyle} onPress={()=>this.onPress(item)}> 
        <View style={styles.itemleft}><Text style={styles.name}>{item.data().name}</Text><Text style={styles.freelancerType}>{item.data().freelancerType}</Text><Text style={styles.serviceFee}>{item.data().serviceFee}</Text></View>
        <View style={styles.itemmiddle}><Text style={styles.locations}>{loc(item.data().locations)}</Text>
         
          
          
          </View>
          <View style={styles.itemright}> 
          
           {/* <Text style={styles.bio}>{item.data().bio}</Text> */}
          <Text style={{fontSize:20}}>Average Rating:</Text>

          <StarRating 
          rating={item.data().averageRating}
          numberOfStars={5}
          name='rating'
          starSize={22}
          marginVertical= '5'
          />
          <Text style={{fontSize:15,marginVertical: 2,}}>+({item.data().reviews.length})</Text>
          </View>

          
          
        </TouchableOpacity>
  );

  

     return (

        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.freelancers}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>


     );

 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    //alignItems: 'center',
    //justifyContent: 'center',
    padding: 12,
  },

  rowCellStyle:{

    flexDirection: 'row',
    //marginRight:40,
    //marginLeft:40,
    marginTop:20,
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
    backgroundColor: '#788eec',
    padding: 12,
    //marginVertical: 2,
    //marginHorizontal: 16,
  },
  itemmiddle: { 
    flexDirection: "row",
    //flexDirection: "column",
    //alignItems: 'flex-start',
    //height:120,
    width:'38%',
    //justifyContent: "space-between",
    backgroundColor: '#788eec',
    marginVertical: 12,
    //marginHorizontal: 16,
    //flexWrap: 'wrap',

  },
  itemright: { 
    //flexDirection: "row",
    alignItems: 'flex-start',
    //justifyContent: "space-between",
    //height:120,
    width:'33%',
    backgroundColor: '#788eec',
    marginVertical: 12,
    //marginHorizontal: 16,
  },
  name: {
    fontSize: 22,    
  },
  freelancerType: {
    marginVertical: 2,
    fontSize: 15,
    fontStyle: "italic",
    color: "#52527a"
  },
  serviceFee:{
    marginVertical: 2,
    fontSize: 20,
  },

  locations:{
    fontSize: 20,
    flex: 1, 
    flexWrap: 'wrap'
  },

  bio: {
    fontSize: 22,
  },
});
