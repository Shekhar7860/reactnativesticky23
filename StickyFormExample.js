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
import Draggable from 'react-native-draggable';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Animated,
  TextInput,
} from 'react-native';
import type {IndexPath} from '../../src';
import {Dimensions} from 'react-native';
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
      opacity: 1,
      showHeader: false,
      search: '',
      text: '',
      backgroundColor: '#dfe6e9',
      rowWidth: 300,
      rowWidth2: 300,
      headerWidth: Dimensions.get('window').width,
      secondData: [],
      data: [
        {
          sectionTitle: 'Data',
          items: [],
        },
      ],
      data3: [
        {
          sectionTitle: '基本参数',
          items: [],
        },
      ],
    };
    for (let i = 0; i < props.groupCount; ++i) {
      this._groupRefs.push(React.createRef());
    }
    if (props.initialContentOffset) {
      this._contentOffsetY = props.initialContentOffset.y;
    }
    this._nativeOffset = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      ...this.props.onNativeContentOffsetExtract,
    };
    this._offset = this._nativeOffset.y;
  }

  _list: StickyForm;
  componentDidMount = () => {
    let updatedData = [...this.state.data];
    // database()
    //   .ref('/users')
    //   .once('value')
    //   .then(dataSnapshot => {
    //     let newdata = dataSnapshot.val();

    //     if (dataSnapshot.val()) {
    //       let items = Object.values(newdata);
    //       for (let i in items) {
    //         updatedData[0].items.push({
    //           key: Object.keys(dataSnapshot.val())[i],
    //           title: parseInt(i) + parseInt(1),
    //           data: [
    //             items[i].firstName,
    //             items[i].lastName,
    //             items[i].age,
    //             items[i].profession,
    //             items[i].city,
    //             items[i].selectedDate,
    //           ],
    //         });
    //       }
    //       this.setState({data: updatedData, secondData: updatedData});
    //     }
    //   });

    for (let i = 1; i < 5000; i++) {
      updatedData[0].items.push({
        key: i,
        title: 'item',
        data: ['shekhar', 'chugh', 29, 'developer', 'patiala', '20/08/1992'],
      });
    }

    this.setState({data3: updatedData, secondData: updatedData});
  };

  searchFilterFunction = text => {
    let updatedData = [...this.state.data];
    let secondData = [...this.state.secondData];
    const s = [...this.state.secondData];
    if (text != '') {
      let newData = updatedData[0].items.filter(function (item) {
        let itemData = item.data[0]
          ? item.data[0].toUpperCase() + item.data[1].toUpperCase()
          : ''.toUpperCase();
        //  console.log('d', itemData, text)
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      updatedData[0].items = newData;
      this.setState({data: updatedData});
    } else {
      let updatedData2 = [...this.state.data];
      database()
        .ref('/users')
        .once('value')
        .then(dataSnapshot => {
          let newdata = dataSnapshot.val();
          let updatedData = [...this.state.data];
          if (dataSnapshot.val()) {
            let items = Object.values(newdata);
            for (let i in items) {
              this.state.data[0].items.push({
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
            this.setState({data: this.state.data});
          }
        });
    }
  };

  touchBegin = ({
    nativeEvent: {
      contentOffset: {x, y},
    },
  }) => {
    // this.setState({
    //   backgroundColor: 'rgba(52, 52, 52, 0.8)',
    // });
    this.setState({
      opacity: 0.5,
    });
    if (x >= 100) {
      this.setState({rowWidth: 300 - x});
    } else {
      this.setState({opacity: 1});
      this.setState({rowWidth: 300});
    }
  };
  touchEnd = x => {
    //  this.setState({opacity : 1});
    //  console.log('row', x)
    //  if(x == undefined){
    //    console.log('sss')
    //    this.setState({rowWidth : 300})
    //  }
  };

  editDelete = (param, path) => {
    if (param == 'delete') {
      // let key = this.state.data[0].items[path.row].key;
      // database().ref('/users').child(key).remove();
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
        onScroll={this.touchBegin}
        renderHeader={this._renderHeader}
        style={{backgroundColor: 'white'}}
        contentStyle={{alignItems: 'flex-start', width: '200%'}}
        data={this.state.data3}
        ref={ref => (this._list = ref)}
        renderSection={this._renderSection}
        heightForIndexPath={() => 50}
        renderFooter={this._renderFooter}
        renderIndexPath={this._renderItem}
        rowWidth={this.state.rowWidth}
        onScrollEndDrag={this.touchEnd}
        // onScroll={this._onScroll}
        onRefresh={() => {
          setTimeout(() => this._list.endRefresh(), 2000);
        }}
        onLoading={() => {
          setTimeout(() => this._list.endLoading(), 2000);
        }}
      />
    );
  }

  hideHeader = () => {
    this.setState({showHeader: !this.state.showHeader});
  };
  goBack = () => {
    props.navigation.goBack();
  };

  showHeader = () => {
    this.setState({showHeader: true});
  };

  _renderHeader = () => {
    const transform = [];
    const zIndex = 9999;
    return (
      <TouchableOpacity style={{...styles.row}}>
        <View
          opacity={this.state.opacity}
          style={{
            ...styles.titleText,
            minWidth: 180,
            backgroundColor:
              this.state.rowWidth == 300
                ? '#dfe6e9'
                : this.state.backgroundColor,
            width: this.state.rowWidth,
          }}>
          <Text>Sr. no</Text>
        </View>

        {this.state.titles.map((title, index) => (
          <View
            style={{
              ...styles.headerText,
              width: 80,
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
      </TouchableOpacity>
    );
  };
  _renderHeader2 = () => {
    const transform = [];
    const zIndex = 9999;
    return (
      <View>
        <View style={{...styles.toolbar, width: this.state.headerWidth}}>
          {!this.state.showHeader ? (
            <>
              <TouchableOpacity onPress={() => this.goBack()}>
                <Image
                  style={{
                    width: 30,
                    marginLeft: 5,
                    height: 30,
                    tintColor: 'white',
                  }}
                  source={require('./images/back.png')}></Image>
              </TouchableOpacity>
              <Text style={styles.toolbarTitle}>User</Text>
              <TouchableOpacity onPress={() => this.showHeader()}>
                <Image
                  style={{
                    width: 30,
                    marginRight: 15,
                    height: 30,
                    tintColor: 'white',
                  }}
                  source={require('./images/search.png')}></Image>
              </TouchableOpacity>
            </>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'white',
                width: '95%',
                alignSelf: 'center',
                marginLeft: 5,
              }}>
              <Image
                style={{width: 15, margin: 14, height: 15, tintColor: 'white'}}
                source={require('./images/search.png')}></Image>
              <View style={{width: '70%'}}>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={text => this.searchFilterFunction(text)}
                  underlineColorAndroid="transparent"
                  placeholder="Search Here"
                  placeholderTextColor="white"
                />
              </View>
              <TouchableOpacity onPress={() => this.hideHeader()}>
                <Image
                  style={{
                    width: 15,
                    margin: 14,
                    height: 15,
                    tintColor: 'white',
                  }}
                  source={require('./images/close.png')}></Image>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  _renderFooter = () => {
    const transform = [];
    const zIndex = 9999;
    return (
      <Animated.View style={{height: 50, position: 'absolute', bottom: 20}}>
        <TouchableOpacity
          style={{
            marginRight: 80,
            alignSelf: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            backgroundColor: '#00cec9',
            borderRadius: 25,
            justifyContent: 'center',
          }}
          onPress={() => this.props.navigation.navigate('Form')}>
          <Text style={{color: 'white', fontSize: 20}}>+</Text>
        </TouchableOpacity>
      </Animated.View>
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
        }}></View>
    );
  };

  goToDetail = item => {
    let user = {
      firstName: item.data[0],
      lastName: item.data[1],
      age: item.data[2],
      profession: item.data[3],
      date: item.data[4],
    };
    this.props.navigation.navigate('User', {user});
  };
  returnTitle = str => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };
  _renderItem = (path: IndexPath) => {
    const {data} = this.state;
    const item = data[path.section].items[path.row];
    return (
      <TouchableOpacity style={{...styles.row}}>
        <View
          opacity={this.state.opacity}
          style={{
            ...styles.titleText,
            minWidth: 180,
            backgroundColor:
              this.state.rowWidth == 300
                ? '#dfe6e9'
                : this.state.backgroundColor,
            width: this.state.rowWidth,
          }}>
          <Text>{item ? item.title : null}</Text>
        </View>

        {item
          ? item.data.map((title, index) => (
              <View style={{...styles.text}} key={index}>
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
            <TouchableOpacity onPress={() => this.goToDetail(item)}>
              <Image
                style={{width: 20, marginLeft: 5, height: 20}}
                source={require('./images/view.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    height: 50,
    flexDirection: 'row',
  },
  headerText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
  titleText: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,

    borderWidth: StyleSheet.hairlineWidth,
  },
  toolbar: {
    backgroundColor: '#1e3799',
    paddingBottom: 10,
    flexDirection: 'row',
    paddingTop: 20, //Step 1
  },
  toolbarButton: {
    //Step 2
    color: '#fff',
    textAlign: 'center',
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20, //Step 3
  },
});
