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
import { store } from './store.js'
import { Provider } from 'react-redux'

class TeamManagementApp extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
           <Scene key="root">
             <Scene key="list" component={ MemberList } title="Members" initial hideNavBar />
             <Scene key="detail" component={ MemberDetail } title="Member Details" />
           </Scene>
         </Router>
       </Provider>
    )
  }
}

export default TeamManagementApp
