'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
class InfomationVersion extends Component {
constructor(props) {
  super(props);

  this.state = {
    mainContent : ''
  };
}




componentWillMount() {

  let formdata = new FormData();
  formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.customer.id);
  console.log("info",formdata)
  fetch('http://35.185.68.16/api/v1/content/getVersion', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8, text/plain',
    },
    body: formdata

  }).then((response) => {
var responseBody = response._bodyText;
 
this.setState({
  mainContent : responseBody
})

})
}
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
          <ScrollView>
              <Text style={{color:'#887F9F'}}> {this.state.mainContent}</Text>
              </ScrollView>

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