
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
import ContactPhoneRow from './ContactPhoneRow';
import ContactEmailRow from './ContactEmailRow';

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
        },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    marginTop: 20,
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    borderColor: '#EDEDED',
    borderWidth: 0.8,
    flex: 8,
    flexDirection: 'row',
    marginBottom: 15
  },

})


  const Separator = () => (
    <View>
      <View style={styles.separatorOffset} />
      <View style={styles.separator} />
    </View>
  )

  class ContactInfo extends Component{
    constructor(props){
        super(props);
      }

    onPressTel = number => {
        Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
      }

    onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
        console.log('Error:', err)
    )
    }

    renderPhone = () => (
        <ContactPhoneRow
            number={"12345678"}
            onPressTel={this.onPressTel}
          />
          
    )

    renderEmail = () => (
        <ContactEmailRow
            email={"abc@abc.com"}
            onPressEmail={this.onPressEmail}
          />
    )


  render() {
    return (
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderPhone()}
            {Separator()}
            {this.renderEmail()}
          </Card>
        </View>
    )
  }
  }

  export default ContactInfo;


