'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  Alert,
  Switch,
  TextInput
} from 'react-native';
import Dimensions from 'Dimensions';
import { Feather , Entypo , MaterialIcons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

import SimplePicker from 'react-native-simple-picker';

const options = ['1', '2','3','4','5','7','8'];
class MenuTrainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
     optionUserCare:`${this.props.navigation.state.params.Account.trainer.max_customer_training}`,
     value:'',
       image: `${this.props.navigation.state.params.Account.avatar}`,
       size:15,
       name:`${this.props.navigation.state.params.Account.trainer.name}`,
    };
  }


  logout = () => {

    var type = 

  // console.log('new',this.props.navigation.state.params.Account.type)
  // console.log('id',this.props.navigation.state.params.Account.trainer.id)
  // console.log('token',this.props.navigation.state.params.Account.trainer.access_token)
fetch('http://35.185.68.16/api/v1/customer/logout', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 type  : this.props.navigation.state.params.Account.type,
    id  : this.props.navigation.state.params.Account.trainer.id,
  access_token  : this.props.navigation.state.params.Account.trainer.access_token,
  })
 
}).then((response) => response.json())
      .then((responseJson) => {
        console.log('token2',this.props.navigation.state.params.Account.trainer.access_token)
 

         if(responseJson.status === true)
         {
          
  

            this.props.navigation.navigate('LoginScreen');
         }
         else{
           
             
                  
               Alert.alert('ok');

            
           }
       
      }).catch((error) => {
        console.error(error);
      });
 
  }

  confirm = () => {
  Alert.alert(
    
    // This is Alert Dialog Title
    '本当にログアウトしますか？',
 
    // This is Alert Dialog Message. 
    '',
    [
      // First Text Button in Alert Dialog.
      
 
      // Second Cancel Button in Alert Dialog.
      // {text: 'Cancel', onPress: () => this.props.navigation.navigate('MenuTrainer',{ Account: this.props.navigation.state.params.Account  })},
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      // Third OK Button in Alert Dialog
      {text: 'OK',  onPress: () => this.logout()},
      
    ],
   { cancelable: false }
  )
 }

  ShowAlert = (value) =>{

  this.setState({
 
    SwitchOnValueHolder: value
  })
 
  if(value == true)
  {
 
   this.setState({ value : 'on'})
   console.log("swtich",value)
  }
  else{
 
   
 this.setState({ value : 'off' })
   console.log("swtich2",value)
  }
 
}

_pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64:true
    });

    

    if (!result.cancelled) {
      this.setState({ image: result.uri, });
      console.log("ducanhpic",result.uri);
    }else {
      Alert.alert('need image now ')
    }
  };


