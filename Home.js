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
    return (<View>
      <Text style={{color : '#95a5a6', marginTop : 10}}>People </Text>
      <View style={styles.row}><View style={styles.commonWidth}><Text>Shanmuga Priya </Text></View>
      <View style={styles.commonWidth}><Text >Shanmuga Shiva </Text></View></View>
      <View style={styles.box}><View style={styles.row}><TouchableOpacity style={styles.firstView}></TouchableOpacity>
      <View style={styles.secondView}><Text>Shanmuga's Ws</Text></View><View style={styles.thirdView}><Text>12 Boards </Text></View></View></View></View>)
  }

  render() {
    return <ScrollableTabView
    style={{ marginTop: 20 }}
    initialPage={1}
    renderTabBar={() => <DefaultTabBar />}
  >
    <Text tabLabel='WorkSpace 4'>{this.renderFirstView()}</Text>
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
    width : '15%'
  },
  secondView : {
    width : '65%'
  },
  thirdView : {
    width : '20%'
  },
  box : {
    marginTop : 10,
    width : '90%',
    borderWidth :1,
    height : 30,
    borderColor : '#bdc3c7',
    alignSelf : 'center',
    backgroundColor : '#ecf0f1'
  },
  commonWidth : {
    width : '50%'
  },
  textColor :{
    color : 'white',fontWeight : '700'
  },
  row : {
    flexDirection : 'row'
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
});

export default Home;
