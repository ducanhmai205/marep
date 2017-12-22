'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground
} from 'react-native';
import {Constants, Permissions, Notifications} from 'expo';
  const PUSH_ENDPOINT = 'http://35.185.68.16/api/v1/pushNotify/setDeviceToken';
class WelcomeTrainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       image: `${this.props.navigation.state.params.Account.avatar}`,
        accountId : `${this.props.navigation.state.params.Account.trainer.id}`,
        access_token: `${this.props.navigation.state.params.Account.trainer.access_token}`,
        type: `${this.props.navigation.state.params.Account.type}`,
    };
  }

  componentDidMount() {


          this.registerForPushNotificationsAsync();

          //Đăng ký lắng nghe sự kiện push
          Notifications.addListener((receivedNotification) => {
             //Neu app ios dang chay thi phải tạo view hiển thị local Notification

              this.setState({
                  receivedNotification,
                  lastNotificationId: receivedNotification.notificationId,
              });
          });
      }

      registerForPushNotificationsAsync = async () => {
          let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

          // Stop here if the user did not grant permissions
          if (status !== 'granted') {
              return;
          }

          let token = await Notifications.getExpoPushTokenAsync();
      
         let res = token.substring(18, 40);
          console.log("ducanh token",token)
   

         this.guiTokenLenServerMinh(res);
      };

      guiTokenLenServerMinh = async (res)=>{
          // Gui Push token lên server của mình
         console.log("trainer",res)
          console.log("trainer",this.state.type)
          console.log("trainer",this.state.access_token)
         console.log("trainer",this.state.accountId)
          return fetch(PUSH_ENDPOINT, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                
                      device_token: res,
                      id : this.state.accountId,
                      access_token: this.state.access_token,
                      type: this.state.type            
              }),
          });
      };
  render() {
    const { image } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
              
          <ImageBackground  source={require('../img/signin02.png')} style={styles.backgroundImage}>
              <View style={styles.imageAvatar}>
                       <Image  source={require('../img/user/avt.png')} style={styles.avtImage} resizeMode="contain">
                        {image &&
                          <Image source={{ uri: this.state.image }} style={{ width: 90, height: 90,borderRadius: 90/2, }} resizeMode="stretch" />}
                       </Image>
                      <Text style={styles.text}> ようこそ、 {this.props.navigation.state.params.Account.trainer.name} さん !  </Text>
                      <Text style={styles.text2}> 
                                 トレーニングの効果を出す為に
                       </Text>
                       <Text style={styles.text2}> 
                                  もう少しあなたの事を教えてください
                       </Text>
                    </View>



          <View style={styles.nextButton}>
                <TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {
                navigate('TrainerSpecialize',{Account: this.props.navigation.state.params.Account });}}>
                    <Text style={{fontWeight: 'bold'}}> START ! </Text> 
             </TouchableOpacity> 
              


          </View>

          </ImageBackground>
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
  width: null,
  height: null
},
imageAvatar:{
  flex: 0.7,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 40
},
avtImage:{
  marginTop: 20,
  width: 150,
    justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 5,
  paddingBottom: 4
},
text:{
   backgroundColor:'rgba(0,0,0,0)',
  fontSize: 20,
  color: '#402677',
  
  marginBottom: 15,
  justifyContent: 'center',
 alignItems: 'center',
 paddingHorizontal: 40
},
text2:{
  backgroundColor:'rgba(0,0,0,0)',
  fontSize: 15,
   marginBottom: 5,
  color: '#402677',
 justifyContent: 'center',
 alignItems: 'center',
},
nextButton:{
   flex: 1,
   flexDirection: 'row' , 
   position:'absolute',
   bottom: 0,
   height: 70,
   backgroundColor:'white',
   width: '100%',
  
},
TouchableOpacity:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});


export default WelcomeTrainer;