TrainerUpdate = () =>{
 

  let formdata = new FormData();
let push = this.state.value;
let training = this.state.optionUserCare;
let name = this.state.name;

  formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
  formdata.append("type", this.props.navigation.state.params.Account.type);
  formdata.append("id", this.props.navigation.state.params.Account.trainer.id);
  formdata.append("email", this.props.navigation.state.params.Account.trainer.email);
  formdata.append("push_status", push);
  formdata.append("max_customer_training", training);
  formdata.append("gender", this.props.navigation.state.params.Account.trainer.gender);
  formdata.append("name",  name);
  formdata.append('avatar', {uri: this.state.image, name: 'selfie.jpg', type: 'image/jpg'});


fetch('http://35.185.68.16/api/v1/trainer/updateProfile', {

  method: 'POST',
  headers: {
        'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  },
   body: formdata,

 
 
}).then((response) => response.json())
      .then((responseJson) => {
         console.log("olddata",formdata);
         console.log("newdata",responseJson);
       if(responseJson.status === true){

          Alert.alert('Update Success');
             this.props.navigation.navigate('TrainerProfile',{Account: responseJson.account});
       }
      else{
         {
          var error_object =  responseJson.message[Object.keys(responseJson.message)[0]];
            
            Object.keys(responseJson.message)[0];
              var error_messname = '';
              var error_messPush = '';
              var error_messAvatar = '';
             
             
              var error_messMax_customer_training = '';
              var error_messTrainer_email = '';
           
              

              if (responseJson.message.name) {
               for (var i = 0, len = responseJson.message.name.length; i < len; i++) {
                      error_messname += responseJson.message.name[i] + '!'
                    }
              }
               if (responseJson.message.avatar) {
               for (var i = 0, len = responseJson.message.avatar.length; i < len; i++) {
                      error_messAvata += responseJson.message.avatar[i] + '!'
                    }
              }
              

          
               if (responseJson.message.max_customer_training) {
               for (var i = 0, len = responseJson.message.max_customer_training.length; i < len; i++) {
                      error_messMax_customer_training += responseJson.message.max_customer_training[i] + '!'

                    }
              }
              if (responseJson.message.push_status) {
               for (var i = 0, len = responseJson.message.push_status.length; i < len; i++) {
                      error_messPush += responseJson.message.push_status[i] + '!'

                    }
              }
              if (responseJson.message.email) {
               for (var i = 0, len = responseJson.message.email.length; i < len; i++) {
                       error_messTrainer_email += responseJson.message.email[i] + '!'

                    }
              }
                  
              Alert.alert(error_object[0] );
            
      }
    }
        
 
      }).catch((error) => {
        console.error(error);
      });
 
 
  }
render() {
  const { image } = this.state;
        const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    

    return (
       
      <Image style={styles.backgroundImage} source={require('../img/user/menu_trainerbg.png')}>
          <StatusBar hidden={true} />
          <View style={styles.upcontainer}>
              <View style={styles.header}>
                 <TouchableOpacity  style={{flex: 1,flexDirection: 'row' ,justifyContent: 'flex-end',alignItems: 'center',}} onPress={this.TrainerUpdate}>
                                   <Feather name="x" size={25}  />
                 </TouchableOpacity>

              </View>

              <View style={styles.contentUp}>
                        <View style={styles.avatarPicker}>
                            <TouchableOpacity  style={{flex: 1,backgroundColor: 'white',justifyContent: 'center',alignItems: 'center',}} onPress={this._pickImage}>
                                    <View style={styles.circle}>
                                        
                                          {image &&
          <Image source={{ uri: this.state.image }} style={{ flex:1,width: 80, height: 80,borderRadius: 80/2, }} resizeMode="stretch" />}
                                    </View>
                            </TouchableOpacity>
                        
                        </View>
                        
                        <View style={styles.selectOption}>
                            <View style={styles.name}>
                                <View style={styles.textName}>
                                   <TextInput
                
                                          style={{flex:1,fontSize: 15,paddingTop:10,color:'#665586'}} 
                                          underlineColorAndroid='transparent'
                                          returnKeyType="next"
                                          autoCapitalize="none"
                                          placeholder= {this.props.navigation.state.params.Account.trainer.name}
                                          onChangeText={name => this.setState({name})}
                                    />

                                </View>

                                <View style={styles.pushButton}>
                                   <Text style={{color:'gray',fontSize: 10}}> PUSH 通知 </Text>
                                  <Switch
                                      onValueChange={(value) => this.ShowAlert(value)}
                                      value={this.state.SwitchOnValueHolder} />
    
                                  
                                </View>
                            </View>

                            <View style={styles.select}>
                           
                                  <View style={styles.optionName}>
                                      <Text style={styles.textOption}>メールアドレス</Text>
                                       <Text style={styles.textOption}>{this.props.navigation.state.params.Account.trainer.email}  </Text>
                                       
                                  </View>
                         
                             <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('UpdatePassTrainer', { Account: this.props.navigation.state.params.Account  })}}>
                                  <View style={styles.optionName}>
                                      <Text style={styles.textOption}>パスワード変更</Text>
                                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                                  </View>
                            </TouchableOpacity>
                              <TouchableOpacity style={{flex: 1,}}  onPress={() => {this.refs.option.show()}} >
                                  <View style={styles.optionSelectNumberTrainee}>
                                      <Text style={styles.textOption}> トレーニングできる人数 </Text>
                                      <Text style={styles.textOption}> {this.state.optionUserCare}人 </Text>
                                      <SimplePicker
                                          ref={'option'}
                                          confirmText='完了'
                                          cancelText='キャンセル'
                                          options={options}
                                          onSubmit={(options) => {
                                            this.setState({
                                              optionUserCare: options,
                                           });
                                         }}
                                       />     
                                  </View>
                              </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1,}}  onPress={()=> {
                          navigate('TrainerSpecialize',{ Account: this.props.navigation.state.params.Account  });}}>
                                  <View style={styles.optionVersion}>
                                      <Text style={styles.textOption}> 得意分野 </Text>
                                      <Text style={styles.textOption}> {this.props.navigation.state.params.Account.rawMySpecializes} </Text>
                                  </View>
                            </TouchableOpacity>

                             <TouchableOpacity style={{flex: 1,}}  onPress={()=> {
                          navigate('UpdatePr',{ Account: this.props.navigation.state.params.Account  });}}>
                                  <View style={styles.optionInfomation}>
                                      <Text style={styles.textOption}> 自己紹介文 </Text>
                                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                            
                                  </View>
                               </TouchableOpacity>
                            </View>
                        </View>
              </View>
          </View>

          <View style={styles.downcontainer}>
             <View style={styles.graySpace}>

             </View>
             <View style={styles.bottomSelect}>
                  
              <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('InfomationVersion')}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                     
                  </View>
               </TouchableOpacity>
               <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('Policy')}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> 使用規約 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>
                </TouchableOpacity>
                 <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('Term')}}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> プライバシーポリシー </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>
                </TouchableOpacity>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> バージョン情報 </Text>
                      <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
                  </View>
               <TouchableOpacity style={{flex: 1,}} onPress={this.confirm}>
                  <View style={styles.option}>
                      <Text style={styles.textOption}> ログアウト </Text>
                      
                  </View>
               </TouchableOpacity>
                  <View style={styles.space}>

                  </View>
             </View>
          </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'stretch',
        backgroundColor:'rgba(0,0,0,0)',
      },
