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
			members: []
    }

		this.renderRow = this.renderRow.bind(this)
		this.renderHeader = this.renderHeader.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
		this.renderSeparator = this.renderSeparator.bind(this)
		this.addMember = this.addMember.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
  }
	componentDidMount () {
		this.addMemberDummy()
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
		const countText = 'You have '+ this.state.members.length + ' team members'
		return (
			<View style={ styles.headerContainer }>
				<Header
					subTitle={ countText }
					title={ 'Team Members' }
					actionTitle={ '+' }
					handleEvent={ this.addMember }
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
	addMember () {
		Actions.detail( { memberDetails: '', handleSave: this.handleSave })
	}
	handleDelete (index) {
		const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		let { members } = this.state
		members.splice(index, 1)
		this.setState({
			members,
			dataSource: dataSource.cloneWithRows(members)
		})
	}
	handleSave (member, index) {
		alert(index)
		if (index) {
			const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
			let { members } = this.state
			members[index] = member
			this.setState({
				members,
				dataSource: dataSource.cloneWithRows(members)
			})
		}else{
			const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
			const list = this.state.members.concat([member])
			this.setState({
				members: list,
				dataSource: dataSource.cloneWithRows(list),
			})
		}
	}
	addMemberDummy () {
		const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const list = [{firstName:'fName',lastName:'lastName',phoneNo:'96xxxxx',emailId:'kss.dad@gmail.com',role:'default'},{firstName:'First',lastName:'last',phoneNo:'96xxxxx',emailId:'kss.dad@gmail.com',role:'admin'}]
		this.setState({members: list, dataSource: dataSource.cloneWithRows(list)})
	}
}

module.exports =  MemberList
