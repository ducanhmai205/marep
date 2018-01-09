'use strict';

import React, { Component } from 'react';

import io from 'socket.io-client';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import Dimensions from 'Dimensions';
import {LinearGradient} from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

var response;

class ChatUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      trainerId: `${this.props.navigation.state.params.trainerId}`,
      id :`${this.props.navigation.state.params.Account.customer.id}`,
      type: `${this.props.navigation.state.params.Account.type}`,
      access_token :`${this.props.navigation.state.params.Account.customer.access_token}`,
      canChat: true,
     isFirst:true,
      point:'',
      name:'',
      json:'',
      result:'accept',
      decline: 'decline',
      goSticker:'',
      chatInput:'',
      newMsg: '',
      showButton: true,
      
    };
   
  }

connectSocketIo(sender){

     
   let socketData  = {
    sender:sender,
      customer: {
        "id": this.state.id,
      },
      trainer: {
        "id": this.state.trainerId           
      },
    };

    let json = JSON.stringify(socketData);
    this.socket  = io ("http://192.168.1.11:3000?data=" + json, { transports: ['websocket'] });
    this.channel = 'message_' + socketData.customer.id + '_' + socketData.trainer.id;
     this.socket.on(this.channel, this.onReceivedMessage);
}


  onReceivedMessage = (response)=>{  
  

          let msgObj = {
            sender:response.sender,
            content:response.message
          }
           this.state.Data.push(msgObj);
        
          var DataArr = this.state.Data;
          var chatCan = this.state.canChat;
          var First = this.state.isFirst;
          var relation = this.state.relation;
       if(relation === 'not_connected'){

        if(First === true){
          chatCan = false;
            DataArr.forEach(function(item){
                if(item.sender === "trainer"){
                      let itemConfirm ={
                       showConfirmView:true
                      }    

                    First = false;
                   
                    DataArr.push(itemConfirm);                   
                }
               
            }) 
              
        }
       this.setState({isFirst:First,canChat:chatCan});
       console.log("ducanh",this.state.canChat);
      }

   }
   


  componentDidMount() {


    let formdata = new FormData();
    formdata.append("access_token", this.state.access_token);
    formdata.append("type", this.state.type);
    formdata.append("id", this.state.id);
    formdata.append("trainerId", this.state.trainerId);


    fetch('http://35.185.68.16/api/v1/customer/getCustomerChatHistory', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {

     response = responseJson;
     let confirm = response.data.confirm;
     var Data = [];
     var dateItem;
     var data = responseJson.data.data;
     var relation = responseJson.data.relation;
      let sender = responseJson.data.sender;
  if (relation === 'not_connected'){



  }else if (relation === 'pending'){
     Object.keys(data).forEach(function(item){

          Data.push(data[item]);       
    })
     }else if(relation === 'connected'){
      Object.keys(data).forEach(function(item){        
          dateItem = item;
          let messages = data[item]; 
           if(dateItem != null){
      let itemData ={
        showDataView:true,
        dateItem: dateItem

      }
       Data.push(itemData);
    }
                     
          messages.forEach(function(message){      
          Data.push(message);

        })
    
        });
    
    }
     if(confirm===true){
      let itemConfirm ={
        showConfirmView:true
      }
      Data.push(itemConfirm);
    }
    


    var point = responseJson.data.point;
    var name = responseJson.data.trainer.name;
    var canChat = responseJson.data.can_chat;
    var json = responseJson;
    this.setState({
      point:point,
      name:name,
      canChat: canChat,
      json : json,
      Data:Data,
      dateItem: dateItem,
      relation: relation,
      sender:sender


    })

     this.connectSocketIo(this.state.sender);
  })
  }




  sendChat = () =>{
   
     this.socket.emit(this.channel,this.state.chatInput);
       this.setState({chatInput:''});
  }


  getStickerView(){
    return (
     <View style={styles.container}>
     <View  style={styles.sticker}>
     <Image  source={require('../img/user/stickernew.png')} style={styles.stickerImage}>
     <View style={{flexDirection: 'row' }}>
     <Text numberOfLines={1} style={styles.textSticker}>{response.data.trainer.name}</Text>
     <Text style={styles.textSticker}>さん </Text>
     </View>
     <Text style={styles.textSticker}> がPersonal trainerに </Text>
     <Text style={styles.textSticker}>なりました！</Text>
     </Image>
     </View>
     </View>

     )

  }
  getDateView(item){

    return (
      <View style={styles.date}>
    <View  style={{ flex:0.2,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:1,alignItems: 'center',justifyContent: 'center',backgroundColor: 'white' }}>
    <Text
    style={{
      backgroundColor: 'transparent',                                      
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {item.dateItem}
    </Text>
    </View>
    </View>

     )

  }

  Accept = () =>{
    const Data = this.state.Data;
   
    let formdata = new FormData();

    formdata.append("access_token", this.state.access_token);
    formdata.append("type", this.state.type);
    formdata.append("id", this.state.id);
    formdata.append("trainerId",this.state.trainerId);
    formdata.append("result", this.state.result ); 
    fetch('http://35.185.68.16/api/v1/customer/confirmTrainer', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {

     if(responseJson.result === true){
               Object.keys(Data).forEach(function(item){
                  if(Data[item].showConfirmView === true){
             Data[item].showConfirmView = false;
                 
                  }
              })
       let itemSticker ={
        showStickerView:true
      }
      Data.push(itemSticker);
      this.setState({
        canChat : true,
        
      })          
    }else{
      console.log("error");
    }
  })

  }
  Decline = () =>{

    let formdata = new FormData();

    formdata.append("access_token", this.state.access_token);
    formdata.append("type", this.state.type);
    formdata.append("id", this.state.id);
    formdata.append("trainerId",this.state.trainerId);
    formdata.append("result", this.state.decline ); 
    console.log("ducanh form",formdata);
    fetch('http://35.185.68.16/api/v1/customer/confirmTrainer', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.result === true){
       this.props.navigation.navigate('SelectTrainer',{Account: this.props.navigation.state.params.Account});
     }else{
      Alert.alert("Something went wrong");
    }

  })
  }
  getConfirmView(){

    return (
     <View style={styles.container}>
     <View style={styles.acceptChat}>
     <View style={styles.buttonAccept}>
     <TouchableOpacity style={{flex:1}} onPress={this.Accept.bind()}>
     <LinearGradient
     colors={['#FF437A','#FF00B2']}
     start={{x: 1, y: 0.5}} end={{x: 0.0, y: 0.5}}
     style={{ flex:1,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:2,alignItems: 'center',justifyContent: 'center', }}>
     <Text  style={{
      backgroundColor: 'transparent',            
      color: '#fff',
      fontSize:12,
      justifyContent: 'center',
      alignItems: 'center',

    }}>
    PersonalTrainer契約する
    </Text>
    </LinearGradient>

    </TouchableOpacity>

    </View>
    <View style={styles.buttonDecline}>
    <TouchableOpacity style={{flex:1}} onPress={this.Decline.bind()}>
    <LinearGradient
    colors={['#DCDCDC','#DCDCDC']}
    start={{x: 1, y: 0.5}} end={{x: 0.0, y: 0.5}}
    style={{ flex:1,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:2,alignItems: 'center',justifyContent: 'center', }}>
    <Text  style={{
      backgroundColor: 'transparent',            
      color: '#fff',
      fontSize:12,
      justifyContent: 'center',
      alignItems: 'center',

    }}>
    契約しない
    </Text>
    </LinearGradient>

    </TouchableOpacity>
    </View>
    </View>
    </View>

    )
    
  }

  getTrainerView(item){

    return (
     <View style={styles.container}>
     <View style={styles.retrive}>
     <View style={styles.avatar}>
     <Image source={{ uri: response.data.trainer_avatar }} style={{ flex:1,width: 35, height: 35,borderRadius: 35/2, }} resizeMode="stretch" />
     </View>
     <View style={styles.bubleChat}>
     <Text style={{margin:10}} >{item.content}</Text>
     </View>
     </View> 

     </View>
     )}

    getCustomerView(item){


      return (
       <View style={styles.sendMess}>
       <View style={styles.bubleChatSend}>
       <Text style={{margin:10}} >{item.content}</Text>

       </View>

       </View>
       )}

      getBuyPoint(item){
        return (
          <View style={styles.askBuyPoint}>

          <View style={styles.buttonaskBuyPoint}>
          <TouchableOpacity style={{flex:1}}>
          <LinearGradient
          colors={['#FF437A','#FF00B2']}
          start={{x: 1, y: 0.5}} end={{x: 0.0, y: 0.5}}
          style={{ flex:1,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:2,alignItems: 'center',justifyContent: 'center', }}>
          <Text  style={{
            backgroundColor: 'transparent',            
            color: '#fff',
            fontSize:11,
            justifyContent: 'center',
            alignItems: 'center',

          }}>
          Pointが足りません 購入しますか？
          </Text>
          </LinearGradient>

          </TouchableOpacity>
          </View>
          </View>
          )
      }

      renderItem= ({item}) => {
     
        if(item.showConfirmView === true){

          return this.getConfirmView();
        } else if(item.showDataView ===true){
          return this.getDateView(item);
        }else if(item.showStickerView ===true){
          return this.getStickerView();
        }else if(item.sender ==='customer' &&  item.content !== ""){
          return this.getCustomerView(item);
        }else if(item.sender ==='trainer'  &&   item.content !== ""){
          return this.getTrainerView(item);
        }else if(item.point === 0){
          return this.getBuyPoint(item);
        }
      }


      render() {
       const { navigate } = this.props.navigation;
       const {goBack} = this.props.navigation;
       return (
        <Image  source={require('../img/user/chat.png')} style={styles.backgroundImage}>
        <View style={styles.container}>
        <View style={styles.headerContent}>

        <TouchableOpacity style={styles.icon} onPress={ () => goBack(null)  }  >
        <Ionicons name="ios-arrow-back" size={20} />
        </TouchableOpacity>


        <View style={styles.text}>
        <Text numberOfLines={1} style={{flex:1,paddingHorizontal: 40,justifyContent: 'center', alignItems: 'center',}}> {this.state.name}</Text>

        </View>

        </View>

        <View style={styles.mainContent}>


        <View style={styles.chatContent}>
        <FlatList
        data={this.state.Data}
         extraData={this.state}
        style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',}}
        keyExtractor = {(item, index) => index}
        renderItem={this.renderItem}
        ref={(ref) => { this.flatList = ref; }}
        />





        </View>


        </View>

        <KeyboardAvoidingView style={styles.bottomContent}      behavior="padding">
        <View style={styles.showPoint}>
        <Text> {this.state.point}</Text>
        <Text style={{fontSize: 10,alignItems: 'flex-end'  }}>pt </Text>
        </View>

        <View style={styles.formSentMess}>
        <View style={styles.formInput}>

        <View style={{flex: 0.5,backgroundColor: '#DCDCDC',borderRadius: 50,flexDirection: 'row'  }}>
        <TextInput
        editable={this.state.canChat}
        style={{flex: 0.9,backgroundColor: '#DCDCDC',borderRadius: 50,paddingLeft:20}}
        underlineColorAndroid='transparent'      
        autoCapitalize="none"
       

      defaultValue={this.state.chatInput}
        placeholder="メッセージ入力"
        placeholderTextColor = "#717171"
        returnKeyType = {"send"}
        onChangeText={chatInput => this.setState({chatInput})}
        />
        <TouchableOpacity style={styles.chatSubmit} onPress={this.sendChat}>
        <Text style={{color: '#717171'}}> 送信</Text>
        </TouchableOpacity>
        </View>


        </View>

        <View style={styles.buttonMedia}>
        <TouchableOpacity style={{flex:1,paddingRight:10}}>
        <FontAwesome name="video-camera" size={20} color="black"  />
        </TouchableOpacity>

        <TouchableOpacity  style={{flex:1,}}>
        <FontAwesome name="camera" size={20} color="black" />
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>
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
    },
    container:{
      flex: 1,

    },
    headerContent:{
      flex: 0.7,
      flexDirection: 'row' ,
      backgroundColor:'rgba(0,0,0,0)',
      marginTop:15,
      justifyContent: 'center',
      alignItems: 'center',

    },
    icon:{
      flex:0.2,
      justifyContent: 'center',
      alignItems: 'center',

    },
    text:{
      flex: 1,

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContent:{
      flex: 7.7,
      marginHorizontal: 20,
    },
    date:{
      flex: 0.7,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row' ,

    },
    chatContent:{
      flex: 15.7,

    },
    bottomContent:{
      flex: 1.3,

    },
    showPoint:{
      flex:0.7,
      flexDirection:  'row' ,
      backgroundColor:'#DCDCDC',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight:15
    },
    formSentMess:{
      flex:2,
      backgroundColor: 'white',
      flexDirection: 'row' ,
    },
    formInput:{
      flex: 7.6,
      justifyContent: 'center',
      paddingHorizontal: 20


    },
    buttonMedia:{
      flex: 2.4,
      flexDirection: 'row' ,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight:15
    },

    retrive:{
      flex: 1                                                                                                                                                                       ,
      flexDirection: 'row' ,

    },
    avatar:{

      width: 35,
      height: 35,
      borderRadius: 35/2,
      backgroundColor: 'white',

    },
    bubleChat:{
      flex: 0.8,
      backgroundColor: 'white',
      borderRadius: 15,
      overflow:'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      margin:10
    },
    acceptChat:{
      flex: 1,
      flexDirection: 'row' ,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonAccept:{
      width: 170,
      height: 40,

    },
    buttonDecline:{
      width: 100,
      height: 40,
      paddingLeft:20
    },
    sticker:{
      flex: 1,
      margin:20,

      justifyContent: 'center',
      alignItems: 'center',
    },
    stickerImage:{
      width: 230,
      height: 130,
      padding:50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textSticker:{
      fontSize: 12,
      color:'#FF317F'
    },
    sendMess:{
      flex: 1,
      flexDirection: 'row-reverse' 
    },
    bubleChatSend:{
     flex: 0.8,
     backgroundColor: '#78FBD4',
     borderRadius: 15,
     overflow:'hidden',
     justifyContent: 'center',
     alignItems: 'center',
     margin:10
   },
   askBuyPoint:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20

  },
  buttonaskBuyPoint:{
    width: 200,
    height: 40,
  },
  chatSubmit:{
    justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row' 
  },
  circleOutside: {

    width: 40,
    height: 40,
    borderRadius: 40/2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


   export default ChatUser;