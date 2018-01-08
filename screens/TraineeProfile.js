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
import {LinearGradient} from 'expo';
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

      receivedNotification: null,
      lastNotificationId: null,
      unread:'',
      points:'',
      data:'',


    }
  }


  componentDidMount() {


    this.registerForPushNotificationsAsync();

       
        Notifications.addListener((receivedNotification) => {

           this.setState({
            receivedNotification,
            lastNotificationId: receivedNotification.notificationId,
          });
         });
      }

      registerForPushNotificationsAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        if (status !== 'granted') {
          return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        let res = token.substring(18, 40);
       


        this.guiTokenLenServerMinh(res);
      };

      guiTokenLenServerMinh = async (res)=>{
    
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


      componentWillMount() {
        let formdata = new FormData();

        formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
        formdata.append("type", this.props.navigation.state.params.Account.type);
        formdata.append("id", this.props.navigation.state.params.Account.customer.id);
        fetch('http://35.185.68.16/api/v1/customer/getMainProfileInfo', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata

        }).then((response) => response.json())
        .then((responseJson) => {

          var rawdata = responseJson;
          let dataFlatlist = rawdata.data.data;

          var arrayData = [];
          Object.keys(dataFlatlist).forEach(function(key){
            let unread =  dataFlatlist[key].unread;
            let avatar = dataFlatlist[key].avatar;
            let type = dataFlatlist[key].type;
            let status = dataFlatlist[key].status;
            let id = [key];
            var raw = {
              unread: unread,
              type : type,
              avatar :avatar,
              status : status,  
              id : id,       
            }
            arrayData.push(raw);
          });
         
          this.setState({
            unread : rawdata.data.total_unread,
            points: rawdata.data.points,
            data : arrayData
          })
        })

      }

      renderUnread(unreadMsg){
        if (unreadMsg > 0 ){
          return (
            <View style={{width: 18,height: 18,borderRadius:18/2,backgroundColor: '#FF4275',position: 'absolute' ,right:-10,top:5, }} >
            <Text style={{backgroundColor: 'transparent',color:'white',flex: 1,justifyContent: 'center',alignItems: 'center'}}>
            {unreadMsg}                                          
            </Text>
            </View>
            );                                          
        }
      }
 renderStatus(statusTrainer){
        if (statusTrainer === "busy" ){
          return (
            <Image  resizeMode="contain" source={require('../img/user/busy.png')} style={{flex: 1}}>

           </Image>
            );  
        }
         if (statusTrainer === "online" ){
          return (
            <Image  resizeMode="contain" source={require('../img/user/online.png')} style={{flex: 1}}>

           </Image>
            );                                                      
        }
         if (statusTrainer === "offline" ){
          return (
            <Image  resizeMode="contain" source={require('../img/user/offlinebuttonl.png')} style={{flex: 1}}>

           </Image>
            );                                                      
        }
      }
      render() {
        var base64Icon =  this.props.navigation.state.params.Account.avatar;
        const { image } = this.state;
        const { navigate } = this.props.navigation;
        const {goBack} = this.props.navigation;
        return (
         <Image  source={require('../img/user/last.png')} style={styles.backgroundImage}>
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

            if(myIssues.length === 0 ){
             
              navigate('TraineeTreatment',{ Account:account  });
            }else {
       
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
           <Text style={{color:'#3D2C66'}}>{this.props.navigation.state.params.Account.customer.name}</Text>
           <Text style={{color:'#3D2C66'}}> {this.props.navigation.state.params.Account.rawMyIssues}</Text>


           </View>

           <View style={styles.flatList}>
           <View style={{justifyContent: 'center',}}>
           <Ionicons name="ios-arrow-back-outline" size={20} />
           </View>
           <FlatList
           data={this.state.data}
           horizontal={true}
           style={styles.flat}
        
           keyExtractor = {(item, index) => index}
           renderItem={({item}) => 

           <View style={styles.flatListContainer}>
           <TouchableOpacity style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginRight:-20}}
           onPress={ ()=> {
        navigate('ChatUser',{Account: this.props.navigation.state.params.Account ,trainerId: item.id});}}
           >
           <View style={styles.circleOutside}>
           <View style={styles.circleInside}>
           <Image  source={{uri:item.avatar}} style={styles.image}>
           </Image>

           {this.renderUnread(item.unread)}

           </View>
           </View>
           </TouchableOpacity>
           <View style={{flex: 1,marginRight:-20}}>
           <View style={styles.circleOutside2}>
           <View style={styles.circleInside2}>

           <Icon name="handshake-o" size={20} color={ item.type == 'connected' ? 'green' : 'black' } />

           </View>

           </View>
           </View>
           <View style={{flex: 0.5,marginTop:20,marginRight:-20, justifyContent: 'center',alignItems: 'center',}} >
                 {this.renderStatus(item.status)}
          
           </View>

           </View>

         }
         />
         <View style={{justifyContent: 'center',}}>
         <Ionicons name="ios-arrow-forward" size={20} />
         </View>
         </View>



         <View style={styles.bottom}>
         <View style={styles.textTotalUnread}>
         <Text style={styles.fontTextUnread}> {this.state.unread} 件の新規メッセージがあります </Text>
         </View>

         <View style={styles.buttonPoint}>

         <TouchableOpacity style={{flex:0.7}}>
          <LinearGradient
          colors={['#99FFA6','#31c4b8']}
           start={{x: 1, y: 0.5}} end={{x: 0.0, y: 0.5}}
          style={{ flex:0.5,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:2,alignItems: 'center',justifyContent: 'center', }}>
          <Text
            style={{
              backgroundColor: 'transparent',            
              color: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.state.points} POINT
          </Text>
        </LinearGradient>

         </TouchableOpacity>

         </View>
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
width: (Platform.OS === 'ios') ? 75 : 60,
height: (Platform.OS === 'ios') ? 75 : 60,
borderRadius: (Platform.OS === 'ios') ? 75/2 : 60/2,
},
avatarImage:{
height: null,
width: null,

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
marginLeft:-45,
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
bottom:{
flex: 0.7,


},
buttonPoint:{
flex: 1,
paddingHorizontal: 80
},
textTotalUnread:{
flex: 0.3,
justifyContent: 'center',
alignItems: 'center',
},
fontTextUnread:{
fontSize:10,
color:'#402371',
backgroundColor:'rgba(0,0,0,0)',

}
});


export default TraineeProfile;