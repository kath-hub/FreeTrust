import React, { Component } from 'react'
import {Alert, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'



import * as firebase from 'firebase';
import ApiKeys from '../constants/ApiKeys';
import StarRating from 'react-native-star-rating';

export default class AddReviewPage extends Component {

    state = {
        receiverId: "",
        comment:"",
        creater:"",
        createrId:"",
        createDate:"",
        rating:0,
        userType: -1

    }

    constructor(props){
        super(props);
        this.state.receiverId = this.props.route.params.data.receiverId;
        this.state.userType = this.props.route.params.data.userType;
        var date = new Date();
        date = date.toISOString().split('T')[0]
        this.state.createDate = date

        var user = firebase.auth().currentUser;

        if (user) {
          // User is signed in.
          this.state.createrId = user.uid
        }



    }

    onAddPress = () => {
        console.log("press")
        console.log(this.state)

        if (this.state.createrId === this.state.receiverId){
            Alert.alert(
                'Invalid',
                'You cannot leave comment for yourself',
                [
                  { text: 'OK', onPress: () => {} }
                ],
                { cancelable: false }
              );
              return null

        }

        if (this.state.comment===""){
            Alert.alert(
                'Empty Review',
                'Please fill in Review',
                [
                  { text: 'OK', onPress: () => {} }
                ],
                { cancelable: false }
              );

            return null
        }

        if (this.state.rating===0){
            Alert.alert(
                'Empty rating',
                'Please fill in rating',
                [
                  { text: 'OK', onPress: () => {} }
                ],
                { cancelable: false }
              );

            return null
        }



        const userRef = firebase.firestore().collection("users").where("id", '==', this.state.createrId)
        userRef.get().then(querySnapshot => {
        if (!querySnapshot.empty){
            const userDoc = querySnapshot.docs[0].data()
            var name = userDoc.name
    
            this.setState({creater:name})
            console.log("inside get")
            console.log(this.state)
        }
        }).then( () => {        
            console.log("onpress")
            console.log(this.state)
        }).then( () => {        
            console.log("updating reviews array")
            console.log(this.state)

            if (this.state.userType===1){
                var numOfReview = 0
                var averageRating = 0

                var receiverDocumentId = ""
                var receiverRef = firebase.firestore().collection("freelancers").where("id", '==', this.state.receiverId)
                receiverRef.get().then(querySnapshot => {
                    if (!querySnapshot.empty){
                        const userDoc = querySnapshot.docs[0].data()
                        console.log("receiver get")
                        numOfReview = userDoc.reviews.length
                        averageRating = userDoc.averageRating
                        receiverDocumentId = querySnapshot.docs[0].id


                    }
                }).then( ()=> {
                    console.log(numOfReview)
                    console.log(averageRating)

                    var newReview = {
                        creater: this.state.creater,
                        createDate: this.state.createDate,
                        createrId: this.state.createrId,
                        comment: this.state.comment,
                        rating: this.state.rating
                    }

                    var oldSumOfRating = averageRating*numOfReview
                    averageRating = (Math.round((oldSumOfRating+newReview.rating)*100/(numOfReview+1)))/100
                    console.log("new average")
                    console.log(averageRating)
                    console.log(receiverDocumentId)

                    receiverRef = firebase.firestore().collection("freelancers").doc(receiverDocumentId);

                    receiverRef.update({
                        averageRating: averageRating
                    })
                    .then(function() {
                        console.log("average rating successfully updated!");

                        receiverRef.update({
                            reviews: firebase.firestore.FieldValue.arrayUnion(newReview)
                        })
                        .then(() => {
                            console.log("reviews successfully updated!");
                            console.log(receiverDocumentId)
                            Alert.alert(
                                'Review submitted',
                                'Your review has been received',
                                [
                                  { text: 'OK', onPress: () => {} }
                                ],
                                { cancelable: false }
                                )
                            }).catch(function error(e){
                                Alert.alert(
                                  e,
                                  [
                                    { text: 'OK'}
                                  ],
                                  { cancelable: false }
                                  )
                            
                            })
                        
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating average rating: ", error);
                    });

                })
            }


            if (this.state.userType===0){
                var numOfReview = 0
                var averageRating = 0

                var receiverDocumentId = ""
                var receiverRef = firebase.firestore().collection("ss").where("id", '==', this.state.receiverId)
                receiverRef.get().then(querySnapshot => {
                    if (!querySnapshot.empty){
                        const userDoc = querySnapshot.docs[0].data()
                        console.log("receiver get")
                        numOfReview = userDoc.reviews.length
                        averageRating = userDoc.averageRating
                        receiverDocumentId = querySnapshot.docs[0].id


                    }
                }).then( ()=> {
                    console.log(numOfReview)
                    console.log(averageRating)

                    var newReview = {
                        creater: this.state.creater,
                        createDate: this.state.createDate,
                        createrId: this.state.createrId,
                        comment: this.state.comment,
                        rating: this.state.rating
                    }

                    var oldSumOfRating = averageRating*numOfReview
                    averageRating = (Math.round((oldSumOfRating+newReview.rating)*100/(numOfReview+1)))/100
                    console.log("new average")
                    console.log(averageRating)
                    console.log(receiverDocumentId)

                    receiverRef = firebase.firestore().collection("ss").doc(receiverDocumentId);

                    receiverRef.update({
                        averageRating: averageRating
                    })
                    .then(function() {
                        console.log("average rating successfully updated!");

                        receiverRef.update({
                            reviews: firebase.firestore.FieldValue.arrayUnion(newReview)
                        })
                        .then(() => {
                            console.log("reviews successfully updated!");
                            console.log(receiverDocumentId)
                            Alert.alert(
                                'Review submitted',
                                'Your review has been received',
                                [
                                  { text: 'OK', onPress: () => {} }
                                ],
                                { cancelable: false }
                                )
                            }).catch(function error(e){
                                Alert.alert(
                                  e,
                                  [
                                    { text: 'OK'}
                                  ],
                                  { cancelable: false }
                                  )
                            
                            })
                        
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating average rating: ", error);
                    });

                })
            }

        })
        .catch((error) => {
            alert(error)
        });



    }


  onStarRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={{flexDirection: 'row', alignContent:'flex-start'}}>
                        
                        <View style={{flex: 1, margin: 10, flexDirection: 'row'}}>
                            <Text style={{fontSize: 18}}>Rating:</Text>
                        </View>
                        <View style={{flex: 1, marginVertical:12}}>
                        <StarRating 
                            disabled={false}
                            rating={this.state.rating}
                            numberOfStars={5}
                            fullStarColor='#edca79'
                            emptyStarColor='#000'
                            name='rating'
                            starSize={22}
                            marginVertical= '5'
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', alignContent: 'center'}}>
                        
                        <View style={{flex: 0.5, margin: 10, flexDirection: 'row'}}>
                            <Text style={{fontSize: 18}}>Review:</Text>
                        </View>
                        <TextInput
                            style={styles.comment}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => this.setState({comment:text})}
                            value={this.state.comment}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.onAddPress()}>
                        <Text style={styles.buttonTitle}>Add</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    comment: {
        height: 90,
        width: 280,
        borderRadius: 5,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    title: {
        height: 48,
        width: 280,
        borderRadius: 5,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    input: {
        height: 48,
        width: 280,
        borderRadius: 5,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
});
