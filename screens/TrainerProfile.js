  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Platform,
    FlatList,
    Alert

  } from 'react-native';
  import Dimensions from 'Dimensions';
  import { LinearGradient } from 'expo';
  import { Entypo, Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import {Constants, Permissions, Notifications} from 'expo';
  import ModalFilterPicker from 'react-native-modal-filter-picker'
    const PUSH_ENDPOINT = 'http://35.185.68.16/api/v1/pushNotify/setDeviceToken';
    var options = [];
      for (var i = 1; i <=100; i++) {
        options.push({
          key: i,
          label: i,
        });
      }
    class TrainerProfile extends Component {
     constructor(props){
      super(props);
      this.state={
         pressIcon: true,
 
          changeBusy: '',
          image: `${this.props.navigation.state.params.Account.avatar}`,
          accountId : `${this.props.navigation.state.params.Account.trainer.id}`,
          access_token: `${this.props.navigation.state.params.Account.trainer.access_token}`,
          type: `${this.props.navigation.state.params.Account.type}`,
          receivedNotification: null,
          lastNotificationId: null,
          visible: false,
          startColor:'pink',
          endColor:'pink',
          busy:0,
        
            
          }
        }
     static navigationOptions = {
      drawerLabel: 'TrainerProfile',

    };
 
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

  
  onShow = () => {
    this.setState({ visible: true });
  }
onSelect = (optionCustomerTraining) => {
    
     let formdata = new FormData();

        formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
        formdata.append("type", this.props.navigation.state.params.Account.type);
        formdata.append("id", this.props.navigation.state.params.Account.trainer.id);
        formdata.append("max_customer_training", optionCustomerTraining);
        fetch('http://35.185.68.16/api/v1/trainer/setMaxTraining', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata

        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.result === true){
              this.setState({
                max_customer_training: optionCustomerTraining,
                visible: false
              })            
            }else{
             if(typeof(responseJson.message) === 'string'){
                   
                     Alert.alert(responseJson.message);
                     
             } else{
                var error_messMax = '';
            
                if (responseJson.message.max_customer_training) {
                 for (var i = 0, len = responseJson.message.max_customer_training.length; i < len; i++) {
                        error_messMax += responseJson.message.max_customer_training[i] + '!'
                      }
                }

              
                    
                Alert.alert(error_messMax);

                
              }
            }

        })

      
  
  }
  

onCancel = () => {
    this.setState({
      visible: false
    });
  }
 

