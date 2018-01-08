  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    ImageBackground,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    Platform
  } from 'react-native';
  import Dimensions from 'Dimensions';
  import { Ionicons, FontAwesome,Foundation} from '@expo/vector-icons';
  import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
  class SelectTrainer extends Component {
    constructor(props){
      super(props);
      this.state={
           text: '',
           id:'',
           data:'',
           page:0
          
        }
        this.onSelect = this.onSelect.bind(this)
      }
    onSelect(value){
          this.setState({
          text: `${value}`
          })
      }

      componentWillMount() {

    let formdata = new FormData();

    formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
    formdata.append("type", this.props.navigation.state.params.Account.type);
    formdata.append("id", this.props.navigation.state.params.Account.customer.id);
     formdata.append("page", this.state.page);

    fetch('http://35.185.68.16/api/v1/customer/listTrainer', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {
      var rawdata = responseJson;
    
      let trainers = responseJson.trainers;
   
      var arrayData = [];
      Object.keys(trainers).forEach(function(key){
        let name =  trainers[key].trainer.name;
        let avatar = trainers[key].avatar;
        let issue = trainers[key].rawMySpecializes;
        let id = trainers[key].trainer.id;
        let relation_status = trainers[key].relation_status;
        let relation_number= trainers[key].relation_number;
        var raw = {
          key: key,
          name : name,
          avatar :avatar,
          issue : issue,
          id : id,
          relation_status: relation_status,
          relation_number: relation_number,

        }
        arrayData.push(raw);

      });

      this.setState({
        data : arrayData,
      })
      
      if(responseJson.trainers === null){
        Alert.alert("You need chose issue")
      }
    })


  }

    _onEndReached(){
    let formdata = new FormData();
 this.setState({
      page: this.state.page+1,
    })
    formdata.append("access_token", this.props.navigation.state.params.Account.customer.access_token);
    formdata.append("type", this.props.navigation.state.params.Account.type);
    formdata.append("id", this.props.navigation.state.params.Account.customer.id);
     formdata.append("page", this.state.page);

    fetch('http://35.185.68.16/api/v1/customer/listTrainer', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {
      var rawdata = responseJson;
    
      let trainers = responseJson.trainers;
   
      var arrayData = [];
      Object.keys(trainers).forEach(function(key){
        let name =  trainers[key].trainer.name;
        let avatar = trainers[key].avatar;
        let issue = trainers[key].rawMySpecializes;
        let id = trainers[key].trainer.id;
        let relation_status = trainers[key].relation_status;
        let relation_number= trainers[key].relation_number;
        var raw = {
          key: key,
          name : name,
          avatar :avatar,
          issue : issue,
          id : id,
          relation_status: relation_status,
          relation_number: relation_number,

        }
        arrayData.push(raw);

      });

       arrayData = arrayData.concat(arrayData)
      this.setState({
        data : arrayData,
        page: this.state.page
      })
      
      if(responseJson.trainers === null){
        Alert.alert("You need chose issue")
      }
    })

   }
  

  renderColor(relationStatus){
    if(relationStatus === "not_connected"){
      return '#DBDBDB';
    }else{  
      return  '#00E6BE';
    }

  }
  getRelationMax(item){
  let Max = item;
  if(Max === 'max') return '最大';

  return Max
}
    render() {
  const { navigate } = this.props.navigation;
  const {goBack} = this.props.navigation;
      return (
        <View style={styles.container}>
             <ImageBackground  source={require('../img/signin04_trainerscreen.png')} style={styles.backgroundImage}>
              <View style={styles.containerImage}>
                  <View style={styles.header}>
                  
                  <Text style={{flex: 1,backgroundColor:'rgba(0,0,0,0)',paddingTop:15}}> パーソナルトレーナーを
                  {"\n"}
                   

               選んでください</Text>

                 </View>
                  <View style={styles.select}>
                  <RadioGroup
                  size={12}
                  color='#C2C2C2'
                  style={{flexDirection: 'row' ,paddingLeft:20 }}
                    onSelect = {(value) => this.onSelect(value)}>
                    <RadioButton value={'item1'} color='#402868' >
                          <Text>オンライン</Text>
                    </RadioButton>

                      <RadioButton value={'item2'} color='#402868'>
                          <Text>評価が高い</Text>
                      </RadioButton>
                   </RadioGroup>
                  </View>
                  <View style={styles.flatList}>
                    <FlatList
                      data={this.state.data}
                        keyExtractor = {(item, index) => index}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={-0.2}  
                      renderItem={({item}) =>
                                    <View style={styles.line}>

                                
                                            <View style={styles.avatar}>
                                            <TouchableOpacity onPress={ ()=> {navigate('DetailTrainer',{Account: this.props.navigation.state.params.Account,id: item.id})}}>
                                                 <Image source={{uri:item.avatar}} style={{ width: 60, height: 60,borderRadius: 60/2, }} resizeMode="stretch" />
                                            </TouchableOpacity>
                                            </View>
                                              
                                            <View style={styles.text}>
                                              <TouchableOpacity  onPress={ ()=> {navigate('DetailTrainer',{Account: this.props.navigation.state.params.Account,id: item.id})}}>
                                              <Text> {item.name}</Text>
                                                <Text style={{paddingTop:5,fontSize: 9}}>{item.issue}</Text>
                                              </TouchableOpacity>
                                            </View>
                                  
                                            <View style={styles.icon}>   
                                            <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>                            
                                                <FontAwesome name="handshake-o" size={20} color={this.renderColor(item.relation_status)} style={{ paddingRight:5 }} /> 
                                                <Text style={{fontSize: 10,paddingRight:5}}> {this.getRelationMax(item.relation_number)}</Text>  
                                            </View>
                                            <View style={{flex: 1,}}>                                     
                                                <Foundation name="heart" size={20} style={{ color: '#00E4BA',paddingTop:6}} />
                                                <Text></Text>  
                                              </View>
                                            </View>
                                            <View style={styles.arrow}>
                                            <TouchableOpacity style={{}}  onPress={ ()=> {navigate('DetailTrainer',{Account: this.props.navigation.state.params.Account,id: item.id})}}>
                                                <Ionicons name="ios-arrow-forward" size={22} style={{ color: '#00E4BA',paddingBottom: 5}} />
                                                <Text></Text>  
                                            </TouchableOpacity>

                                            </View>

                                           

                                            
                                    </View>
                                            }
                                  

                    />

                  </View>
              </View>
              <View style={styles.nextButton}>
                            <TouchableOpacity style={styles.TouchableOpacity} onPress={ ()=> {
                            navigate('TraineeProfile',{Account: this.props.navigation.state.params.Account})}}>
                                <Text style={{fontWeight: 'bold'}}> FINISH <Ionicons  name="ios-arrow-forward" size={15}  /> </Text> 
                          </TouchableOpacity> 
                          </View>
             </ImageBackground>
        </View>
      );
    }
  }
    
  const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  backgroundImage:{
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  nextButton:{
     flex: 1,
     flexDirection: 'row' , 
     position:'absolute',
     bottom: 0,
     height: 70,
     backgroundColor:'white',
     width: '100%',
    
  },
  TouchableOpacity:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage:{
    flex: 1,
  },
  header:{
  flex:(Platform.OS === 'ios') ? 0.15 : 0.1,

  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 25,
  marginTop:20

  },
  flatList:{
  flex: 0.8,
    marginRight: 45,
    marginLeft:43,
  },
  select:{
    backgroundColor:'rgba(0,0,0,0)',
  justifyContent: 'center',
  alignItems: 'center',

     marginRight: (Platform.OS === 'ios') ? 55 : 65,
     paddingTop:(Platform.OS === 'ios') ? 0 : 15,
    marginLeft:(Platform.OS === 'ios') ? 43 : 53,
  flex: 0.07,

  },

  line:{
  backgroundColor:'rgba(0,0,0,0)',
    flex: 1,
    borderTopWidth: 1,
    paddingTop:8,
    paddingBottom: 9,

    borderTopColor: '#6BF4B6',
      flexDirection: 'row' ,

   
   },
   avatar:{
  flex: 1,
  width: 60, 
  height: 60, 
  borderRadius: 120/2,



   },
   text:{
  flex: 1.8,
  paddingTop:8,
  paddingLeft:6,

   },
   icon:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',


  flexDirection: 'row' ,

   },
   arrow:{
  flex: 0.2,
  paddingTop:10,

  justifyContent: 'center',
  alignItems: 'center',
   }

   



  });


  export default SelectTrainer;