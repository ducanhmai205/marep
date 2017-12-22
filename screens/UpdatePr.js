  'use strict';

  import React, { Component } from 'react';

  import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    Keyboard
  } from 'react-native';
  import Dimensions from 'Dimensions';
  import { Ionicons, FontAwesome,Foundation} from '@expo/vector-icons';
  const dismissKeyboard = require('dismissKeyboard');
  class UpdatePr extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        // oldPr:`${this.props.navigation.state.params.Account.trainer.pr_content}`
        text: ''
      };
  }

   updatePr = () => {

      
    console.log('new',this.props.navigation.state.params.Account.type)
    console.log('id',this.props.navigation.state.params.Account.trainer.id)
    console.log('token',this.props.navigation.state.params.Account.trainer.access_token)
      console.log('pr',this.state.text)
  fetch('http://35.185.68.16/api/v1/trainer/updatePR', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
   type  : this.props.navigation.state.params.Account.type,
      id  : this.props.navigation.state.params.Account.trainer.id,
    access_token  : this.props.navigation.state.params.Account.trainer.access_token,
    pr_content: this.state.text
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {

   

           if(responseJson.status === true)
           {
              Alert.alert('ok');
                dismissKeyboard();
                  console.log("updatepr", this.props.navigation.state.params.Account.trainer.pr_content)
              this.props.navigation.navigate('MenuTrainer',{ Account: this.props.navigation.state.params.Account  });
           }
           else{
             
               
                    
                 Alert.alert('Not ok');

              
             }
         
        }).catch((error) => {
          console.error(error);
        });
   
    }

    
    render() {
       const { navigate } = this.props.navigation;
      const {goBack} = this.props.navigation;
      return (
          <ImageBackground  source={require('../img/trainer_detailscreen.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                  <View style={styles.header}>
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={ () => goBack(null)  }>
                            <Ionicons name="ios-arrow-back" size={20} />
                        </TouchableOpacity>
                          
                    </View>
                  </View>
                  <View style={styles.mainContent}>
                        <TextInput
                                            style={{flex:1,fontSize: 15,paddingTop:20,color:'#665586'}} 
                                            underlineColorAndroid='transparent'
                                            returnKeyType="go"
                                            autoCapitalize="none"
                                            multiline={true}
                                            numberOfLines = {7}
                                            maxLength={200}
                                            onSubmitEditing={Keyboard.dismiss}
                                            clearTextOnFocus={false}
                                            placeholder={this.props.navigation.state.params.Account.trainer.pr_content}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.text}
                                      />
                  </View>

                   <View style={styles.nextButton}>
                            <TouchableOpacity style={styles.TouchableOpacity} onPress={this.updatePr}>
                                <Text style={{fontWeight: 'bold'}}> SUBMIT  </Text> 
                          </TouchableOpacity> 
                          </View>


            </View>
          </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
  backgroundImage: {
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          
          backgroundColor:'rgba(0,0,0,0)',
        },
  container:{
    flex: 1,

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
  header:{
    flex: 0.8,
    justifyContent: 'center',
  marginHorizontal: 36
  },
  icon:{
    backgroundColor:'rgba(0,0,0,0)',
    flexDirection: 'row' ,
    justifyContent: 'space-between'

  },
  mainContent:{
  flex: 6,

    marginHorizontal: 50
  },
  });


  export default UpdatePr;