import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MemberList from './components/MemberList'
import MemberDetail from './components/MemberDetail'
import { Router, Scene } from 'react-native-router-flux'
import configureStore from './store.js'
const store = configureStore()
import { Provider } from 'react-redux'

class TeamManagementApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
           <Scene key="root">
             <Scene key="list" component={ MemberList } title="Members" initial hideNavBar />
             <Scene key="detail" component={ MemberDetail } title="Member Details"  />
           </Scene>
         </Router>
       </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TeamManagementApp
