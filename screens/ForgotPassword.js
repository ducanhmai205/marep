  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Image,
    Text,
    Alert,
    TouchableOpacity,
    TextInput
  } from 'react-native';

  class ForgotPassword extends Component {
  	constructor(props) {
      super(props)
      this.state = {
       
        UserEmail: '',

      }
    }

    UserForgot = () =>{
   fetch('http://35.185.68.16/api/v1/password/forgot', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      email: this.state.UserEmail,
   
     
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
         
   

           if(responseJson.status === true)
           {
               Alert.alert(responseJson.message);
           }
           else{
          
                   
                     Alert.alert(responseJson.message);
             
              
             }
         
        }).catch((error) => {
          console.error(error);
        });
   
    }
    render() {
    	const { navigate } = this.props.navigation;
      const {goBack} = this.props.navigation;
      return (
        <Image  source={require('../img/user/forgotpass.png')} style={styles.backgroundImage}>
        	<View style={styles.container}>

        			<View style={styles.header}>

                              <TouchableOpacity  style={{flex: 0.2,paddingTop: 10}} onPress={() => goBack()}>
                                    <Image  source={require('../img/Xbutton.png')} style={styles.xButton}>
                                    </Image>
                              </TouchableOpacity>
        			</View>

        			<View style={styles.space}>

        			</View>
        			<View style={styles.textInput}>
        				  <TextInput
                                    style={{flex: 1,paddingLeft: 40}}
                                    underlineColorAndroid='transparent'
                                    placeholder="E-mail"
                                    placeholderTextColor = "#47E5B3"
                                    onChangeText={UserEmail => this.setState({UserEmail})}
                                    keybroadType="email-address"
                              />
        			</View>
        			<View style={styles.mid}>

        			</View>

        			<View style={styles.buttonConfirm}>
        					<TouchableOpacity  style={{flex: 1,}} onPress={this.UserForgot} >
                                      <Image  source={require('../img/user/button.png')} style={{flex: 1,width:null,height:null}}>
                                      </Image>
                                </TouchableOpacity>
        			</View>
        			<View style={styles.bottom}>

        			</View>
        	</View>
        </Image>
      );
    }
  }

  const styles = StyleSheet.create({
  backgroundImage:{
  	flex: 1,
  	height: null,
  	width: null
  },
  container:{
  	flex: 1,
  	marginHorizontal: 40,

  },
  header:{
  	flex: 1.3,

      marginHorizontal: -40,
  	  flexDirection:'row',
  	  justifyContent: 'flex-end',
  },
  xButton:{
    flex: 0.5,
    width:null,
    height:null,
    marginTop:10
  },
  space:{
  	flex: 4.7,
  	
  },
  textInput:{
  	flex: 1,
  	
  },
  mid:{
  flex: 1.3,
  },
  buttonConfirm:{
  	flex: 1,
  	
  },
  bottom:{
  	flex: 3,

  }
  });


  export default ForgotPassword;