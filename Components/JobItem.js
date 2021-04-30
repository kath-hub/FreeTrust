import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window')




const JobItem = ({ item }) => {

    return (

            <View style={styles.cardView}>
                <View style={styles.textView}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

                        <Text style={styles.itemCreator}> {item.creater}</Text>
                        
                        <Text style={styles.itemLightText}>{item.createDate}</Text>
                        
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.itemTitle}> {item.jobTitle}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.itemComment}> {item.jobDetail}</Text>
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
        margin: 20,
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
    itemTitle: {
        color: '#788eec',
        fontSize: 18,
        marginVertical: 3,
        fontWeight: "bold",
    },
    itemComment: {
        color: 'black',
        fontSize: 15,
        marginBottom: 5,
        fontWeight: "500",
    },
    itemLightText: {
        color: 'gray',
        fontSize: 14,
        marginBottom: 3,
        paddingLeft: 5,
    }
})

export default JobItem;
