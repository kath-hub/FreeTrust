import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, ScrollView} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Carousel from './Carousel';

const images = [
  {
    title: 'first',
   url:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
   description: 'Silent Waters in the mountains in midst of Himilayas',
   id: 1
  },
  {
    title: 'second',
    url:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    description:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
      id: 2
  },

  {
    title: 'third',
    url:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    description:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
      id: 3
  }
 ]

const FirstRoute = (props) => (
    <View style={[styles.scene, { backgroundColor: Colors.white }]}>
      <Text style={styles.detailText}>Introduction</Text>
      <Text style={styles.subDetailText}>{props.profile}</Text>
      <Text style={styles.detailText}>Portfolio Gallery</Text>
      <View>
            <Carousel data={images} />
          </View>

      <Text style={styles.detailText}>Credentials </Text>
      <View>
            <Carousel data={images} />
          </View>

    </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  );

const initialLayout = { width: Dimensions.get('window').width };

export default function ProfileTabView(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: "Profile" },
    { key: 'second', title: 'Review' },
    { key: 'third', title: 'Contact' },
  ]);

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//     third: ThirdRoute
//   });

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute profile={props.first} />;
      case 'second':
        return <SecondRoute />;
    case 'third':
        return <ThirdRoute />;
      default:
        return null;
    }
  };
  

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
      scrollEnabled={true}
      bounces={true}
    />
  );
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
  container: {
    flex: 1,
    marginBottom: 12,
  },
  scene: {
    flex: 1,
  },
  detailText: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginHorizontal: 20,
    marginVertical: 20,
  },

  subDetailText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '200',
    letterSpacing: 0.5,
    lineHeight: 28,
    marginHorizontal: 20,
  },
});