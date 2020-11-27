import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import ReviewItem from './ReviewItem'


const { width, heigth } = Dimensions.get('window')

const ReviewList = ({ data }) => {
    const [dataList, setDataList] = useState(data);

    useEffect(()=> {
        setDataList(data)
    })

    if (data && data.length) {
        return (
        <FlatList 
            keyExtractor={(item) => item.id} 
            data={data} 
            snapToAlignment="center"
            renderItem={({ item }) => {
             return <ReviewItem item={item}/>
            }}
        />
        )
    } else {
        return <Text style={{color: 'gray'}}>No reviews yet</Text>
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
  });

  export default ReviewList;