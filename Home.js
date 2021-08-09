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
} from 'react-native';
import moment from 'moment';
import {SpringScrollView} from 'react-native-spring-scrollview';
import database from '@react-native-firebase/database';
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

  render() {
    return (
      <SpringScrollView>
        <TextInput
          selectTextOnFocus={true}
          placeholder="Enter First Name"
          style={styles.textInput}
          placeholderTextColor="black"
          onChangeText={text => this.setState({firstName: text})}
          value={this.state.firstName}
        />
        <TextInput
          selectTextOnFocus={true}
          placeholder="Enter Last Name"
          style={styles.textInput}
          placeholderTextColor="black"
          onChangeText={text => this.setState({lastName: text})}
          value={this.state.lastName}
        />
        <TextInput
          selectTextOnFocus={true}
          placeholder="Enter Age"
          style={styles.textInput}
          placeholderTextColor="black"
          onChangeText={text => this.setState({age: text})}
          value={this.state.age}
        />
        <TextInput
          selectTextOnFocus={true}
          placeholder="Enter Profession"
          style={styles.textInput}
          placeholderTextColor="black"
          onChangeText={text => this.setState({profession: text})}
          value={this.state.profession}
        />
        <TextInput
          selectTextOnFocus={true}
          placeholder="Enter City"
          style={styles.textInput}
          placeholderTextColor="black"
          onChangeText={text => this.setState({city: text})}
          value={this.state.city}
        />
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={this.showDatePicker}>
          <Text style={{...styles.textInput, paddingTop: 15}}>
            {this.state.selectedDate}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={this.state.setDatePickerVisibility}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        />
        <TouchableOpacity style={styles.button2} onPress={this.submit}>
          <Text style={styles.textColor}>{this.state.buttonText}</Text>
        </TouchableOpacity>
      </SpringScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button2: {
    width: '80%',
    backgroundColor: 'pink',
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
});

export default Home;
