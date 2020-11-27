import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text, ScrollView} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';


const FirstRoute = (props) => (
    <View style={[styles.scene, { backgroundColor: Colors.white }]}>
      <Text style={styles.detailText}>Introduction</Text>
      <Text style={styles.subDetailText}>{props.profile}</Text>


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
    fontWeight: '600',
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