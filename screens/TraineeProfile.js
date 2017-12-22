  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform

  } from 'react-native';
  import Dimensions from 'Dimensions';
  import { Entypo, Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import {Constants, Permissions, Notifications} from 'expo';

  const PUSH_ENDPOINT = 'http://35.185.68.16/api/v1/pushNotify/setDeviceToken';
  class TraineeProfile extends Component {
    constructor(props){
      super(props);
      this.state={
        hidePassword: true,
        image: `${this.props.navigation.state.params.Account.avatar}`,
        accountId : `${this.props.navigation.state.params.Account.customer.id}`,
        access_token: `${this.props.navigation.state.params.Account.customer.access_token}`,
        type: `${this.props.navigation.state.params.Account.type}`,
          pressIcon: true,
          receivedNotification: null,
          lastNotificationId: null,

       mang:[
        {key:'0',hoten:" 1"},
        {key:'1',hoten:" 2"},
        {key:'2',hoten:" 3"},
        {key:'3',hoten:" 4"},
        {key:'4',hoten:" 5"},
        {key:'5',hoten:" 6"},
        {key:'6',hoten:" 7"},
        {key:'7',hoten:" 8"},
        {key:'8',hoten:" 9"},
      


        ]
  

      }
    }
pressIcon = () =>
  {
     this.setState({ pressIcon: !this.state.pressIcon });
     
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
         console.log("user",res)
          console.log("user",this.state.type)
          console.log("user",this.state.access_token)
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
      var base64Icon =  this.props.navigation.state.params.Account.avatar;
      const { image } = this.state;
      const { navigate } = this.props.navigation;
      const {goBack} = this.props.navigation;
      return (
       <Image  source={require('../img/profile/enter_user.png')} style={styles.backgroundImage}>
       <View style={styles.container}>
       <View style={styles.header}>
       <View style={styles.iconrightHeader}>
       <TouchableOpacity style={{flex: 1,marginTop:28, marginLeft:6,}}
       onPress={()=> {
        navigate('MenuUser',{ Account: this.props.navigation.state.params.Account  });}}>
        <Entypo name="menu" size={30} color="#00CA8F" />


        </TouchableOpacity>
        </View> 
        <View style={styles.spaceHeader}>
        </View>
        <View style={styles.iconleftHeader}>
        <TouchableOpacity style={{flex:1}} onPress= { ()=>{
          let account = this.props.navigation.state.params.Account;
          let myIssues = account.myIssues;
          console.log("DucNT",myIssues.length);
          if(myIssues.length === 0 ){
            console.log("ducnt TraineeTreatment");
            navigate('TraineeTreatment',{ Account:account  });
          }else {
            console.log("DucNT SelectTrainer" );
           navigate('SelectTrainer',{ Account:account  });
         }
       }}>
       <Image  source={require('../img/user/grp.png')} style={styles.round} />
       </TouchableOpacity>                                        


       </View>
       </View>



       <View style={styles.avatar}>
       <View style={styles.avatarImage}>
       <Image   resizeMode="cover" source={require('../img/profile/circle.png')} style={styles.picIcon}>

       {image &&
         <Image source={{ uri: this.state.image }} style={styles.picture} resizeMode="stretch" />}
         </Image>
         </View>
         </View>

         <View style={styles.textName}>
         <Text style={{color:'#3D2C66'}}> {this.props.navigation.state.params.Account.customer.name}</Text>
          <Text style={{color:'#3D2C66'}}> {this.props.navigation.state.params.Account.rawMyIssues}</Text>


         </View>

         <View style={styles.flatList}>
          <View style={{justifyContent: 'center',}}>
                <Ionicons name="ios-arrow-back-outline" size={20} />
          </View>
                 <FlatList
                            data={this.state.mang}
                            horizontal={true}
                            style={styles.flat}
                            keyExtractor={item => item.key}
                            renderItem={({item}) => 





              <View style={styles.flatListContainer}>
                  <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginRight:-20}}>
                      <View style={styles.circleOutside}>
                            <View style={styles.circleInside}>
                                  <Image source={require('../img/1.png')} style={styles.image}>
                                  </Image>
                                  <View style={{width: 18,height: 18,borderRadius:18/2,backgroundColor: '#FF4275',position: 'absolute' ,right:-10,top:5, }} >
                                          <Text style={{backgroundColor: 'transparent',color:'white',flex: 1,justifyContent: 'center',alignItems: 'center',}}>
                                          {item.hoten}                                          
                                          </Text>
                                  </View>
                            </View>
                      </View>
                  </TouchableOpacity>
                     <TouchableOpacity style={{flex: 1,marginRight:-20}} onPress = { this.pressIcon }>
                       <View style={styles.circleOutside2}>
                            <View style={styles.circleInside2}>
                              
                                   <Icon name="handshake-o" size={20} color={( this.state.pressIcon ) ? 'green':'red'} />
                             
                            </View>

                      </View>
                       </TouchableOpacity>
                     <TouchableOpacity style={{flex: 0.5,marginTop:20,marginRight:-20, justifyContent: 'center',alignItems: 'center',}} >
                      <Image  resizeMode="contain" source={require('../img/user/busy.png')} style={{flex: 1}}>

                      </Image>
                      </TouchableOpacity>
       
              </View>

                  }
                      />
                      <View style={{justifyContent: 'center',}}>
                          <Ionicons name="ios-arrow-forward" size={20} />
                      </View>
         </View>



         <View style={styles.six}>
         <TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
         <Image  resizeMode="contain" source={require('../img/profile/point.png')} style={{flex: 0.4,}}>

         </Image>
         </TouchableOpacity>
         </View>
         </View>
         </Image>
         );
       }
     }

     const styles = StyleSheet.create({
      backgroundImage:{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch',
      },
      container:{
        flex: 1,

      },
      header:{
        flex: 0.3,
        flexDirection: 'row' 

      },
      iconrightHeader:{
       flex: 0.15,

       backgroundColor:'rgba(0,0,0,0)',
       justifyContent: 'center',
       alignItems: 'center',
     },
     iconleftHeader:{
      flex: 0.2,
      paddingTop: 20,

      justifyContent: 'center',
      alignItems: 'center',
    },
    picIcon:{
     height: 120,
     flex: 1,

  paddingBottom: 3,
  paddingLeft: 3,
     width: 120,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 120/2,
   },
   spaceHeader:{
    flex: 0.65,
    
  },
  round:{

    height: 40,
    width: 40,

    borderRadius: 40/2,
    resizeMode: 'cover',
  },
  avatar:{
    flex: 0.5,
    alignSelf: 'center',
    height: 90,
    width: 90,

    borderRadius: 100/2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  picture:{
  width: (Platform.OS === 'ios') ? 80 : 60,
   height: (Platform.OS === 'ios') ? 80 : 60,
   borderRadius: (Platform.OS === 'ios') ? 80/2 : 60/2,
  },
  avatarImage:{
    height: null,
    width: null,

  },
  pic1:{
    flex: 1,

  },
  pic2:{
    flex: 1,
  },
  pic3:{
    flex: 1,
    marginLeft: 15
  },
  textName:{
    flex: 0.3,
    paddingBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(0,0,0,0)',
  },
flatList:{
  flex: 1,
  marginHorizontal: 30,
  flexDirection: 'row' ,
   backgroundColor:'rgba(0,0,0,0)',
},

  flatListContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -50,
    paddingRight:20,
    marginBottom: 20,
 

  },
  circleOutside: {
   
    width: 40,
    height: 40,
    borderRadius: 40/2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
},
circleInside:{
  flex: 1,
   width: 38,
    height: 38,
    borderRadius: 48/2,
    backgroundColor: '#DCDCDC'
},
circleOutside2: {

    width: 40,
    height: 40,
   marginTop:20,
    borderRadius: 40/2,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
},
circleInside2:{
  flex: 1,
   width: 38,
    height: 38,
    borderRadius: 38/2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
},

  image:{
      flex: 1,
      height: 40,
      width: 40,
      borderRadius: 40/2,
      resizeMode: 'cover'
    },
  six:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  });


  export default TraineeProfile;