'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList,
  ListView,
  Alert,
  Button
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

class RatingScreen extends Component {
  constructor(props) {

    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      starCount: 3.5,
      data: '',
      dataSource: dataSource.cloneWithRows([]),
      pressIcon: true,
      issue : '',
      Count:'',
      id :`${this.props.navigation.state.params.Account.customer.id}`,
      type: `${this.props.navigation.state.params.Account.type}`,
      access_token :`${this.props.navigation.state.params.Account.customer.access_token}`,
      trainerId: `${this.props.navigation.state.params.id}`,
      name:`${this.props.navigation.state.params.name}`,
      issue:`${this.props.navigation.state.params.issue}`,
      rating: `${this.props.navigation.state.params.rating}`,

    };
  }

  onStarRatingPress(rating, item) {
    item.value = rating;    
    item.isChanged = true;

    var oldDataJson = JSON.stringify(this.state.data);
    var newData = JSON.parse(oldDataJson);
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(newData)
    });

  }



  updateListData(newData){
   this.setState({
    data:newData ,
    dataSource: this.state.dataSource.cloneWithRows(newData)      

  })}



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


    fetch('http://35.185.68.16/api/v1/customer/getTrainerRating', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata

    }).then((response) => response.json())
    .then((responseJson) => {
      // --Duyet cai mang rating
      //Thang nao co value> 0 => setChangable = false;
      //O phan view set enable dua tren changable
      let arraycustomerRating = responseJson.customer_rating;
            arraycustomerRating.forEach(function(item){
                   if(item.value > 0){
                      item.Changable = false
                 }
                   else {
                    item.Changable = true;
                  }
            })

      var content = responseJson;
      this.setState({
        customerRating: content.customer_rating,
        allRate: content.all_rating,

      });
      console.log("json sau khi gan chanable",this.state.customerRating);
      this.updateListData(content.customer_rating);




    })


  }


  TestFunction() {


    let items = this.state.data;

    let formdata = new FormData();
    formdata.append("access_token", this.state.access_token);
    formdata.append("type", this.state.type);
    formdata.append("id", this.state.id);
    formdata.append("trainerId", this.state.trainerId);
    


    items.forEach(function(item){
      if(item.isChanged){
        formdata.append("rating_data["+item.id+"]", item.value);
      }
      else {
        formdata.append("rating_data["+item.id+"]",0);
      }
    })


      console.log(formdata);

    fetch('http://35.185.68.16/api/v1/customer/rating', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,

    }).then((response) => response.json())
    .then((responseJson) => {
     if(responseJson.result === true){

      
       this.props.navigation.navigate('DetailTrainer',{Account: this.props.navigation.state.params.Account, id : this.state.trainerId});
     }else{
      Alert.alert('Error')
     }





    })


  }




  renderViewItem(item) {
    return (   
     <View style={{flexDirection: 'row' ,justifyContent:  'space-between' ,flex:1   }}>
     <Text numberOfLines={1} style={{flex:0.8,fontSize: 13,}}> {item.title} </Text> 
     <StarRating
     disabled={!item.Changable}

     emptyStar={'ios-star-outline'}
     fullStar={'ios-star'}
     halfStar={'ios-star-half'}
     iconSet={'Ionicons'}
     maxStars={5}
     starSize={20}
     rating={item.value}
     selectedStar={(rating) => this.onStarRatingPress(rating,item)}
     />

     </View>
     );
  }



