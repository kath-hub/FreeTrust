import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import JobItem from './JobItem'


const { width, heigth } = Dimensions.get('window')

const JobList = ({ data }) => {
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
             return <JobItem item={item}/>
            }}
        />
        )
    } else {
        return <View style={{justifyContent: 'center'}}>
                <Text style={styles.subDetailText}>No reviews yet</Text>
            </View>
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
        subDetailText: {
        color: 'gray',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0.5,
        lineHeight: 28,
        marginHorizontal: 20,
        justifyContent: 'center',
      },
  });

  export default JobList;