/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2019/2/23
 *
 */

import React from 'react';
import {StickyForm} from './StickyForm';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import type {IndexPath} from '../../src';
import database from '@react-native-firebase/database';
export class StickyFormExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        'First Name',
        'Last Name',
        'Age',
        'Proffession',
        'City',
        'Date',
        'Actions',
      ],
      data: [
        {
          sectionTitle: 'Data',
          items: [],
        },
      ],
    };
  }
  static navigationOptions = {
    title: 'StickyFormExample',
  };

  _list: StickyForm;
  componentDidMount = () => {
    database()
      .ref('/users')
      .once('value')
      .then(dataSnapshot => {
        let newdata = dataSnapshot.val();
        let updatedData = [...this.state.data];

        if (dataSnapshot.val()) {
          let items = Object.values(newdata);

          for (let i in items) {
            updatedData[0].items.push({
              key: Object.keys(dataSnapshot.val())[i],
              title: parseInt(i) + parseInt(1),
              data: [
                items[i].firstName,
                items[i].lastName,
                items[i].age,
                items[i].profession,
                items[i].city,
                items[i].selectedDate,
              ],
            });
          }
          this.setState({data: updatedData});
        }
      });
  };

  editDelete = (param, path) => {
    if (param == 'delete') {
      let key = this.state.data[0].items[path.row].key;
      database().ref('/users').child(key).remove();
      var array = [...this.state.data]; // make a separate copy of the array
      array[0].items.splice(path.row, 1);
      this.setState({data: array});
    } else {
      let data = this.state.data[0].items[path.row];
      this.props.navigation.navigate('Form', {data});
    }
  };
  render() {
    const {data} = this.state;
    return (
      <StickyForm
        renderHeader={this._renderHeader}
        style={{backgroundColor: 'white'}}
        contentStyle={{alignItems: 'flex-start', width: '200%'}}
        data={this.state.data}
        extraData={this.state}
        ref={ref => (this._list = ref)}
        heightForSection={() => 0}
        renderSection={this._renderSection}
        heightForIndexPath={() => 50}
        renderIndexPath={this._renderItem}
        onRefresh={() => {
          setTimeout(() => this._list.endRefresh(), 2000);
        }}
        onLoading={() => {
          setTimeout(() => this._list.endLoading(), 2000);
        }}
      />
    );
  }

  _renderHeader = () => {
    return (
      <View style={{height: 80, flexDirection: 'row'}}>
        <View style={styles.text}>
          <Text>Sr.No</Text>
        </View>
        {this.state.titles.map((title, index) => (
          <View
            style={{
              ...styles.headerText,
              backgroundColor:
                title == 'First Name'
                  ? '#e67e22'
                  : title == 'Last Name'
                  ? '#c0392b'
                  : title == 'Age'
                  ? '#8e44ad'
                  : title == 'Proffession'
                  ? '#27ae60'
                  : title == 'City'
                  ? '#eccc68'
                  : title == 'Date'
                  ? '#eb3b5a'
                  : title == 'Actions'
                  ? '#95a5a6'
                  : 'white',
            }}
            key={index}>
            <Text>{title}</Text>
          </View>
        ))}
      </View>
    );
  };

  _renderSection = (section: number) => {
    const {data} = this.state;
    const sectionTitle = data[section].sectionTitle;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgray',
          justifyContent: 'center',
        }}>
        <View></View>
      </View>
    );
  };

  returnTitle = val => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    return pattern.test(val);
  };
  _renderItem = (path: IndexPath) => {
    const {data} = this.state;
    const item = data[path.section].items[path.row];
    return (
      <View style={styles.row}>
        <View style={styles.titleText}>
          <Text>{item ? item.title : null}</Text>
        </View>
        {item
          ? item.data.map((title, index) => (
              <View style={styles.text} key={index}>
                {this.returnTitle(title) == true ? (
                  <Text
                    onPress={() => Linking.openURL(title)}
                    style={{textDecorationLine: 'underline', color: 'blue'}}>
                    {title}
                  </Text>
                ) : (
                  <Text>{title}</Text>
                )}
              </View>
            ))
          : null}
        <View style={styles.text}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.editDelete('edit', path)}>
              <Image
                style={{width: 20, marginLeft: 5, height: 20}}
                source={require('./images/edit.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.editDelete('delete', path)}>
              <Image
                style={{width: 20, marginLeft: 5, height: 20}}
                source={require('./images/delete.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EEE',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
  titleText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#EEE',
  },
});
