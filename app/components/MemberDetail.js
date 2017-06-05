'use strict'
import React, { Component } from 'react'

import {
  Dimensions,
  Image,
	ListView,
	StyleSheet,
  ScrollView,
	Text,
  TextInput,
  TouchableHighlight,
	View,
} from 'react-native'
import colors from './../utils/colors'
import Header from  './Header'
import { Actions } from 'react-native-router-flux'
import RadioButton from 'radio-button-react-native'
import Separator from './Separator'
import Button from './Button'

const width = Dimensions.get('window')

const marginOffset = 16
const memberInfo = {}
//const addMember = { header: [ header ], info: [ 'firstName', 'lastName', emailID, phoneNo ], role: [ regular, admin ], stop }
class MemberDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
            role: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render () {
    return (
      <View style={ styles.container }>
        { this.renderHeader() }
        <View style={ styles.separatorContainer }>
          <Separator/>
        </View>
        <ScrollView>
          { this.renderInfoSection() }
          { this.renderRoleSection() }
          { this.renderActionSection() }
        </ScrollView>
      </View>
    )
  }
  renderHeader () {
    let title = 'Add a Team Member'
    let subTitle = 'Set email, location and role'
    if (this.isEditProfileDetails()) {
      title = 'Edit Team member'
      subTitle = 'Edit contact info, location and role'
    }
    return (
        <View style={ styles.headerContainer }>
          <Header
            subTitle={ subTitle }
            title={ title }
            actionTitle={ 'x' }
            handleEvent={ this.handleClose }
          />
        </View>

  		)
  }
  renderInfoSection () {
    const { firstName = '', lastName = '', emailId = '', phoneNo = '' } = this.props.memberDetails
    return (
      <View style={ styles.infoContainer }>
        <Text style={ styles.sectionTitle }>Info</Text>

          <TextInput
            editable
            value={ this.props.memberDetails.firstName }
            style={ styles.textField }
            onChangeText={(text) => { memberInfo.firstName = text }}
            placeholder='Enter First Name'
            clearButtonMode='while-editing'
          />


          <TextInput
            editable
            value={ this.props.memberDetails.lastName }
            style={ styles.textField }
            onChangeText={(text) => memberInfo.lastName = text }
            placeholder='Enter Last Name'
            clearButtonMode='while-editing'
          />


          <TextInput
            editable
            value={ this.props.memberDetails.emailId }
            style={ styles.textField }
            onChangeText={(text) => memberInfo.emailId = text }
            placeholder='Enter Email Id'
            clearButtonMode='while-editing'
          />
          <TextInput
            editable
            value={ this.props.memberDetails.phoneNo }
            style={ [ styles.textField, { marginBottom: 10 } ] }
            onChangeText={(text) => memberInfo.phoneNo = text }
            placeholder='Enter Phone No'
            clearButtonMode='while-editing'
          />

      </View>
    )
  }

  renderRoleSection () {
    return (
        <View style={ styles.rolesContainer }>
          <Text style={ styles.sectionTitle }>Roles</Text>
          <View style={ styles.radioButtonContainer }>
            <RadioButton
              currentValue={ this.state.role }
              value={ 0 }
              onPress={ this.handleOnPress.bind(this) }
              innerCircleColor='#0080ff'
              outerCircleColor='#0080ff'
              outerCircleSize={14}
              innerCircleSize={6}
              style={ styles.radioButton }

              >
            <Text style={ styles.radioButtonText }>Regular - Can't delete members</Text>
            </RadioButton>
            <Separator separator={ styles.radionButtonSeparator }/>
          </View>
          <View style={ styles.radioButtonContainer }>
             <RadioButton
                currentValue={ this.state.role }
                value={ 1 }
                onPress={ this.handleOnPress.bind(this) }
                innerCircleColor='#0080ff'
                outerCircleColor='#0080ff'
                outerCircleSize={14}
                innerCircleSize={6}
                style={ styles.radioButton }
              >
              <Text style={ styles.radioButtonText }>Admin - Can delete members</Text>
             </RadioButton>
             <Separator separator={ styles.radionButtonSeparator }/>
          </View>
        </View>
    )
  }
  handleOnPress(value){
    this.setState({role:value})
  }
  renderActionSection () {
    return (<View style={ styles.actionContainer }>
      <Button
        name={ 'Save' }
        textStyle={ styles.saveButtonText }
        buttonViewStyle={ styles.saveButtonView }
        handleEvent={ this.handleSave }
      />
      { this.isEditProfileDetails() ? <Button
        name={ 'Delete' }
        textStyle={ styles.deleteButtonText }
        buttonViewStyle={ styles.deleteButtonView }
        handleEvent={ this.handleDelete }
      /> : null }
    </View>)
  }
  handleSave () {
    if (memberInfo.phoneNo && memberInfo.firstName && memberInfo.lastName && memberInfo.emailId) {

    }else{
      alert('Provide all details ')
    }
  }
  handleDelete () {
    alert('Deletion')
  }
  handleClose () {
    Actions.pop()
  }
  isEditProfileDetails () {
    return Boolean(this.props.memberDetails)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textField: {
    marginTop: 12,
    marginLeft: marginOffset,
    marginRight: marginOffset,
    height: 44,
    width: width - 2 * marginOffset,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.blueberry_40,
    fontSize: 12,
  },
  sepator: {
    marginLeft: 16,
    height: 1,
    backgroundColor: colors.blueberry_10,
    marginRight: 16,
  },
  headerContainer: {
      marginTop: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionTitle: {
    marginLeft: marginOffset,
    fontSize: 16,
    marginTop: 10,
  },
  rolesContainer: {
    flex: 1,
  },
  separatorContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: marginOffset,
    marginRight: marginOffset,
    marginBottom: 30,
  },
  deleteButtonView: {
    backgroundColor: 'white',
  },
  deleteButtonText: {
    color: 'red',
  },
  saveButtonView: {
    backgroundColor: '#0080ff',
  },
  saveButtonText: {
    color: 'white',
  },
  radioButtonContainer: {
    marginLeft: marginOffset,
    paddingTop: 16,
    paddingBottom: 16,
  },
  radioButtonText: {
    marginLeft: 10,
    marginTop: 0,
  },
  radionButtonSeparator: {
    marginTop: 10,
    marginLeft: 0,
  }
})

MemberDetail.propTypes = {
  memberDetails: React.PropTypes.object,
}

module.exports = MemberDetail