upcontainer:{
  flex: 0.59,

},
header:{
flex: 0.6,

flexDirection: 'column-reverse' ,
  backgroundColor:'rgba(0,0,0,0)',
  paddingRight:30
},
contentUp:{
flex: 9,
paddingLeft: 3,
},
avatarPicker:{
flex: 0.9,
 flexDirection: 'row',
justifyContent: 'center',
alignItems: 'stretch',


},
circle:{
  flex: 1,
   width: 80,
    height: 80,
    borderRadius: 80/2,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
},
name:{
  flex: 0.7,

},
textName:{
  flex: 0.4,
 justifyContent: 'center',
 alignItems: 'center',

},
pushButton:{
  flex: 0.4,
  paddingTop:5,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row' ,

  paddingRight:8,

},
select:{
flex: 2.3,
paddingHorizontal: 30,

},
optionName:{
flex: 1,
paddingBottom: 10,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,

},
textOption:{
fontSize: 10,
color:'gray',
paddingLeft:2
},
optionSelectNumberTrainee:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
paddingBottom: 5
},
optionVersion:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
},
optionInfomation:{
flex: 1,
alignItems: 'center',
justifyContent:  'space-between' ,
flexDirection: 'row' ,
paddingBottom: 5,
},
selectOption:{
flex: 3,

},
downcontainer:{
  flex: 0.5,
},
graySpace:{
  flex: 1.2,

},
bottomSelect:{
  flex: 8,
  paddingHorizontal: 30
},
option:{
  flex: 1.1,
  alignItems: 'center',
  justifyContent:  'space-between' ,
  flexDirection: 'row' ,
  paddingTop:3
},
space:{
  flex: 1.5,
  
}

});


export default MenuTrainer;