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
  Alert,
  Color
} from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import LoginFB from '../screens/LoginFB';
class RegisterScreen extends Component {
  state = {
    fontLoaded: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      'pomeranian': require('../assets/fonts/pomeranian.ttf'),
    });

    this.setState({ fontLoaded: true });
  }
  constructor(props) {
 
    super(props)
 
    this.state = {

      hidePassword: true,
      UserName: '',
      UserEmail: '',
      UserPassword: '',
      value: '',
      jobID: ''
      }
        this.onSelect = this.onSelect.bind(this);
        
 }

  managePasswordVisibility = () =>
  {
     this.setState({ hidePassword: !this.state.hidePassword });
  }
  onSelect(value){
  this.setState({
    jobID: `${value}`
  })
}
 
UserRegistrationFunction = () =>{
 
 
 const { UserName }  = this.state ;
 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;
 const { jobID } = this.state;
 
 
fetch('http://192.168.1.57:8000/api/v1/customer/register', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    name: UserName,
 
    email: UserEmail,
 
    password: UserPassword,

    job: jobID,
    
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
  if(responseJson.status === true){
 if(responseJson.account.type === 'trainee')
        {
 console.log("name",responseJson.account.trainee.name)
            this.props.navigation.navigate('WelcomeTrainee', {Name: responseJson.account.trainee.name });
 
        }
        else if(responseJson.account.type === 'trainer')
        {
 console.log("trainer",responseJson.account.trainer.name)
            this.props.navigation.navigate('WelcomeTrainer', { Name: responseJson.account.trainer.name });
 
        }
      }
        else{
           if(typeof(responseJson.message) === 'string'){
                 
                   Alert.alert(responseJson.message);
           }
           else{
            var error_object =  responseJson.message[Object.keys(responseJson.message)[0]];
            console.log("test", error_object[0]);
            Object.keys(responseJson.message)[0];
              var error_messEmail = '';
              var error_messPassword = '';
              var error_messName = '';
              var error_messJob = '';
              if (responseJson.message.name) {
               for (var i = 0, len = responseJson.message.name.length; i < len; i++) {
                      error_messName += responseJson.message.name[i] + '!'
                    }
              }
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
               if (responseJson.message.job) {
               for (var i = 0, len = responseJson.message.job.length; i < len; i++) {
                      error_messJob += responseJson.message.job[i] + '!'

                    }
              }
                  
              Alert.alert(error_object[0] );
              //if(error_messPassword,error_messEmail){
              //   console.log("loi",responseJson.message.password)
              //      Alert.alert(error_messPassword,error_messEmail);
              //}
              //else if (error_messName,error_messJob){
              //   console.log("loi",responseJson.message.name)
              //      Alert.alert(error_messName,error_messJob);
              //}
              //else if (error_messName,error_messPassword){
              //   console.log("loi",responseJson.message.name)
              //      Alert.alert(error_messName,error_messPassword//);
              //}

            }
         }
 
        
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image  source={require('../img/signin1.png')} style={styles.backgroundImage}>
          <View style={styles.containerImage}>
              <View style={styles.textHeader}>
              
                            <TouchableOpacity  style={{flex: 0.2,}}  onPress={() => goBack()}>
                                  <Image  source={require('../img/Xbutton.png')} style={{flex: 0.5,width:null,height:null,marginTop:10}}>
                             
                                  </Image>
                            </TouchableOpacity>

                    
              </View>

                    <View style={styles.fbButton}>
                      <TouchableOpacity  style={{flex: 1,}}>
                             <LoginFB> </LoginFB>
                      </TouchableOpacity>
                    </View>

                          <View style={styles.orButton}>

                          </View>

                              <View style={styles.nameInput}>
                                    <TextInput
                                          style={{flex: 1,paddingLeft: 40}}
                                          underlineColorAndroid='transparent'
                                                      placeholder="Name"
                                                      placeholderTextColor = "#47E5B3"
                                          onChangeText={UserName => this.setState({UserName})}
                                    />

                              </View>

                                    <View style={styles.emailInput}>
                                        <TextInput
                                                    style={{flex: 1,paddingLeft: 40}}
                                                    underlineColorAndroid='transparent'
                                                    keyboardType= 'email-address'
                                                                placeholder="E-mail"
                                                                placeholderTextColor = "#47E5B3"
                                                                onChangeText={UserEmail => this.setState({UserEmail})}
                                         />
                                    </View>

                                        <View style={styles.passwordInput}>
                                            <TextInput
                                                    style={{flex: 1,paddingLeft: 5}}
                                                    underlineColorAndroid='transparent'
                                                                placeholder="Password"
                                                                placeholderTextColor = "#47E5B3"
                                                                onChangeText={UserPassword => this.setState({UserPassword})}
                                                                secureTextEntry= { this.state.hidePassword } 
                                                                 />

                                                             

                                            
                                            <TouchableOpacity   onPress = { this.managePasswordVisibility }>
                                             <Ionicons name="ios-eye" size={20} color={( this.state.hidePassword ) ? 'black':'#dcdcdd'}>
                                            
                                             </Ionicons>
                                             </TouchableOpacity>


                                        </View>

                                          <View style={styles.checkBox}>
                                            <RadioGroup
                                              size={15}
                                              style={{flexDirection: 'row'}}
                                              color='#59CEBA'
                                             
                                              onSelect = {( value) => this.onSelect( value)}>

                                                 <RadioButton  activeColor='#80d8ff' value={'0'} >
                                                        <Text style={styles.text3}>ユーザー</Text>
                                                 </RadioButton>
                    
                                                 <RadioButton activeColor='#80d8ff'  value={'1'}>
                                                         <Text style={styles.text3}>トレーナー</Text>
                                                 </RadioButton>


                                              </RadioGroup>   
                                           </View>

                                              <View style={styles.registerButton}>
                                                    <TouchableOpacity  style={{flex: 1,}} onPress={this.UserRegistrationFunction}>
                                                          <Image  source={require('../img/signinbutton.png')} style={{flex: 1,width:null,height:null}}>
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
nameInput:{
  flex: 0.9,
  paddingHorizontal:23,
},
emailInput:{
  flex: 0.9,
  paddingHorizontal:23,
},
passwordInput:{
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
registerButton:{
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


export default RegisterScreen;