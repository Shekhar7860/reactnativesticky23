/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/25
 *
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { SpringScrollView } from "react-native-spring-scrollview";
import database from '@react-native-firebase/database';

 class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      profession : '',
      age : '',
      city : '',
      country : '',
      key : '',
      buttonText : 'Submit'
    }
  }
  static navigationOptions = {
    title: "Home"
  };
  componentDidMount = () => {
     this.props.navigation.addListener('focus', () => {
      if(this.props.route.params != undefined)
    {
    const {data} = this.props.route.params.data
    this.setState({
      firstName : data[0],
      lastName : data[1],
      age : data[2],
      profession: data[3],
      city : data[4],
      country : data[5],
      key : this.props.route.params.data.key,
      buttonText : 'Update'
    })
  }
  else {
    this.setState({
      buttonText : 'Submit'
    })
  } 
    });
  
    
  }

  submit = () => {
    const {firstName, lastName, profession, age, location, city, country, buttonText} = this.state
    if(firstName && lastName && profession && age && city && country){
    const reference = database().ref('/users');
    if(buttonText == 'Submit')
    {
      reference.push({firstName, lastName, age, profession, city, country})
    }
    else {
reference.child(this.state.key).update({firstName, lastName, age, profession, city, country})
    }
    
  this.props.navigation.navigate('Users')
}
else {
  Alert.alert('Please enter all details')
}
  }

  render() {
   
    return (
      <SpringScrollView>
        <TextInput placeholder="Enter First Name" style={styles.textInput} placeholderTextColor="black" onChangeText={(text) => this.setState({firstName : text})} value={this.state.firstName}/>
         <TextInput placeholder="Enter Last Name" style={styles.textInput} placeholderTextColor="black" onChangeText={(text) => this.setState({lastName : text})} value={this.state.lastName}/>
        <TextInput placeholder="Enter Age" style={styles.textInput} placeholderTextColor="black" onChangeText={(text) => this.setState({age : text})} value={this.state.age}/>
        <TextInput placeholder="Enter Profession" style={styles.textInput} placeholderTextColor="black" onChangeText={(text) => this.setState({profession : text})} value={this.state.profession}/>
        <TextInput placeholder="Enter City" style={styles.textInput} placeholderTextColor="black" onChangeText={(text) => this.setState({city : text})} value={this.state.city}/>
        <TextInput placeholder="Enter Country" style={styles.textInput} placeholderTextColor="black" onChangeText={(text) => this.setState({country : text})} value={this.state.country}/>
        <TouchableOpacity style={styles.button2} onPress={this.submit}>
        <Text style={styles.textColor}>{this.state.buttonText}</Text>
        </TouchableOpacity> 
      </SpringScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button2 :{
    width : '80%', backgroundColor : 'pink', alignSelf : 'center', marginTop : 30, height : 50, alignItems : 'center', justifyContent : 'center'
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center"
  },
  button: { alignItems: "center" },
  textInput : {
    width : '80%', backgroundColor : 'white', alignSelf : 'center', marginTop : 10
  }
});

export default Home;