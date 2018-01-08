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
      import ModalFilterPicker from 'react-native-modal-filter-picker'

      var options = [];
      for (var i = 1; i <=100; i++) {
        options.push({
          key: i,
          label: i,
        });
      }


      class MenuTrainer extends Component {
        constructor(props) {
          super(props);
          console.log("data khi truyen tu profile",this.props.navigation.state.params.max_customer_training);
          var pushStatus = `${this.props.navigation.state.params.Account.trainer.push_status}`;
          let defaultSwitch = this.getSwitchDefaultValue();

          this.state = {
           picked:`${this.props.navigation.state.params.max_customer_training}`,
           value:'',
           image: `${this.props.navigation.state.params.Account.avatar}`,
           size:15,
           issue:'',
           SwitchOnValueHolder : defaultSwitch ,
           name:`${this.props.navigation.state.params.Account.trainer.name}`,
           email:`${this.props.navigation.state.params.Account.trainer.email}`,
           push:`${this.props.navigation.state.params.Account.trainer.push_status}`,
           trainerSpecialize : `${this.props.navigation.state.params.Account.rawMySpecializes}`,
           visible: false,
           

         };
       }

       getSwitchDefaultValue = ()=>{
        let pushStatus = this.props.navigation.state.params.Account.trainer.push_status;
        if(pushStatus === 'on') return true;
        return false;
      }
      ShowAlert = (isSelected) =>{
        this.setState({ 
          SwitchOnValueHolder: isSelected
        })

      }
      getPushValue=()=>{
        let isSwitchSelected = this.state.SwitchOnValueHolder;
        if(isSwitchSelected) return 'on';
        return 'off';
      }

      logout = () => {

        var type = 


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
        '本当にログアウトしますか？',
        '',
        [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},

        {text: 'OK',  onPress: () => this.logout()},
        ],
        { cancelable: false }
        )
    }



    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64:true
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri, });

      }else {

      }
    };


    TrainerUpdate = () =>{


      let formdata = new FormData();
      let push =  this.getPushValue();
      let training = this.state.picked;
      let name = this.state.name;
      let email = this.state.email;

    

      formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
      formdata.append("type", this.props.navigation.state.params.Account.type);
      formdata.append("id", this.props.navigation.state.params.Account.trainer.id);
      formdata.append("email", email);
      formdata.append("push_status", push);
      formdata.append("max_customer_training", training);
      formdata.append("name",  name);
      formdata.append('avatar', {uri: this.state.image, name: 'selfie.jpg', type: 'image/jpg'});
console.log("ducanh",formdata);

      fetch('http://35.185.68.16/api/v1/trainer/updateProfile', {

        method: 'post',
        headers: {
        'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
              },
        body: formdata,



      }).then((response) => response.json())
      .then((responseJson) => {

       console.log("newdata",responseJson);
       if(responseJson.status === true){


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

  getMaxtrainingundefired(){
    let max = this.state.optionUserCare;
    if(max === 'undefined') return '0';
    return max
  }

  componentWillMount() {
    let formdata = new FormData();

    formdata.append("access_token", this.props.navigation.state.params.Account.trainer.access_token);
    formdata.append("type", this.props.navigation.state.params.Account.type);
    formdata.append("id", this.props.navigation.state.params.Account.trainer.id);

    fetch('http://35.185.68.16/api/v1/trainer/getProfile', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {

      var issue = responseJson.account.rawMySpecializes;
     this.setState({

        issue : issue,
    })


    })


  }
  onShow = () => {
    this.setState({ visible: true });
  }

  onSelect = (picked) => {
    console.log("pikcer",this.state.picked)
    this.setState({
      picked: picked,
      visible: false
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  }

  getMaxundefired(){
    let maxCustomer = this.state.picked;
    if(maxCustomer === 'undefined') return '0';
    if(maxCustomer === 'null') return '0';
    return maxCustomer
  }
  getEmailundefired(){
    let email = this.state.email;
    if(email === 'undefined') return 'example@gmail.com';
    if(email === 'null') return 'example@gmail.com';
    return email
  }
  render() {
    const { image } = this.state;
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    const { visible,picked, } = this.state;

    return (

      <Image style={styles.backgroundImage} source={require('../img/user/menu_trainerbg.png')}>
      <StatusBar hidden={true} />
      <View style={styles.upcontainer}>


      <View style={styles.contentUp}>

      <View style={styles.avatarPicker}>
      <View style={styles.leftSpace}>
              
      </View>
      <TouchableOpacity  style={{flex: 1,paddingTop:15,paddingBottom:15,backgroundColor: 'white',justifyContent: 'center',alignItems: 'center',}} onPress={this._pickImage}>
      <View style={styles.circle}>

      {image &&
        <Image source={{ uri: this.state.image }} style={{ flex:1,width: 80, height: 80,borderRadius: 80/2, }} resizeMode="stretch" />}
        </View>
        </TouchableOpacity>
        <View style={styles.header}>
        <TouchableOpacity  style={styles.Xbutton} onPress={this.TrainerUpdate}>
        <Feather name="x" size={20}  />
        </TouchableOpacity>

        </View>
        </View>

        <View style={styles.selectOption}>
        <View style={styles.name}>
        <View style={styles.textName}>
        <TextInput

        style={{flex:1,fontSize: 15,paddingBottom: 5,color:'#665586'}} 
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
        onValueChange={(push) => this.ShowAlert(push)}
        value={this.state.SwitchOnValueHolder} />


        </View>
        </View>

        <View style={styles.select}>

        <View style={styles.optionName}>
        <Text style={styles.textOption}>メールアドレス</Text>
        <TextInput

        style={styles.textOption} 
        underlineColorAndroid='transparent'
        returnKeyType="next"
        autoCapitalize="none"
        placeholder= {this.getEmailundefired()}
        onChangeText={email => this.setState({email})}
        />

        </View>

        <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('UpdatePassTrainer', { Account: this.props.navigation.state.params.Account  })}}>
        <View style={styles.optionName}>
        <Text style={styles.textOption}>パスワード変更</Text>
        <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1,}} onPress={this.onShow} >
        <View style={styles.optionSelectNumberTrainee}>
        <Text style={styles.textOption}> トレーニングできる人数 </Text>
        <Text style={styles.textOption}> {this.getMaxundefired()} 人 </Text>

        <ModalFilterPicker
        showFilter={false}
        visible={visible}
        onSelect={this.onSelect}
        onCancel={this.onCancel}
        options={options}
        />
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1,}}  onPress={()=> {
          navigate('ChangeSpecializes',{ Account: this.props.navigation.state.params.Account,max_customer_training: this.state.picked});}}>
          <View style={styles.optionVersion}>
          <Text style={styles.textOption}> 得意分野 </Text>
          <Text style={styles.textOption}> {this.state.issue} </Text>
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

            <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('InfomationVersionTrainer',{Account: this.props.navigation.state.params.Account})}}>
            <View style={styles.option}>
            <Text style={styles.textOption}> バージョン情報 </Text>
            <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />

            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,}} onPress={ ()=> {navigate('PolicyTrainer',{Account: this.props.navigation.state.params.Account})}}>
            <View style={styles.option}>
            <Text style={styles.textOption}> 使用規約 </Text>
            <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1,}}  onPress={ ()=> {navigate('TermTrainer',{Account: this.props.navigation.state.params.Account})}}>
            <View style={styles.option}>
            <Text style={styles.textOption}> プライバシーポリシー </Text>
            <MaterialIcons name="keyboard-arrow-right" size={13} color='#432C71' />
            </View>
            </TouchableOpacity>
            <View style={styles.option}>
            <Text style={styles.textOption}> お問い合わせ </Text>
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
    leftSpace:{
      flex: 1,

    },
    header:{
      flex: 1,

    },
    contentUp:{
      flex: 9,
      paddingLeft: 3,

    },
    avatarPicker:{
      flex: 1.3,

      flexDirection: 'row',


    },
    circle:{
   
    },
    Xbutton:{

      flex: 1,
      paddingTop: 10,
      alignItems: 'center',


    },
    name:{
      flex: 0.7,

    },
    textName:{
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 5,

    },
    pushButton:{
      flex: 0.2,

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