renderRating(ratingValue){

  if(ratingValue > 0){
    return ratingValue

  }else{
    return this.state.Count;

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
   <TouchableOpacity style={{flex: 1,justifyContent: 'center',}} onPress={ () => goBack(null)  } >
   <Ionicons name="ios-arrow-back" size={20} />
   </TouchableOpacity>
   </View>

   <View style={styles.text}>
   <Text style={{fontSize:20,fontWeight: 'bold'  }}> {this.state.name}</Text>

   </View>


   </View>

   <View style={styles.content}>


   <View style={styles.maincontent}>

   <View style={styles.namecontent}>
   <View style={styles.textName}>

   <Text style={{fontSize:11,paddingTop:15}}> {this.state.issue} </Text>
   </View>

   <View style={styles.ratingcontent}  >
   <FlatList
   data={this.state.allRate}
   horizontal={false}

   keyExtractor = {(item, index) => index}
   renderItem={({item}) => 
   <View style={{flexDirection: 'row' ,justifyContent:  'space-between' ,flex:1   }}>
   <Text numberOfLines={1} style={{flex:0.8,fontSize: 13,paddingVertical: 5}}> {item.title} </Text>
   <StarRating
   style={{flex:1,paddingTop:10 }}
   disabled={true}
   emptyStar={'ios-star-outline'}
   fullStar={'ios-star'}
   halfStar={'ios-star-half'}
   iconSet={'Ionicons'}
   maxStars={5}
   starSize={15}
   starColor={'green'}
   rating={item.value}


   />
   <Text style={{fontSize: 10,}}> {item.value} </Text>
   </View>


 }
 />
 </View>
 </View>
 <View
 style={{
  paddingTop:10,
  borderBottomColor: '#24DFA8',
  borderBottomWidth: 2,
}}
/>

<View style={styles.infocontent}>

<ListView
dataSource={this.state.dataSource}
renderRow={(rowData) => this.renderViewItem(rowData)}
contentContainerStyle={{flexDirection: 'column'}}
enableEmptySections={true}
pageSize={this.state.data.length}
/>


</View>

</View>

</View>


</View>
<TouchableOpacity style={styles.nextButton} onPress={()=>{this.TestFunction();}}>

<Text style={{fontWeight: 'bold',justifyContent: 'center',alignItems: 'center',}}>
                                            SUBMIT 

                                            </Text> 


</TouchableOpacity> 

</ImageBackground>

);
}
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
  },
  imageswiper:{
   borderTopRightRadius: 20,
   borderTopLeftRadius: 20,
   height: null,
   width: null,
   flex: 1,
   overflow: 'hidden',
 },
 container:{
  flex: 1,
  marginLeft: 28,
  marginRight:29
},

header:{
  flex: 0.7,
  alignItems: 'center',
  flexDirection: 'row' ,
  

},
text:{
  backgroundColor:'rgba(0,0,0,0)',
  paddingLeft: 90
},
icon:{
  backgroundColor:'rgba(0,0,0,0)',
},
content:{
  flex: 5,
  paddingBottom: 25,
  paddingTop: 5,
  backgroundColor:'rgba(0,0,0,0)',
},
swiper:{
  flex: 1,
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  marginRight: 1
},
wrapperSwiper:{

  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
},
slide1:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#9DD6EB',
  borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  overflow: 'hidden',
},
slide2:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#97CAE5',
  borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  overflow: 'hidden',
},
slide3:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#92BBD9',
  borderTopRightRadius: 13,
  borderTopLeftRadius: 13,
  overflow: 'hidden',
},
maincontent:{
  flex: 3,
  paddingHorizontal: 15,

  
},
namecontent:{
  flex: 1,

},
textName:{
  flex: 1.2,

},
ratingcontent:{
  flex: 2,
  paddingRight: 15,

},
textStart:{
  fontSize: 11,

},
textStarDown:{
  fontSize: 15,
  fontWeight: '700' ,
  paddingTop:5
},
infocontent:{
  flex: 1.7,
  paddingTop: 15
},
infocontent:{
  flex: 1.7,
  paddingTop: 15,

},
nextButton:{
 flex: 1,
 flexDirection: 'row' , 
 position:'absolute',
 bottom: 0,
 height: (Platform.OS === 'ios') ? 70 : 55,
 backgroundColor:'white',
 width: '100%',
 justifyContent: 'center',
 alignItems: 'center',

},
TouchableOpacity:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});


export default RatingScreen;