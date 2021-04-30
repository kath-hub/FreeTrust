import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window')


const ReviewItem = ({ item }) => {
    return (
        <View style={styles.cardView}>
            <View style={styles.textView}>
                <Text style={styles.itemCreator}> {item.creater}</Text>

                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.itemLightText}>{item.createDate}</Text>
                    </View>
                    
                    <View style={{flex: 0.5}}>
                        <StarRating 
                            disabled={true}
                            rating={parseFloat(item.rating)}
                            numberOfStars={5}
                            fullStarColor='#edca79'
                            emptyStarColor='#E5E5EA'
                            name='rating'
                            starSize={18}
                            marginVertical= '10'
                            />
                        </View>
                </View>

                <View style={{flex: 1}}>
                    <Text style={styles.itemComment}> {item.comment}</Text>
                </View>
                    


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 30,
        height: height / 5,
        backgroundColor: 'white',
        margin: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        position: 'relative',
        bottom: 10,
        margin: 30,
        left: 5,
    },
    image: {
        width: width - 20,
        height: height / 3,
        borderRadius: 10
    },
    itemCreator: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "bold",
    },
    itemComment: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
        fontWeight: "500",
    },
    itemLightText: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 5,
        paddingLeft: 5,
    }
})


export default ReviewItem
