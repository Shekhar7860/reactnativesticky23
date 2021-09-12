/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/25
 *
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  View,Image
} from 'react-native';
import moment from 'moment';
import {SpringScrollView} from 'react-native-spring-scrollview';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      profession: '',
      age: '',
      city: '',
      country: '',
      key: '',
      selectedDate: moment(new Date()).format('DD/MM/YYYY'),
      buttonText: 'Submit',
      setDatePickerVisibility: false,
    };
  }
  static navigationOptions = {
    title: 'Home',
  };
  componentDidMount = () => {
    this.props.navigation.addListener('focus', () => {
      if (this.props.route.params != undefined) {
        const {data} = this.props.route.params.data;
        this.setState({
          firstName: data[0],
          lastName: data[1],
          age: data[2],
          profession: data[3],
          city: data[4],
          selectedDate: data[5],
          key: this.props.route.params.data.key,
          buttonText: 'Update',
        });
      } else {
        this.setState({
          buttonText: 'Submit',
        });
      }
    });
  };
  showDatePicker = () => {
    this.setState({
      setDatePickerVisibility: true,
    });
  };

  hideDatePicker = () => {
    this.setState({
      setDatePickerVisibility: false,
    });
  };

  handleConfirm = date => {
    this.setState({selectedDate: moment(date).format('DD/MM/YYYY')});
    this.hideDatePicker();
  };
  submit = () => {
    const {
      firstName,
      lastName,
      profession,
      age,
      location,
      city,
      country,
      buttonText,
      selectedDate,
    } = this.state;
    if (firstName && lastName && profession && age && city) {
      const reference = database().ref('/users');
      if (buttonText == 'Submit') {
        reference.push({
          firstName,
          lastName,
          age,
          profession,
          city,
          country,
          selectedDate,
        });
      } else {
        reference
          .child(this.state.key)
          .update({firstName, lastName, age, profession, city, selectedDate});
      }

      this.props.navigation.navigate('Users');
    } else {
      Alert.alert('Please enter all details');
    }
  };

  renderFirstView = () => {

    return (<>
       <View style={{alignSelf : 'flex-start', marginHorizontal : 20}}>
      <Text style={{color : '#95a5a6', marginTop : 10}}>People </Text></View>
      <View style={styles.row}><View style={styles.commonWidth}><Text>Shanmuga Priya </Text></View>
      <View style={styles.commonWidth}><Text >Shanmuga Shiva </Text></View></View>
      <View style={styles.box}>
        <View style={{...styles.row, marginTop : 2}}><TouchableOpacity style={styles.firstView}></TouchableOpacity>
      <View style={styles.secondView}><Text>Shanmuga's WS</Text></View><View style={styles.thirdView}><Text>12 Boards </Text></View></View></View>
      <View style={styles.box}>
        <View style={{...styles.row, marginTop : 2}}><TouchableOpacity style={styles.firstView}></TouchableOpacity>
      <View style={styles.secondView}><Text>Shanmuga's WS</Text></View><View style={styles.thirdView}><Text>6 Boards </Text></View></View></View>
      <View style={styles.box}>
        <View style={{...styles.row, marginTop : 2}}><TouchableOpacity style={styles.firstView}></TouchableOpacity>
      <View style={styles.secondView}><Text>Shanmuga status r...</Text></View><View style={styles.thirdView}><Text>6 Bords</Text></View></View></View>
      <View style={styles.margin10}><Text>Workspace/Document Name/Page</Text>
      <Text>Lorem Ipsum is simply dummy text of the printing and {"\n"}typesetting industry. Lorem Ipsum has been the{"\n"} industry's standard dummy text ever since the 1500s, {"\n"}when an unknown printer took a galley of type and {"\n"}scrambled it to make a type specimen book. It has {"\n"}survived not only five centuries</Text></View><View style={styles.borderBottom}/>
      <View style={styles.margin10}><Text>Works/Table App/Table/View Name</Text>
      <Text style={styles.boldFont}>Opportunity</Text>
      <Text>Lorem Ipsum is simply dummy text of the printing and {"\n"}typesetting industry. Lorem Ipsum has been the{"\n"} industry's standard dummy text ever since the 1500s, {"\n"}when an unknown printer took a galley of type and {"\n"}scrambled it to make a type specimen book. It has {"\n"}survived not only five centuries</Text></View><View style={styles.borderBottom}/></>
      )
  }

  render() {
    return <ScrollableTabView
    style={{ marginTop: 20 }}
    initialPage={0}
    renderTabBar={() => <DefaultTabBar />}
  >
    <Text tabLabel='WorkSpace 4'><View style={styles.container2}>{this.renderFirstView()}</View></Text>
    <Text tabLabel='Tasks 3'>Tasks</Text>
    <Text tabLabel='Messages 6'>Messages</Text>
  </ScrollableTabView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstView : {
    width : '10%'
  },
  secondView : {
    width : '60%'
  },
  thirdView : {
    width : '25%'
  },
  container2 : {
  
  
  }, 
  margin10 : {
    marginHorizontal : 20,
    marginTop : 10  },
  box : {
    marginTop : 20,
    width : '90%',
    borderWidth :1,
    height : 30,
    borderColor : '#bdc3c7',
    marginHorizontal : 20,
    width : 300,
    backgroundColor : '#ecf0f1'
  },
  commonWidth : {
    width : '50%', marginHorizontal : 20
  },
  textColor :{
    color : 'white',fontWeight : '700'
  },
  row : {
    flexDirection : 'row'
  },
  borderBottom : {
    width : '100%',
    marginTop : 20,
    borderBottomWidth : 1,
    borderBottomColor : '#95a5a6'
  },
  button2: {
    width: '80%',
    backgroundColor: '#1e3799',
    alignSelf: 'center',
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {alignItems: 'center'},
  textInput: {
    width: '80%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    height: 50,
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
boldFont : {
  fontWeight : 'bold',
  marginTop : 5
}
});

export default Home;
