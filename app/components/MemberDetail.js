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
import { connect } from 'react-redux'
import { showMembers, deleteMember, editMember, addMember }  from './../actions'
import { store } from './../store.js'
const width = Dimensions.get('window')

const marginOffset = 16
const regular = 'regular'
const admin = 'admin'
const roleRegular = 0
const roleAdmin = 1
class MemberDetail extends Component {
	constructor (props) {
		super(props)
		const { firstName = '', lastName = '', emailId = '', phoneNo = '', role = 'regular' } = props.memberDetails
		// this.role =  role === regular ? roleRegular : roleAdmin
		this.state = {
			role: role === regular ? roleRegular : roleAdmin
		}
		this.firstName = firstName
		this.lastName = lastName
		this.phoneNo = phoneNo
		this.emailId = emailId
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
		return (
			<View style={ styles.infoContainer }>
				<Text style={ styles.sectionTitle }>Info</Text>

					<TextInput
						editable
						defaultValue={ this.firstName }
						style={ styles.textField }
						onChangeText={ text => { this.firstName = text } }
						placeholder='Enter First Name'
						clearButtonMode='while-editing'
					/>
					<TextInput
						editable
						defaultValue={ this.lastName }
						style={ styles.textField }
						onChangeText={ text => { this.lastName = text } }
						placeholder='Enter Last Name'
						clearButtonMode='while-editing'
					/>

					<TextInput
						editable
						defaultValue={ this.emailId }
						style={ styles.textField }
						onChangeText={ text => { this.emailId = text } }
						placeholder='Enter Email Id'
						clearButtonMode='while-editing'
					/>
					<TextInput
						editable
						defaultValue={ this.phoneNo }
						style={ [ styles.textField, { marginBottom: 10 } ] }
						onChangeText={ text => { this.phoneNo = text } }
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
	handleOnPress (value) {
		this.setState({ role: value })
	}
	renderActionSection () {
		const containerStyle = this.isEditProfileDetails() ? styles.actionContainer : [ styles.actionContainer, { justifyContent: 'flex-end' } ]
		return (<View style={ containerStyle }>

			{ this.isEditProfileDetails() ? <Button
				name={ 'Delete' }
				textStyle={ styles.deleteButtonText }
				buttonViewStyle={ styles.deleteButtonView }
				handleEvent={ this.handleDelete }
			/> : null }
			<Button
				name={ 'Save' }
				textStyle={ styles.saveButtonText }
				buttonViewStyle={ styles.saveButtonView }
				handleEvent={ this.handleSave }
			/>
		</View>)
	}
	handleSave () {
		if (this.phoneNo && this.firstName && this.lastName && this.emailId) {
			const member = {role: this.state.role === roleAdmin ? admin : regular ,phoneNo: this.phoneNo, firstName: this.firstName, lastName: this.lastName, emailId: this.emailId}
			if (this.isEditProfileDetails() && this.props.index >= 0) {
				this.props.editMember(member, this.props.index)
			}else{
				this.props.addMember(member)
			}
			Actions.pop()
		}else{
			alert('Provide all details')
		}
	}
	handleDelete () {
		this.props.deleteMember(this.props.index)
		Actions.pop()
	}
	handleClose () {
		Actions.pop()
	}
	isEditProfileDetails () {
		return Object.keys(this.props.memberDetails).length > 0
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
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
		fontSize: 12
	},
	sepator: {
		marginLeft: 16,
		height: 1,
		backgroundColor: colors.blueberry_10,
		marginRight: 16
	},
	headerContainer: {
		marginTop: 20
	},
	infoContainer: {
		flex: 1,
		flexDirection: 'column'
	},
	sectionTitle: {
		marginLeft: marginOffset,
		fontSize: 16,
		marginTop: 10
	},
	rolesContainer: {
		flex: 1
	},
	separatorContainer: {
		marginTop: 10,
		marginBottom: 10
	},
	actionContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		marginLeft: marginOffset,
		marginRight: marginOffset,
		marginBottom: 30
	},
	deleteButtonView: {
		backgroundColor: 'white'
	},
	deleteButtonText: {
		color: 'red'
	},
	saveButtonView: {
		backgroundColor: '#0080ff'
	},
	saveButtonText: {
		color: 'white'
	},
	radioButtonContainer: {
		marginLeft: marginOffset,
		paddingTop: 16,
		paddingBottom: 16
	},
	radioButtonText: {
		marginLeft: 10,
		marginTop: 0
	},
	radionButtonSeparator: {
		marginTop: 10,
		marginLeft: 0
	}
})

MemberDetail.propTypes = {
	memberDetails: React.PropTypes.object,
	index: React.PropTypes.number
}
function mapDispatchToProps (dispatch) {
	return {
		addMember: (member) => dispatch(addMember(member)),
		editMember: (member, index) => dispatch(editMember(member, index)),
		deleteMember: index => dispatch(deleteMember(index))
	}
}
export default connect(() => { return {} }, mapDispatchToProps)(MemberDetail)
