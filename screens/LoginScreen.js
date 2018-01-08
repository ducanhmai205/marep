  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Platform,
    TouchableHighlight,
  } from 'react-native';
  import Dimensions from 'Dimensions';
  import { StackNavigator } from 'react-navigation';
  import { Ionicons } from '@expo/vector-icons';
  import LoginFB from '../screens/LoginFB';

   var navigation;
  class LoginScreen extends Component {
   
    constructor(props) {
      super(props)
      this.state = {
        hidePassword: true,
        UserEmail: '',
        UserPassword: '',
        Data:''
      }
      navigation = this.props.navigation;
    }


  onNavigate(data){
        console.log('name',data);

   
              if(data.type === 'customer'){      
                navigation.navigate('WelcomeTrainee', { Account: data  });
                }
              if(data.type === 'trainer'){
              navigation.navigate('WelcomeTrainer', { Account: data  });
                }
               if(typeof(data.message) === 'string'){
                   
                     Alert.alert(data.message);
             }
   }


  managePasswordVisibility = () =>
    {
      this.setState({ hidePassword: !this.state.hidePassword });
    }

  UserLoginFunction = () =>{
    console.log("device",this.state.Data)
   fetch('http://35.185.68.16/api/v1/customer/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   
      email: this.state.UserEmail ,
   
      password: 12345678
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
         
   

           if(responseJson.status === true)
           {
              if(responseJson.account.type === 'trainer'){
                this.props.navigation.navigate('TrainerProfile', { Account: responseJson.account  });
                console.log('2',responseJson.account)
                }
              if(responseJson.account.type === 'customer'){
                this.props.navigation.navigate('TraineeProfile', { Account: responseJson.account  });
                console.log('1',responseJson.account)
                }
           }
           else{
             if(typeof(responseJson.message) === 'string'){
                   
                     Alert.alert(responseJson.message);
                       console.log('2',responseJson.message)
             }
              else{
                var error_messEmail = '';
                var error_messPassword = '';
                if (responseJson.message.email) {
                 for (var i = 0, len = responseJson.message.email.length; i < len; i++) {
                        error_messEmail += responseJson.message.email[i] + '!'
                      }
                }

                if (responseJson.message.password) {
                 for (var i = 0, len = responseJson.message.password.length; i < len; i++) {
                        error_messPassword += responseJson.message.password[i] + '!'

                      }
                }
                    
                Alert.alert(error_messEmail, error_messPassword);

                
              }
             }
         
        }).catch((error) => {
          console.error(error);
        });
   
    }
    render() {
          const {goBack} = this.props.navigation;
          const { navigate } = this.props.navigation;
          const Backgrounds = {
          background: require('../img/user/loginbgg.png'),
          xButton: require('../img//Xbutton.png'),
          loginButton: require('../img/buttonlogin.png')
  };

      return (
        <View style={styles.container}>
              <Image  source={Backgrounds.background} style={styles.backgroundImage}>
                    <View style={styles.containerImage}>
                          <View style={styles.textHeader}>
                                  
                              <TouchableOpacity  style={{flex: 0.2,}} onPress={()=> {
                            navigate('TopScreen');}}>
                                    <Image  source={Backgrounds.xButton} style={styles.xButton}>
                                    </Image>
                              </TouchableOpacity>
                          </View>

                          <View style={styles.fbButton}>
                                      <TouchableOpacity  style={{flex: 1,}}>
                                            <LoginFB loginProp = {this.onNavigate} > </LoginFB>
                                      </TouchableOpacity>
                          </View>

                           <View style={styles.orButton}>
                           </View>

                          <View style={styles.nameInput}>
                              <TextInput
                                    ref='Email'
                                    style={{flex: 1,paddingLeft: 40}}
                                    underlineColorAndroid='transparent'
                                    returnKeyType = {"next"}                                 
                                    placeholder="E-mail"
                                    autoCapitalize="none"
                                    placeholderTextColor = "#47E5B3"
                                    onChangeText={UserEmail => this.setState({UserEmail})}
                                    keyboardType= 'email-address'
                                    onSubmitEditing={(event) => { 
                                      this.refs.Password.focus(); 
                                    }}
                              />
                          </View>

                          <View style={styles.passwordInput}>
                              <TextInput
                                    ref='Password'
                                    style={{flex: 1,paddingLeft: 40}}
                                    placeholderTextColor = "#47E5B3"
                                    underlineColorAndroid='transparent'
                                    placeholder="Password"                               
                                    returnKeyType = {"done"}
                                    autoCapitalize="none"
                                    onChangeText={UserPassword => this.setState({UserPassword})}
                                    secureTextEntry = { this.state.hidePassword }
                              />   
                                <TouchableOpacity  style={{backgroundColor:'rgba(0,0,0,0)'}}  onPress = { this.managePasswordVisibility }>
                                    <Ionicons name="ios-eye" size={20} color={( this.state.hidePassword ) ? 'black':'#dcdcdd'}/>
                                </TouchableOpacity>

                          </View>

                          <View style={styles.topButton}>

                          </View> 
                          <View style={styles.loginButton}>
                                <TouchableOpacity  style={{flex: 1,}} onPress={this.UserLoginFunction}>
                                      <Image  source={Backgrounds.loginButton} style={{flex: 1,width:null,height:null}}>
                                      </Image>
                                </TouchableOpacity>


                          </View>

                          <View style={styles.forgotPass}>
                                                  <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',flexDirection: 'row'  }} onPress={ ()=> {navigate('ForgotPassword')}}>
                                                     <Text style={{fontSize:13, color:'#524a5e'}}>Passwordを忘れの方はこちら</Text><Text style={{fontSize:13, color:'#524a5e',textDecorationLine:  'underline',}}>こちら</Text>
                                                   </TouchableOpacity>
                          </View>

                           <View style={styles.goRegister}>
                                  <View style={{flex: 0.5,}}>
                                  </View>

                                    <View style={{flex: 0.5,}}>
                                                <View style={{flex: 0.5 }}>
                                                </View>

                                    <View style={{flex: 0.5 ,justifyContent: 'center',alignItems: 'center',}}>
                                                <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',}} onPress={ ()=> {navigate('RegisterScreen')}}>
                                                      <Text style={styles.textGoRegister}> 会 員 登 録 </Text>
                                                </TouchableOpacity>
                                    </View>
                                  
                                  </View>

                                  <View style={{flex: 0.5,}}>
                                  </View>
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
  },
  backgroundImage:{
    flex: 1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  containerImage:{
  flex: 1,

  },
  textHeader:{
    flex: 0.8,
    flexDirection:'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight:13
  },
  xButton:{
    flex: 0.5,
    width:null,
    height:null,
    marginTop:10
  },
  fbButton:{
    flex: 0.45,
    paddingBottom: (Platform.OS === 'ios') ? 0 : 10 ,
    paddingLeft:26,
    paddingRight:23
  },
  orButton:{
  flex: 0.9,

  },
  nameInput:{
  flex: 0.6,
  paddingLeft:25,
  paddingRight:30

  },
  passwordInput:{
    flex: 0.6,
    paddingLeft:26,
    paddingRight:60,
  justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',

  },
  loginButton:{
    flex: 0.5,
    paddingHorizontal:23,
   
     marginTop: (Platform.OS === 'ios') ? 1 : 20 ,
  },
  forgotPass:{
    flex: 0.4,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row' ,
  backgroundColor:'rgba(0,0,0,0)',
  marginHorizontal: 40,
  paddingHorizontal: 20,

  paddingBottom: 5
  },

  goRegister:{
    flex: 1.5,
    flexDirection:  'row',

  },
  textGoRegister:{
  backgroundColor:'rgba(0,0,0,0)',
  textDecorationLine:  'underline',
  fontWeight: 'bold',
  color:'#4e5a99',
  paddingBottom:12
  },
  topButton:{
      flex: 0.2,
     
  }
  });


  export default LoginScreen;