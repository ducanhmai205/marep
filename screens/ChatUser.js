'use strict';

import React, { Component } from 'react';

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
class ChatUser extends Component {
constructor(props) {
  super(props);

  this.state = {
    trainerId: `${this.props.navigation.state.params.trainerId}`,
    id :`${this.props.navigation.state.params.Account.customer.id}`,
    type: `${this.props.navigation.state.params.Account.type}`,
    access_token :`${this.props.navigation.state.params.Account.customer.access_token}`,
    data: [
    {id: '1',send:'nananananananananananananananananananananananananananananananananananana nanananana',retrive:'abc'},
    ]
  };
}
componentWillMount() {
    console.log("access_token", this.state.access_token);
    console.log("type",this.state.type);
    console.log("id",this.state.id);
    console.log("trainerId",this.state.trainerId);

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
      
      console.log("json ",responseJson);
     




    })


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
    <Text numberOfLines={1} style={{flex:1,paddingHorizontal: 40,justifyContent: 'center', alignItems: 'center',}}> ssssssssssssssssssssss</Text>

    </View>

    </View>

    <View style={styles.mainContent}>
    <View style={styles.date}>
    <View  style={{ flex:0.2,borderColor:'white',overflow:'hidden',borderRadius: 25,borderWidth:1,alignItems: 'center',justifyContent: 'center',backgroundColor: 'white' }}>
    <Text
    style={{
      backgroundColor: 'transparent',                                      
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    30/4
    </Text>
    </View>
    </View>


    <View style={styles.chatContent}>
    <FlatList
    data={this.state.data}
    style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',}}
    keyExtractor = {(item, index) => index}
    renderItem={({item}) => 
    <View style={styles.container}>
    <View style={styles.retrive}>
    <View style={styles.avatar}>

    </View>
    <View style={styles.bubleChat}>
    <Text style={{margin:10}} >{item.send}</Text>
    </View>
    </View> 

    <View style={styles.acceptChat}>
    <View style={styles.buttonAccept}>
    <TouchableOpacity style={{flex:1}}>
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
    <TouchableOpacity style={{flex:1}}>
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
    <View  style={styles.sticker}>
     <Image  source={require('../img/user/stickernew.png')} style={styles.stickerImage}>
        <View style={{flexDirection: 'row' }}>
        <Text numberOfLines={1} style={styles.textSticker}>dwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdw</Text>
        <Text style={styles.textSticker}>さん </Text>
        </View>
        <Text style={styles.textSticker}> がPersonal trainerに </Text>
        <Text style={styles.textSticker}>なりました！</Text>
     </Image>
     </View>
    <View style={styles.sendMess}>
        <View style={styles.bubleChatSend}>
<Text style={{margin:10}} >{item.send}</Text>

        </View>

    </View>
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


    </View>



  }
  />



  </View>


  </View>

  <KeyboardAvoidingView style={styles.bottomContent}      behavior="padding">
  <View style={styles.showPoint}>
  <Text> POINT/10000</Text>
  <Text style={{fontSize: 10,alignItems: 'flex-end'  }}>pt </Text>
  </View>

  <View style={styles.formSentMess}>
  <View style={styles.formInput}>

  <View style={{flex: 0.5,backgroundColor: '#DCDCDC',borderRadius: 50,flexDirection: 'row'  }}>
  <TextInput

  style={{flex: 0.9,backgroundColor: '#DCDCDC',borderRadius: 50,paddingLeft:20}}
  underlineColorAndroid='transparent'      
  autoCapitalize="none"
  placeholder="メッセージ入力"
  placeholderTextColor = "#717171"
  returnKeyType = {"next"}
  />
  <TouchableOpacity style={{justifyContent: 'flex-end',alignItems: 'center',flexDirection: 'row' }}>
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
  flex: 15,

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
container:{
  flex: 1,
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