componentWillMount() {
        let formdata = new FormData();

        formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
        formdata.append("type", this.props.navigation.state.params.Account.type);
        formdata.append("id", this.props.navigation.state.params.Account.trainer.id);

        fetch('http://35.185.68.16/api/v1/trainer/getMainProfileInfo', {
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
            max_customer_training: rawdata.data.max_customer_training,
            customer_connected: rawdata.data.customer_connected,
            status:  rawdata.data.status,
            data : arrayData,

          })
          var statusOnpress = this.state.status;
          if(this.state.status === 'busy'){
            this.setState({
              startColor : '#99FFA6',
              endColor : '#31c4b8',
              status: true,
              isBusy: 0
              
            })
          }else{
            this.setState({
             startColor: '#515056',
              endColor : '#515056',
              status: false,
              isBusy:1
           
             

            })
           
          }
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


 manageBusyButton = () =>{
 
     this.setState({ status: !this.state.status });
     
      if(this.state.status === false){
        this.setState({
           startColor : '#99FFA6',
              endColor : '#31c4b8',
              isBusy: 0,
              status: true
        })
      }else{
        this.setState({
              startColor: '#515056',
              endColor : '#515056',
              isBusy: 1,
              status: false
        })
     
      }

      

  let formdata = new FormData();

        formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
        formdata.append("type", this.props.navigation.state.params.Account.type);
        formdata.append("id", this.props.navigation.state.params.Account.trainer.id);
        formdata.append("is_busy",this.state.isBusy);
        fetch('http://35.185.68.16/api/v1/trainer/setBusyStatus', {
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formdata

        }).then((response) => response.json())
        .then((responseJson) => {
       
        })
 
   }




render() {
  const { navigate } = this.props.navigation;
  const {goBack} = this.props.navigation;
  const { visible,picked,image } = this.state;
  return (

    <Image  source={require('../img/user/newenter_trainer.png')} style={styles.backgroundImage}>
    <View style={styles.backgroundContainer}>

    <View style={styles.header}>
    <View style={styles.iconrightHeader}>
    <TouchableOpacity style={{flex: 1,marginTop:28, marginLeft:6,}}
                                    onPress={()=> {
                            navigate('MenuTrainer',{ Account: this.props.navigation.state.params.Account , max_customer_training: this.state.max_customer_training });}}>
                            
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
                                  <Image source={{ uri: this.state.image }} style={{ width: 80, height:80,borderRadius: 80/2, }} resizeMode="stretch" />}

                            </View>
                            </View>

                            <View style={styles.textName}>

                            <View style={styles.Name}>
                                  <Text style={{paddingTop: 5,fontSize: 20}}> {this.props.navigation.state.params.Account.trainer.name} </Text>
                                    <Text style={{paddingTop: 5,fontSize: 11}}> {this.props.navigation.state.params.Account.rawMySpecializes} <Text style={{fontSize: 8}}>さん</Text></Text>
                            </View>
                            <View style={styles.busyButton} >
                                <TouchableOpacity style={{flex:0.2,}} onPress = {this.manageBusyButton}>
                            
                                     <LinearGradient
                                          // colors={this.renderColor(this.state.status)}
                                            colors={[this.state.startColor,this.state.endColor]}
                                           start={{x: 1, y: 0.5}} end={{x: 0.0, y: 0.5}}
                                          style={{ flex:0.8,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:2,alignItems: 'center',justifyContent: 'center', }}>
                                          <Text
                                            style={{
                                              fontSize: 10,                               
                                              backgroundColor: 'transparent',            
                                              color: '#fff',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            }}>
                                                 BUSY
                                          </Text>
                                        </LinearGradient>
          
  
                                </TouchableOpacity>   
                            </View>
                            </View>

                            <View style={styles.selectShow}>
                                <View style={styles.dropDownMenu}>
                                    <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',flexDirection: 'row',paddingBottom: 5,   backgroundColor:'rgba(0,0,0,0)',  }}
                                    onPress={this.onShow}>
                                         <Text>後</Text>
                                         <Text
                                            style={{
                                              fontSize: 35,
                                              fontWeight: 'bold' ,                               
                                              backgroundColor: 'transparent',            
                                              color: '#00DEB1',
                                              paddingBottom: 10,
                                              marginHorizontal: 5,
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            }}>
                                            {this.state.max_customer_training}
                                               
                                             </Text>
                                                <ModalFilterPicker
                                              showFilter={false}
                                              visible={visible}
                                              onSelect={this.onSelect}
                                              onCancel={this.onCancel}
                                              options={options}
                                              />
                                               <Text>人</Text>
                                        <Ionicons name="ios-arrow-down-outline" style={{paddingTop:5, paddingLeft:5}} size={15} color="black" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.textContact}>

                                </View>
                            </View>

                            <View style={styles.flatlistHorizontal}>
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
        navigate('ChatTrainer',{Account: this.props.navigation.state.params.Account ,customerId: item.id});}}>
           <View style={styles.avatarFlatlist}>
           <View style={styles.circleInside}>
           <Image  source={{uri:item.avatar}} style={styles.image}>
           </Image>

           {this.renderUnread(item.unread)}

           </View>
           </View>
           </TouchableOpacity>
           <View style={{flex: 1,marginRight:-20}}>
           <View style={styles.handshakeFlatlist}>
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

                          <View style={styles.onlineButton}>

                          </View>

                          <View style={styles.textInfo}>
                            <Text style={{fontSize: 10,color: '#554C73'}}> {this.state.unread}件の新規メッセージがあります </Text>

                            <Text style={{paddingTop:15,color: '#554C73'}}> 契約中のUser/{this.state.customer_connected}人 </Text>

                            <Text style={{fontSize: 10,color: '#554C73'}}> 使ってもらった/{this.state.points}pt </Text>
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
      flex: 0.3,
      flexDirection: 'row' ,
      justifyContent: 'center',
      alignItems: 'center',

    },

    selectShow:{
      flex: 0.6,
   


    },
    textContact:{
      flex: 0.4,
     
    },
    dropDownMenu:{
      flex: 1,

    },

    flatlistHorizontal:{
      flex: (Platform.OS === 'ios') ? 1.8 : 2 ,

  marginHorizontal: 30,
  flexDirection: 'row' ,
  

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
  avatarFlatlist: {

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
handshakeFlatlist: {

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
       backgroundColor:'rgba(0,0,0,0)',
       justifyContent: 'center',
       alignItems: 'center',
       paddingBottom: 20,

    },
  });


  export default TrainerProfile;