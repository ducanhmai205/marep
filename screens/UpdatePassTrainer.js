  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Image,
    Platform,
    TouchableOpacity,
    TextInput,
    Text,
    Alert
  } from 'react-native';
  import { Font } from 'expo';


  class UpdatePassTrainer extends Component {

    constructor(props) {
   
      super(props)
   
      this.state = {

        type:'',
        id:'',
        access_token:'',
        oldPass: '',
        newPass: '',
        newPassConfirm: '',
        value: '',
        jobID: '',
        }
        
          
   }

  trainerUpdatePass = () =>{
   
   
   const { oldPass }  = this.state ;
   const { newPass }  = this.state ;
   const { newPassConfirm }  = this.state ;

   

  fetch('http://35.185.68.16/api/v1/trainer/changePassword', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
    type  : this.props.navigation.state.params.Account.type,
      id  : this.props.navigation.state.params.Account.trainer.id,
    access_token  : this.props.navigation.state.params.Account.trainer.access_token,

      old_password: oldPass,
   
      password: newPass,

      password_confirmation: newPassConfirm,
      
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
    if(responseJson.status === true){
         this.props.navigation.navigate('TrainerProfile', { Account: this.props.navigation.state.params.Account  });
        }
          else{
            
             if(typeof(responseJson.message) === 'string'){
                   
                     Alert.alert(responseJson.message);
             } else if(typeof responseJson.message === 'undefined') {
                Alert.alert('旧パスワードが正しくありません')
             }
             else{
              console.log("abc",responseJson.message)
              var error_object =  responseJson.message[Object.keys(responseJson.message)[0]];
              
              Object.keys(responseJson.message)[0];
                var error_old_password = '';
                var error_password = '';
              
                
                if (responseJson.message.old_password) {
                 for (var i = 0, len = responseJson.message.old_password.length; i < len; i++) {
                        error_old_password += responseJson.message.old_password[i] + '!'
                      }
                }
                if (responseJson.message.password) {
                 for (var i = 0, len = responseJson.message.password.length; i < len; i++) {
                        error_password += responseJson.message.password[i] + '!'
                      }
                }

               
                    
                Alert.alert(error_object[0] );
               
              }
           }
   
          
   
        }).catch((error) => {
          console.error(error);
        });
   
   
    }

    render() {
      const { navigate } = this.props.navigation;
      const {goBack} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Image  source={require('../img/update/updatepassbg.png')} style={styles.backgroundImage}>
            <View style={styles.containerImage}>
                <View style={styles.textHeader}>
                
                              <TouchableOpacity  style={{flex: 0.2,}}   onPress={ () => goBack(null)  }>
                                    <Image  source={require('../img/Xbutton.png')} style={{flex: 0.5,width:null,height:null,marginTop:10}}>
                               
                                    </Image>
                              </TouchableOpacity>

                      
                </View>

                      <View style={styles.fbButton}>
                        <TouchableOpacity  style={{flex: 1,}}>
                             
                        </TouchableOpacity>
                      </View>

                            <View style={styles.orButton}>

                            </View>

                                <View style={styles.oldPass}>
                                      <TextInput
                                            style={{flex: 1,paddingLeft: 40,fontSize: 15}}
                                            underlineColorAndroid='transparent'
                                            returnKeyType="next"
                                            autoCapitalize="none"
                                          
                                                        placeholder="旧パスワード"
                                                        placeholderTextColor = "#47E5B3"
                                            onChangeText={oldPass => this.setState({oldPass})}
                                      />

                                </View>

                                      <View style={styles.newPass}>
                                         <TextInput
                                                      style={{flex: 1,paddingLeft: 5,fontSize: 15}}
                                                      underlineColorAndroid='transparent'
                                                      placeholder="新パスワード"
                                                      returnKeyType="next"
                                                      autoCapitalize="none"
                                                    autoCorrect={false} 
                                                      clearTextOnFocus={false}
                                                      placeholderTextColor = "#47E5B3"
                                                      onChangeText={newPass => this.setState({newPass})}
                                                     
                                                                   />

                                                               

                                              
                                      </View>

                                          <View style={styles.newPassConfirm}>
                                              <TextInput
                                                      style={{flex: 1,paddingLeft: 5,fontSize: 15}}
                                                      underlineColorAndroid='transparent'
                                                      placeholder="新パスワード（確認）"
                                                      returnKeyType="next"
                                                      autoCapitalize="none"
                                                    autoCorrect={false} 
                                                      clearTextOnFocus={false}
                                                      placeholderTextColor = "#47E5B3"
                                                      onChangeText={newPassConfirm => this.setState({newPassConfirm})}
                                                      
                                                                   />

                                                               

                                              
                                              


                                          </View>

                                            <View style={styles.checkBox}>
                                             
                                             </View>

                                                <View style={styles.submitButton}>
                                                      <TouchableOpacity  style={{flex: 1,}} onPress={this.trainerUpdatePass}>
                                                            <Image  source={require('../img/update/updatepassbutton.png')} style={{flex: 1,width:null,height:null,}}>
                                                            </Image>
                                                      </TouchableOpacity>
                                                </View>

                                                    <View style={styles.loginButton}>
                                                          
                                                    </View>
            </View>                                     
          </Image>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'white'
  },
  backgroundImage:{
    flex: 1,
    height:null,
    width:null,
    
  },
  containerImage:{
  flex: 1,

  },
  textHeader:{
     flex: 1.1,
  flexDirection:'row',
   paddingHorizontal:23,
  justifyContent: 'flex-end',
  alignItems: 'center',

  },
  fbButton:{
    flex: 0.85,
    marginLeft:3,
    paddingTop:2,
    paddingHorizontal:23,
  },
  orButton:{
  flex: 1.3,

  },
  oldPass:{
    flex: 0.9,
    paddingHorizontal:23,
  },
  newPass:{
   flex: 0.9,
    flexDirection:'row',
    paddingHorizontal:58,

    justifyContent: 'center',
    alignItems: 'center',
  },
  newPassConfirm:{
    flex: 0.9,
    flexDirection:'row',
    paddingHorizontal:58,

    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox:{
   flex: 1.2,

  alignItems: 'center',
  justifyContent: 'center',
   paddingHorizontal:23,
  },
  submitButton:{
  flex: 0.7,
    paddingHorizontal:18,
    marginLeft:5
  },
  loginButton:{
  flex: 1.2,

  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0)',
  paddingLeft:20
  },
  text3:{
    backgroundColor:'rgba(0,0,0,0)',
    
    color: 'black',
   justifyContent: 'center',
   alignItems: 'center',
  },
  });


  export default UpdatePassTrainer;