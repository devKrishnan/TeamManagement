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
import { addMember }  from './../actions'
import { connect } from 'react-redux'
import { store } from './../store.js'
store.dispatch(addMember({firstName:'fName',lastName:'lastName',phoneNo:'96xxxxx',emailId:'kss.dad@gmail.com',role:'admin'}))
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
    this.dataSource = new ListView.DataSource({
      rowHasChanged: this._rowHasChanged,
    })
		this.renderRow = this.renderRow.bind(this)
		this.renderHeader = this.renderHeader.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
		this.renderSeparator = this.renderSeparator.bind(this)
		this.addMember = this.addMember.bind(this)
  }

  render (){
		const dataSource = this.dataSource.cloneWithRows(this.props.members)
    return (
			<View style={ styles.container }>
				{ this.renderHeader() }
				<ListView
					style={ styles.listView }
					dataSource={ dataSource }
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
					handleEvent={ this.addMember }
				/>
			</View>
		)
  }
	renderSeparator () {
  	return (<Separator/>)
	}
	handleSelection (member, index) {
		Actions.detail({ memberDetails: member, index: Number(index) })
	}
	addMember () {
		Actions.detail( { memberDetails: {} })
	}
}
function mapStateToProps(state) {
    return { members: state.members }
}

export default connect(mapStateToProps)(MemberList)
