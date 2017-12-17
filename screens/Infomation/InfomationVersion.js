'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
class InfomationVersion extends Component {
  render() {
      const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
       <StatusBar hidden />

          <View style={styles.header}>
              <TouchableOpacity onPress={ () => goBack(null)  }>
                <Ionicons name="ios-arrow-back" size={20} color="#493E6A" style={styles.icon} />
              </TouchableOpacity>
            <View style={styles.textHeader}>
                    <Text style={{color:'#887F9F'}}>バージョン情報 </Text>

            </View>
          </View>

          <View style={styles.mainContent}>
              <Text style={{color:'#887F9F'}}> テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
              テキストテキストテキストテキストテキストテキストテキストテキストテキスト</Text>


          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
 backgroundColor: 'white',
 flex: 1,
},
header:{
flex: 0.1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
borderBottomWidth: 2,
borderBottomColor: '#F8F5F8'
},
icon:{
 paddingLeft:38
},
textHeader:{
flex: 1,
marginRight:50,
justifyContent: 'center',
alignItems: 'center',

},
mainContent:{
  flex: 1.4,
  marginTop: 30,
  marginHorizontal: 38,
}
});


export default InfomationVersion;