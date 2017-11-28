import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
var RCTLog = require('RCTLog');

export default class App extends React.Component {
   render() {
    return (
        <View style={styles.container}>
        <RootNavigation />
        </View>
      );
    }
     }
  

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
});
