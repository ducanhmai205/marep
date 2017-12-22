  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    FlatList

  } from 'react-native';
  import Dimensions from 'Dimensions';
  import { LinearGradient } from 'expo';

    import { Entypo, Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import {Constants, Permissions, Notifications} from 'expo';
    const PUSH_ENDPOINT = 'http://35.185.68.16/api/v1/pushNotify/setDeviceToken';
    class TrainerProfile extends Component {
     constructor(props){
      super(props);
      this.state={
         pressIcon: true,
          hidePassword: true,
          image: `${this.props.navigation.state.params.Account.avatar}`,
            accountId : `${this.props.navigation.state.params.Account.trainer.id}`,
          access_token: `${this.props.navigation.state.params.Account.trainer.access_token}`,
          type: `${this.props.navigation.state.params.Account.type}`,
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
        {key:'9',hoten:" 1"},
        {key:'10',hoten:" 2"},
        {key:'11',hoten:" 3"},
        {key:'12',hoten:" 4"},
        {key:'13',hoten:" 5"},
        {key:'14',hoten:" 6"},
        {key:'15',hoten:" 7"},
        {key:'16',hoten:" 8"},
        {key:'17',hoten:" 9"},
        {key:'18',hoten:" 1"},
        {key:'19',hoten:" 2"},
        {key:'20',hoten:" 3"},
        {key:'21',hoten:" 4"},
        {key:'22',hoten:" 5"},
        {key:'23',hoten:" 6"},
        {key:'24',hoten:" 7"},
        {key:'25',hoten:" 8"},
        {key:'26',hoten:" 9"},
        {key:'27',hoten:" 1"},
        {key:'28',hoten:" 2"},
        {key:'29',hoten:" 3"},
        {key:'30',hoten:" 4"},
        {key:'31',hoten:" 5"},
        {key:'32',hoten:" 6"},
        {key:'33',hoten:" 7"},
        {key:'34',hoten:" 8"},
        {key:'35',hoten:" 9"},
        {key:'36',hoten:" 1"},
        {key:'37',hoten:" 2"},
        {key:'38',hoten:" 3"},
        {key:'39',hoten:" 4"},
        {key:'40',hoten:" 5"},
        {key:'41',hoten:" 6"},
        {key:'42',hoten:" 7"},
        {key:'43',hoten:" 8"},
        {key:'44',hoten:" 9"},
        {key:'45',hoten:" 1"},
        {key:'46',hoten:" 2"},
        {key:'47',hoten:" 3"},
        {key:'48',hoten:" 4"},
        {key:'49',hoten:" 5"},
        {key:'50',hoten:" 6"},
        {key:'51',hoten:" 7"},
        {key:'52',hoten:" 8"},
        {key:'53',hoten:" 9"},
        {key:'54',hoten:" 1"},
        {key:'56',hoten:" 2"},
        
      


        ]
          }
        }
     static navigationOptions = {
      drawerLabel: 'TrainerProfile',

    };
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
       const { navigate } = this.props.navigation;
  const {goBack} = this.props.navigation;
  const { image } = this.state;
  return (

    <Image  source={require('../img/profile/enter_trainer.png')} style={styles.backgroundImage}>
    <View style={styles.backgroundContainer}>

    <View style={styles.header}>
    <View style={styles.iconrightHeader}>
    <TouchableOpacity style={{flex: 1,marginTop:28, marginLeft:6,}}
                                    onPress={()=> {
                            navigate('MenuTrainer',{ Account: this.props.navigation.state.params.Account  });}}>
                            
                            <Entypo name="menu" size={34} color="#00CA8F" />


                            </TouchableOpacity>
                            </View> 
                            <View style={styles.spaceHeader}>
                            </View>
                            <View style={styles.iconleftHeader}>
                            <TouchableOpacity style={{flex:1}} onPress= { ()=>{
                                                        let account = this.props.navigation.state.params.Account;
                                                        let mySpecializes = account.mySpecializes;
                                                 
                                                        if(mySpecializes.length === 0 ){
                                                        console.log("ducnt TraineeTreatment");
                                                        navigate('TrainerSpecialize',{ Account:account  });
                                                       }else {
                                                  
                                                         navigate('SelectTrainee',{ Account:account  });
                                                       }
                                                     }}>  
                            <Image  source={require('../img/user/grp.png')} style={styles.picIcon} />
                            </TouchableOpacity>                                        


                            </View>
                            </View>

                            <View style={styles.avatar}>
                            <View style={styles.avatarImage}>

                                 {image &&
                                  <Image source={{ uri: this.state.image }} style={{ width: 90, height:90,borderRadius: 90/2, }} resizeMode="stretch" />}

                            </View>
                            </View>

                            <View style={styles.textName}>

                            <View style={styles.Name}>
                                  <Text> {this.props.navigation.state.params.Account.trainer.name} </Text>
                                    <Text> {this.props.navigation.state.params.Account.rawMySpecializes} </Text>
                            </View>
                            <View style={styles.busyButton} >
                            <TouchableOpacity style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
                            <Image  resizeMode="contain" source={require('../img/user/busy.png')} style={{flex: 0.8,}}>

                            </Image>
                            </TouchableOpacity>   
                            </View>
                            </View>

                            <View style={styles.selectShow}>
                            <View style={styles.dropDownMenu}>

                            </View>
                            </View>

                            <View style={styles.flatlistHorizontal}>
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
                            <TouchableOpacity style={{flex: 0.7,marginTop:40,marginRight:-21, justifyContent: 'center',alignItems: 'center',}} >
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

                          <View style={styles.onlineButton}>

                          </View>

                          <View style={styles.textInfo}>

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
    backgroundContainer:{
      flex:1,

    },
    header:{
      flex: (Platform.OS === 'ios') ? 0.8 : 0.8 ,

      flexDirection:'row',
    },
    iconrightHeader:{
      flex: 0.15,

      backgroundColor:'rgba(0,0,0,0)',
      justifyContent: 'center',
      alignItems: 'center',

    },
    iconleftHeader:{
      flex: 0.2,
      paddingTop: 25,

      justifyContent: 'center',
      alignItems: 'center',
    },
    picIcon:{


      height: 40,
      width: 40,
      
      borderRadius: 40/2,
      resizeMode: 'cover',
    },
    spaceHeader:{
      flex: 0.65,

    },
    avatar:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',


    },
    avatarImage:{
      flex: 1,
      width: 80,
      height:80,
      borderRadius: 160/2,

      justifyContent: 'center',
      alignItems: 'center',
    },
    textName:{
      flex: (Platform.OS === 'ios') ? 1. : 0.9 ,

    },
    Name:{
      backgroundColor:'rgba(0,0,0,0)',
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    busyButton:{
      flex: 0.4,



    },

    selectShow:{
      flex: 0.5,
      marginBottom: 20,


    },
    dropDownMenu:{
      flex: 1,

    },

    flatlistHorizontal:{
      flex: (Platform.OS === 'ios') ? 1.8 : 2 ,

  marginHorizontal: 30,
  flexDirection: 'row' ,
   backgroundColor:'rgba(0,0,0,0)',

    },
      flatListContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-40,
    marginRight:-20,
    // paddingRight:20,
    paddingTop:10
 

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
    onlineButton:{
      flex: 0.3,

    },
    textInfo:{
      flex: (Platform.OS === 'ios') ? 1.8 : 1.6 ,

    },
  });


  export default TrainerProfile;