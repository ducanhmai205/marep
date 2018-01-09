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
class ChatTrainer extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      customerId: `${this.props.navigation.state.params.customerId}`,
      id :`${this.props.navigation.state.params.Account.trainer.id}`,
      type: `${this.props.navigation.state.params.Account.type}`,
      access_token :`${this.props.navigation.state.params.Account.trainer.access_token}`,
      canChat: true,
      isFirst:true,
      point:'',
      name:'',
      json:'',
      chatInput:'',
      date:'',
      senderFirst:true,
      lockChat:false,
      messageJson:''
    };
  }

  connectSocketIo(sender){
   let socketData  = {
    sender:sender,
    customer: {
      "id": this.state.customerId,
    },
    trainer: {
      "id": this.state.id           
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
  var lockChat = this.state.lockChat;
  var DataArr = this.state.Data;
  var chatCan = this.state.canChat;
  var First = this.state.isFirst;
  var relation = this.state.relation;
  var senderFirst = this.state.senderFirst;
  var customer= response.sender;
  console.log("ducanh sender",response.sender);
 
  if(relation === 'not_connected' ){
    
   if(First=== true && response.sender === "trainer" ){
            this.setRelation();
          }
    if(First === true){

        if(response.sender === "trainer" &&  response.content !== ""){
           if(senderFirst === true){
          let itemMess ={
            showMessView:true
          }   
          First = false;

          DataArr.push(itemMess);  
            senderFirst = false;
          }

          }   

        

      
    }
    this.setState({isFirst:First});





  }
 if (lockChat === true && customer === "customer"){
  console.log("da an");
    this.setState({
      canChat: true,
      lockChat:false
    })
  }
}
componentDidMount() {


  let formdata = new FormData();
  formdata.append("access_token", this.state.access_token);
  formdata.append("type", this.state.type);
  formdata.append("id", this.state.id);
  formdata.append("customerId", this.state.customerId);


  fetch('http://35.185.68.16/api/v1/trainer/getTrainerChatHistory', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata

  }).then((response) => response.json())
  .then((responseJson) => {

   response = responseJson;

   var Data = [];
   var dateItem;
   var data = responseJson.data.data;
   var relation = responseJson.data.relation;
   if (relation === 'not_connected'){
     Object.keys(data).forEach(function(item){
      
      Data.push(data[item]);       
    })
   }
   else if(relation === 'connected'){
    Object.keys(data).forEach(function(item){        
      dateItem = item;
      let messages = data[item]; 
      if(dateItem != null){
        let itemData ={
          showDataView:true,
          dateItem: dateItem

        }
        Data.push(itemData);
        console.log("date data",Data);
      }
      
      messages.forEach(function(message){      
        Data.push(message);

      })
      
    });
    
  }
  else if (relation === 'pending'){
   Object.keys(data).forEach(function(item){  
    Data.push(data[item]);       
  })
 }



 var point = responseJson.data.point;
 var name = responseJson.data.customer.name;
 var canChat = responseJson.data.can_chat;
 var json = responseJson;
 var relation = responseJson.data.relation;
 
 
 
 
 this.setState({
  point:point,
  name:name,
  canChat: canChat,
  json : json,
  Data:Data,
  dateItem:dateItem,
  
  relation:relation


})
 

 let sender = responseJson.data.sender;
 this.connectSocketIo(sender);

})
}


setRelation(){
console.log("vao setrala");
let formdata = new FormData();

formdata.append("access_token", this.state.access_token);
formdata.append("type", this.state.type);
formdata.append("id", this.state.id);
formdata.append("customerId", this.state.customerId);
formdata.append("trainerId", this.state.id);


fetch('http://35.185.68.16/api/v1/trainer/connectCustomer', {
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  body: formdata

}).then((response) => response.json())
.then((responseJson) => {
 this.setState({
  messageJson : responseJson.result,
  canChat:false,
  lockChat: true,
})
 
})

}
sendChat = () =>{
  if(this.state.relation === "not_connected"){
  //goi api 
  
  this.socket.emit(this.channel,this.state.chatInput);


}else{
  this.socket.emit(this.channel,this.state.chatInput);
}



this.setState({chatInput:''});

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

getMessageView(item){

  return (
   <View style={styles.container}>
   <View style={styles.retrive}>
   <View style={styles.avatar}>
   <Image source={{ uri: response.data.customer_avatar }} style={{ flex:1,width: 35, height: 35,borderRadius: 35/2, }} resizeMode="stretch" />
   </View>
   <View style={styles.bubleChat}>
   <Text style={{margin:10}} >{this.state.messageJson}</Text>
   </View>
   </View> 

   </View>
   )

}
getCustomerView(item){
  return (
   <View style={styles.container}>
   <View style={styles.retrive}>
   <View style={styles.avatar}>
   <Image source={{ uri: response.data.customer_avatar }} style={{ flex:1,width: 35, height: 35,borderRadius: 35/2, }} resizeMode="stretch" />
   </View>
   <View style={styles.bubleChat}>
   <Text style={{margin:10}} >{item.content}</Text>
   </View>
   </View> 

   </View>
   )

}



getTrainerView(item){

  return (
   <View style={styles.sendMess}>
   <View style={styles.bubleChatSend}>
   <Text style={{margin:10}} >{item.content}</Text>

   </View>

   </View>
   )

}


renderItem= ({item}) => {
  if(item.showMessView === true ){
   return this.getMessageView(item);
 }else if(item.showDataView ===true){
  return this.getDateView(item);
}else if(item.showDataView === true ){
  return this.getDateView(item);}
  else if(item.sender ==='trainer' &&  item.content !== ""){
    return this.getTrainerView(item);
  }else if(item.sender ==='customer' &&  item.content !== ""){
    return this.getCustomerView(item);
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
  <Text style={{fontSize: 13}}> {this.state.point}</Text>
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
  placeholder="メッセージ入力"
  placeholderTextColor = "#717171"
  returnKeyType = {"done"}

  defaultValue={this.state.chatInput}
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
    flex:0.8,
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


export default ChatTrainer;