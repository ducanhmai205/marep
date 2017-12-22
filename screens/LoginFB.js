  import React, { Component } from 'react';
  import { View, StyleSheet, Text, TouchableOpacity, Alert,Image } from 'react-native';
  import { StackNavigator } from 'react-navigation';
  import { Facebook } from "expo";



  export default class LoginFB extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name:'',
        id:'',
        jsonDataFb:'',
      };
      let loginProp = this.props.loginProp;
    }

    

    showUserTypeChooser = ()=>{
      Alert.alert(  
        'アカウント種類を選択してください。',
        '',
        [
        {text: 'ユーザー', onPress: () => {
          let type = 'customer';
          this.loginFacebook(type)
        }
      },
        {text: 'トレーナー',  onPress: () => {
          let type = 'trainer';
          this.loginFacebook(type)
        }
      },
      ],
      { cancelable: false }
      )

    }

   async loginFacebook(userType){
    try {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
          '299185680599243',
          { permissions: ['public_profile','email'] }
          );

        switch (type) {
          case 'success': {
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const profile = await response.json();
            this.sendFacebookInfoToRemoteServer(userType,profile);
            console.log("ducanhnew",profile,userType)
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
    }

    sendFacebookInfoToRemoteServer = (userType,profile)=>{    
      let id = profile.id;
      let name = profile.name;
      let formData = new FormData();
      formData.append("facebookID", id);
      formData.append("type", userType);
      formData.append("name", name);
      console.log(formData);

      fetch('http://35.185.68.16/api/v1/customer/loginByFacebook',{
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData

      } ).then((response) => response.json()).
      then((responseJson)=>{
        console.log("ducanh vao json",responseJson)
        if(responseJson.status === true){
              
              var jsonDataFb = responseJson.account
                console.log("ducanh",this.props);
              this.props.loginProp(jsonDataFb);

             
        }
           else{
             if(typeof(responseJson.message) === 'string'){
                   
                     Alert.alert(responseJson.message);
                     console.log("error message",responseJson.message)
                  
             }
              else{
                var error_messName = '';
              
                if (responseJson.message.name) {
                 for (var i = 0, len = responseJson.message.name.length; i < len; i++) {
                        error_messName += responseJson.message.name[i] + '!'
                      }
                }

                
              
                    
                Alert.alert(error_messName);

                
              }
             }
      });
    }

    



    _handleFacebookLogin = async () => {
      this.showUserTypeChooser();
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