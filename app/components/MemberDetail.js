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
const regular = 'regular'
const admin = 'admin'
const roleRegular = 0
const roleAdmin = 1
//const addMember = { header: [ header ], info: [ 'firstName', 'lastName', emailID, phoneNo ], role: [ regular, admin ], stop }
class MemberDetail extends Component {
  constructor (props) {
    super(props)
    const { firstName = '', lastName = '', emailId = '', phoneNo = '', role = 'regular' } = props.memberDetails
    this.state = {
            role: role === regular ? roleRegular : roleAdmin,
            firstName,
            lastName,
            phoneNo,
            emailId,
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
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
            value={ this.state.firstName }
            style={ styles.textField }
            onChangeText={ (text) => this.setState ({ firstName: text }) }
            placeholder='Enter First Name'
            clearButtonMode='while-editing'
          />


          <TextInput
            editable
            value={ this.state.lastName }
            style={ styles.textField }
            onChangeText={(text) => this.setState ({ lastName: text }) }
            placeholder='Enter Last Name'
            clearButtonMode='while-editing'
          />


          <TextInput
            editable
            value={ this.state.emailId }
            style={ styles.textField }
            onChangeText={(text) => this.setState ({ emailId: text }) }
            placeholder='Enter Email Id'
            clearButtonMode='while-editing'
          />
          <TextInput
            editable
            value={ this.state.phoneNo }
            style={ [ styles.textField, { marginBottom: 10 } ] }
            onChangeText={(text) => this.setState ({ phoneNo: text }) }
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
              onPress={ this.handleOnPress }
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
                onPress={ this.handleOnPress }
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
    debugger
    this.setState({ role: value })
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

    if (this.state.phoneNo && this.state.firstName && this.state.lastName && this.state.emailId) {
      this.props.handleSave({role: this.state.role === roleAdmin ? admin : regular ,phoneNo: this.state.phoneNo, firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId}, this.props.index )
      Actions.pop()
    }else{
      alert('Provide all details')
    }
  }
  handleDelete () {
    this.props.handleDelete && this.props.handleDelete(this.props.index)
    Actions.pop()
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
  index: React.PropTypes.object,
  handleDelete: React.PropTypes.func,
  handleSave: React.PropTypes.func,
}

module.exports = MemberDetail
