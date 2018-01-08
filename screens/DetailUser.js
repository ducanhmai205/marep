  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    Image,
    TouchableOpacity,
    Platform
  } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Dimensions from 'Dimensions';

  class DetailTrainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        content:'',
        pressIcon: true,
        issue : '',
        name:'',
        height:'',
        weight:'',
        id :`${this.props.navigation.state.params.Account.trainer.id}`,
        type: `${this.props.navigation.state.params.Account.type}`,
        access_token :`${this.props.navigation.state.params.Account.trainer.access_token}`,
        customerId: `${this.props.navigation.state.params.id}`,
        relation_status : '',
      };
    }
    pressIcon = () =>
    {
     this.setState({ pressIcon: !this.state.pressIcon });

   }
   
   componentWillMount() {
    console.log("customerid",this.state.customerId);
    console.log("customerid",this.props.navigation.state.params.id);

    let formdata = new FormData();
    formdata.append("access_token", this.state.access_token);
    formdata.append("type", this.state.type);
    formdata.append("id", this.state.id);
    formdata.append("customerId", this.state.customerId);


    fetch('http://35.185.68.16/api/v1/customer/detail', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {
     
      


      var content = responseJson;

      console.log("issue",content)
      this.setState({
       
        content : content,
        image: content.avatar,
        name: content.data.name,
        issue: content.rawIssues,
        height: content.data.customer_height,
        weight: content.data.customer_weight,
        gender: content.data.gender,
        relation_status: content.relation_status
      })
      console.log("issue",this.state.relation_status)
      
    })


  }
  getGenderInJapanese(){
    let gender = this.state.gender;//male/female
    if(gender === 'male') return '男性';
    return '女性'

  }

  renderColor(relationStatus){
    if(relationStatus === "not_connected"){
      console.log("True",relationStatus);
      return '#DBDBDB';
    }else{
      console.log("False",relationStatus);
      return  '#00E6BE';
    }

  }
  render() {
    const { navigate } = this.props.navigation;
    const {goBack} = this.props.navigation;
    const  image  = this.state;
    return (
      
     <ImageBackground  source={require('../img/trainer_detailscreen.png')} style={styles.backgroundImage}>
     <View style={styles.container}>
     <View style={styles.header}>
     <View style={styles.icon}>
     <TouchableOpacity style={{flex: 1, justifyContent: 'center',}} onPress={ () => goBack(null)  }>
     <Ionicons name="ios-arrow-back" size={20} />
     </TouchableOpacity>
     </View>

     <View style={styles.text}>
     <Text style={{fontSize:15,fontWeight: 'bold',alignItems: 'center',justifyContent: 'center',  }}>{this.state.name} </Text>

     </View>


     </View>

     <View style={styles.content}>
     <View style={styles.pictureImage}>
     <Image  source={{uri: this.state.image }} style={styles.imageswiper}  resizeMode="stretch"  >

     </Image>
     </View>
     <View style={styles.textName}>
     <Text style={styles.name}>
     {this.state.name}
     </Text>

     <Text style={styles.issue}>
     {this.state.issue}
     </Text>
     </View>
     <View style={styles.textInfomation}>
     <View style={{flex:0.7}}>
     <Text style={styles.height}>
     身長 :    {this.state.height} cm
     </Text>
     
     
     <Text style={styles.weight}>
     体重 :    {this.state.weight} kg
     </Text>
     
     
     <Text style={{}}>
     性別 :    {this.getGenderInJapanese()}
     </Text>
     
     </View>

     <View style={styles.iconChat}>
     <View style={styles.circleOutside}>
     <View style={styles.circleInside}>
     <TouchableOpacity   onPress={ ()=> {
        navigate('ChatTrainer',{Account: this.props.navigation.state.params.Account,customerId : this.state.customerId });}}>
     <Icon name="handshake-o" size={25} color={this.renderColor(this.state.relation_status)} />
     </TouchableOpacity>
     </View>

     </View>
     </View>
     </View>
     </View>

     <View style={styles.bottom}>

     </View>
     </View>
     </ImageBackground>
     
     );
  }
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  container:{
    flex: (Platform.OS === 'ios') ? 1: 0.8,
    marginLeft: 29,
    marginRight:(Platform.OS === 'ios') ? 31: 32,
  },

  header:{
    flex:  (Platform.OS === 'ios') ? 0.7: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row' 
  },
  text:{
    backgroundColor:'rgba(0,0,0,0)',
    flex: 1.3,

  },
  icon:{
    backgroundColor:'rgba(0,0,0,0)',
    flex: 0.7,


  },
  content:{
    flex: (Platform.OS === 'ios') ? 5: 6.5,

    marginTop:4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  pictureImage:{
    flex: (Platform.OS === 'ios') ? 2.5 :2.5,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  imageswiper:{
 borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  height: null,
  width: null,
flex: 1,
overflow: 'hidden',
},
  textName:{
    flex: (Platform.OS === 'ios') ? 0.8 : 1.3,
    backgroundColor:'rgba(0,0,0,0)',
    justifyContent: 'center',

    paddingHorizontal: 20



  },
  name:{
    paddingBottom: 5,
    fontSize:14,
    fontWeight:  '800' 
  },
  issue:{
    paddingTop: 3,
    fontSize:10
  },
  textInfomation:{
    flex: (Platform.OS === 'ios') ? 4 : 5,
    backgroundColor:'rgba(0,0,0,0)',
    paddingHorizontal: 20,
    

  },
  iconChat:{
    flex:0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOutside: {

    width: 50,
    height: 50,
    borderRadius: 50/2,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleInside:{
    flex: 1,
    width: 47,
    height: 47,
    borderRadius: 47/2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom:{
    flex: (Platform.OS === 'ios') ? 0.2 : 0,

  },



});


export default DetailTrainer;