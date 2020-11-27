import React, {Component} from 'react'
import { StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,   
    FlatList,
    Image,
    ImageBackground,
    Linking,
    Platform,
    ScrollView, } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },

  telIcon: {
    color: '#788eec',
    fontSize: 30,
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },

})

const ContactPhoneRow = ({
    containerStyle,
    number,
    onPressTel,
  }) => {
  
    return (
      <TouchableOpacity onPress={() => onPressTel(number)}>
        <View style={[styles.container, containerStyle]}>
          <View style={styles.iconRow}>
              <Icon
                name="call"
                underlayColor="transparent"
                iconStyle={styles.telIcon}
                onPress={() => onPressTel(number)}
              />
          </View>
          <View style={styles.telRow}>
            <View style={styles.telNumberColumn}>
              <Text style={styles.telNumberText}>{number}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  
  ContactPhoneRow.defaultProps = {
    containerStyle: {},
  }

  export default ContactPhoneRow;
