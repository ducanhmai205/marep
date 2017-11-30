import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert,Image } from 'react-native';

import { Facebook } from "expo";



export default class LoginFB extends Component {
  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '299185680599243',
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        
          <TouchableOpacity  style={styles.one} onPress={this._handleFacebookLogin}>
                     <Image  source={require('../img/FBbutton.png')} style={{flex: 1,width:null,height:null}}>
                                          </Image>
            </TouchableOpacity>
       
        
        
       
       
 
 
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
   },
   one:{
    flex: 1,
   },
   
  
  

  
   
 
}
);