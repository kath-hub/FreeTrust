import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { TouchableOpacity, SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProfilePage from './ProfilePage'
import StarRatings from 'react-star-ratings';


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
    console.log(item.id);
    this.props.navigation.navigate('ProfilePage',{item})
  };

 render() {

  function loc(locations) {

  
    const list = []
  
    locations.forEach((location) => {
      list.push(<li>{location}</li>)
    })
  
    return (
      <div>
        {list}
      </div>
    )
  }
 
  const renderItem = ({ item }) => (

      <TouchableOpacity style={styles.rowCellStyle} onPress={()=>this.onPress(item)}> 
        <View style={styles.itemleft}><Text style={styles.name}>{item.data().name}</Text><Text style={styles.freelancerType}>{item.data().freelancerType}</Text><Text style={styles.serviceFee}>{item.data().serviceFee}</Text></View>
        <View style={styles.itemmiddle}><Text style={styles.locations}>{loc(item.data().locations)}</Text>
         
          
          
          </View>
          <View style={styles.itemright}> 
          
           {/* <Text style={styles.bio}>{item.data().bio}</Text> */}
          <Text style={{fontSize:15,marginVertical: 2,}}>Average Rating:</Text>

          <StarRatings 
          rating={item.data().averageRating}
          starRatedColor="orange"
          numberOfStars={5}
          name='rating'
          starDimension='25'
          starSpacing='0'
          marginVertical= '2'
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
    padding: 16,
  },

  rowCellStyle:{

    flexDirection: 'row',
    marginRight:40,
    marginLeft:40,
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
    height:120,
    width:'33%',
    //justifyContent: "space-between",
    backgroundColor: '#788eec',
    padding: 12,
    marginVertical: 2,
    //marginHorizontal: 16,
  },
  itemmiddle: { 
    //flexDirection: "column",
    //alignItems: 'center',
    height:120,
    width:'33%',
    //justifyContent: "space-between",
    backgroundColor: '#788eec',
    padding: 12,
    marginVertical: 2,
    //marginHorizontal: 16,
  },
  itemright: { 
    //flexDirection: "row",
    alignItems: 'left',
    //justifyContent: "space-between",
    height:120,
    width:'33%',
    backgroundColor: '#788eec',
    padding: 20,
    marginVertical: 2,
    //marginHorizontal: 16,
  },
  name: {
    fontSize: 32,    
  },
  freelancerType: {
    marginVertical: 2,
    fontSize: 20,
    fontStyle: "italic",
    color: "#52527a"
  },
  serviceFee:{
    marginVertical: 2,
    fontSize: 20,
  },

  locations:{
    flexDirection: "column",
    fontSize: 30,
  },

  bio: {
    fontSize: 30,
  },
});
