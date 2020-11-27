import React, { Component } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'

class PersonalProfile extends Component {
 
  static propTypes = {
    img: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  static defaultProps = {
    containerStyle: {},
  }

  radioHandler = () => {
    if(this.state.freelancerCheck){
        this.setState({freelancerCheck:false});
    }
    this.setState({userType:0});
    this.setState({serviceSeekerCheck:true});
}

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>For Sale Property Details</Text>
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.name}>Angela</Text>
        <Text style={styles.descriptionText}>10+ years of experience</Text>
        <Text style={styles.descriptionText}>Awardee of XXXX</Text>
        <Text style={styles.descriptionText}>Specialise in xxx</Text>
      </View>
    )
  }

  renderNavigator = () => {
    return (
      <View style={{ flexDirection: 'row' , justifyContent: 'center'}} >
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]} onPress={this.radioHandler}>
          <Text style={styles.navigatorText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
          <Text style={styles.navigatorText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigatorButton, { flex: 1 }]}>
          <Text style={styles.navigatorText}>Calender</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderContactHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{uri: this.props.img}}
            style={styles.coverImage}
          >
            {/* <PhotoButton /> */}
          </ImageBackground>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderNavigator()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
        {/* <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>EMAIL</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}

const PersonalProfilePage = (props) => {
  return <PersonalProfile {...productData} {...props}/>
}

export default PersonalProfilePage

const productData = {
  name: "Jennis BNK48",
  username: "Jennis_BNK48",
  bio: "Singer",
  title: "338 Spear St #26G",
  address: "San Francisco, CA 94105",
  img:
    "https://i.imgur.com/X64evcq.jpg",
  detail: "Enjoy true urban living in this spacious one bedroom, one bath home at The Infinity. This full service home is finished with Studio Becker cabinetry, hardwood floors, Bosch and Thermador appliances, in-unit washer/dryer and custom lighting. Premium Secure Undergroud"
}

const Colors = {
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#4CD964',
  tealBlue: '#5AC8FA',
  blue: '#788eec',
  purple: '#5856D6',
  pink: '#FF2D55',

  white: '#FFFFFF',
  customGray: '#EFEFF4',
  lightGray: '#E5E5EA',
  lightGray2: '#D1D1D6',
  midGray: '#C7C7CC',
  gray: '#8E8E93',
  black: '#000000',
}


const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  coverContainer: {
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  scroll: {
    backgroundColor: '#FFF',
    flex: 1,
   //marginBottom: 55,
  },
  productRow: {
    margin: 25,
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 1,
  },
  coverMetaContainer: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#e36449',
    bottom: 0,
    flex: 0.1,
    flexDirection: 'row',
    height: 65,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  buttonFooter: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  navigatorButton: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  navigatorText: {
    alignItems: 'flex-start',
    color: Colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  borderCenter: {
    borderColor: '#FFA890',
    borderWidth: 0.5,
    height: 55,
  },
  textFooter: {
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    color: Colors.black,
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 5,
  },
  detailText: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  subDetailText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '100',
    letterSpacing: 0.5,
    lineHeight: 28,
  },
  descriptionText: {
    color: Colors.gray,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 2,
  },
})