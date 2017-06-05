'use strict'
import React, { Component } from 'react'

import {
	ListView,
	Modal,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import colors from './../utils/colors'
import MemberSummary from './MemberSummary'
import MemberDetail from './MemberDetail'
import Header from './Header'
import Separator from './Separator'
import { Actions } from 'react-native-router-flux'
import { showMembers, deleteMember, editMember, addMember }  from './../actions'
import { connect } from 'react-redux'
import { store } from './../store.js'
store.dispatch(addMember({firstName:'fName',lastName:'lastName',phoneNo:'96xxxxx',emailId:'kss.dad@gmail.com',role:'default'}))
store.dispatch(addMember({firstName:'First',lastName:'last',phoneNo:'96xxxxx',emailId:'kss.dad@gmail.com',role:'admin'}))

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		marginTop: 20,
	},
	separator: {
    marginLeft: 16,
    height: 1,
    backgroundColor: colors.blueberry_10,
  },
})

class MemberList extends Component {
	constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged,
    });
    this.state = {
      dataSource: dataSource,
    }

		this.renderRow = this.renderRow.bind(this)
		this.renderHeader = this.renderHeader.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
		this.renderSeparator = this.renderSeparator.bind(this)
		this.addNewMember = this.addNewMember.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
  }
	componentDidMount () {
		this.addMemberDummy()
	}
	componentWillReceiveProps (nextProps) {
    if (nextProps.members !== this.props.members) {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(nextProps.members)
			})
    }
  }
  render (){
    return (
			<View style={ styles.container }>
				{ this.renderHeader() }
				<ListView
					style={ styles.listView }
					dataSource={this.state.dataSource}
					renderRow={ this.renderRow }
					renderSeparator={ this.renderSeparator }
				/>

			</View>)
  }
	renderRow (member, section, index) {
		return (
			<MemberSummary
				memberDetails={ member }
				handleSelection={ this.handleSelection }
				index={ index }
			/>
	)
	}
	_rowHasChanged (oldRow, newRow) {
    return oldRow !== newRow
  }
	renderHeader () {
		const { members = [] } = this.props
		const countText = 'You have '+ members.length + ' team members'
		return (
			<View style={ styles.headerContainer }>
				<Header
					subTitle={ countText }
					title={ 'Team Members' }
					actionTitle={ '+' }
					handleEvent={ this.addNewMember }
				/>
			</View>
		)
  }
	renderSeparator () {
  	return (<Separator/>)
	}
	handleSelection (member, index) {
		Actions.detail({ memberDetails: member, handleDelete: this.handleDelete, handleSave: this.handleSave, index })
	}
	addNewMember () {
		Actions.detail( { memberDetails: '', handleSave: this.handleSave })
	}
	handleDelete (index) {
		this.props.deleteMember(Number(index))
	}
	handleSave (member, index) {
		if (index) {
			this.props.editMember(member, Number(index))
		}else{
			this.props.addMember(member)
		}
	}
	addMemberDummy () {
		const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		this.setState({dataSource: dataSource.cloneWithRows(this.props.members)})
	}
}
function mapStateToProps(state) {
    return { members: state.members }
}
function mapDispatchToProps(dispatch) {
  return {
    addMember: (member) => dispatch(addMember(member)),
		editMember: (member, index) => dispatch(editMember(member, index)),
		deleteMember: index => dispatch(deleteMember(index)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberList)

// /module.exports =  MemberList
