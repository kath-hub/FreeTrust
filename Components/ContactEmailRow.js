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
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: '#788eec',
    fontSize: 30,
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },

  

})

const ContactEmailRow = ({ containerStyle, onPressEmail, email }) => (
    <TouchableOpacity onPress={() => onPressEmail(email)}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.iconRow}>
            <Icon
              name="email"
              underlayColor="transparent"
              iconStyle={styles.emailIcon}
              onPress={() => onPressEmail()}
            />
        </View>
        <View style={styles.emailRow}>
          <View style={styles.emailColumn}>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
  
  
  ContactEmailRow.defaultProps = {
    containerStyle: {},
  }

  export default ContactEmailRow;