import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const User = (props) => {
	const [user, setUser] = useState('')
useEffect(() => {
    if(props.route.params){
    	setUser(props.route.params.user)
    }
  }, []);
	  
  const goBack = () => {
    props.navigation.goBack()
  }

	
    const {firstName, lastName, age, profession, city, date} = user
	return (
		<View style={{flex : 1}}>
		
	<View style={styles.toolbar}>
       <TouchableOpacity onPress={() => goBack()}>
                    <Image style={{width:30,marginLeft:5,  height:30, tintColor : 'white'}}source={require('./images/back.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.toolbarTitle}>User</Text>
                    <TouchableOpacity onPress={() => goBack()}>
                    <Image style={{width:30,marginLeft:5,  height:30}}></Image>
                    </TouchableOpacity>
                </View>
				<View style={styles.container}>
		<View style={styles.row}>
		<View style={styles.firstWidth}>
		<Text>First Name</Text>
		</View>
		<View style={styles.secondWidth}>
		<Text>:</Text>
		</View>
		<View style={styles.thirdWidth}>
		<Text>{firstName}</Text>
		</View>
		</View>
		<View style={styles.row}>
		<View style={styles.firstWidth}>
		<Text>Last Name</Text>
		</View>
		<View style={styles.secondWidth}>
		<Text>:</Text>
		</View>
		<View style={styles.thirdWidth}>
		<Text>{lastName}</Text>
		</View>
		</View>
		<View style={styles.row}>
		<View style={styles.firstWidth}>
		<Text>Age</Text>
		</View>
		<View style={styles.secondWidth}>
		<Text>:</Text>
		</View>
		<View style={styles.thirdWidth}>
		<Text>{age}</Text>
		</View>
		</View>
		<View style={styles.row}>
		<View style={styles.firstWidth}>
		<Text>Profession</Text>
		</View>
		<View style={styles.secondWidth}>
		<Text>:</Text>
		</View>
		<View style={styles.thirdWidth}>
		<Text>{profession}</Text>
			</View>
		</View>
		<View style={styles.row}>
		<View style={styles.firstWidth}>
		<Text>Date</Text>
		</View>
<View style={styles.secondWidth}>
		<Text>:</Text>
		</View>
		<View style={styles.thirdWidth}>
		<Text>{date}</Text>
		</View>
		</View>
		</View>
		</View>
		)
}

export default User;

const styles = StyleSheet.create({
  container: {
   flex : 1,
   marginTop : 20,
   width : '80%',
   alignSelf : 'center'
  },
  firstWidth : {
  	width : '35%'
  },
  secondWidth : {
  	width : '10%'
  },
   thirdWidth : {
  	width : '35%'
  },
  row : {
  	marginBottom : 20,
  	flexDirection : 'row',
  	alignItems : 'center',
  	justifyContent : 'space-between'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  toolbar:{
    backgroundColor:'#1e3799',
    paddingBottom:10,
    flexDirection:'row' ,
    paddingTop:20   //Step 1
},
toolbarButton:{           //Step 2
    color:'#fff',
    textAlign:'center'
},
toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1,
    fontSize:20                //Step 3
},
});
