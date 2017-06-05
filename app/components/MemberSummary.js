'use strict'
import React, { Component } from 'react'

import {
  Image,
	ListView,
	StyleSheet,
	Text,
  TouchableHighlight,
	View,
} from 'react-native'
import colors from './../utils/colors'

const styles = StyleSheet.create({
	container: {
		flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
	},
	image: {
    marginLeft: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: colors.blueberry_40,
  },
  summaryContainer: {
    flex: 1,
    padding: 10,
  },
  emailID: {
    color: colors.blueberry_40,
		fontSize: 14,
  },
  name: {
    color: colors.blueberry,
		fontSize: 14,
  },
  phoneNo: {
    color: colors.blueberry_40,
		fontSize: 14,
  },
})


class MemberSummary extends Component {
	constructor(props) {
    super(props)
    this.handleSelection = () => this.props.handleSelection(this.props.memberDetails, this.props.index)
  }
  render () {
    const { firstName = '', lastName = '', role = '', emailId = '', phoneNo = '' } = this.props.memberDetails
    const adminText = role === 'admin' ? '(admin)' : ''
    return (
      <TouchableHighlight underlayColor="transparent" onPress={ this.handleSelection }>
        <View style={ styles.container }>
          <Image source={ { uri: 'person' } } style={ styles.image } />
          <View style={ styles.summaryContainer }>
            <Text style={ styles.name }>{ firstName + ' ' + lastName + adminText }</Text>
            <Text style={ styles.phoneNo }>{ phoneNo }</Text>
            <Text style={ styles.emailID }>{ emailId }</Text>
          </View>
        </View>
      </TouchableHighlight>
    )

  }

}
MemberSummary.propTypes = {
  handleSelection: React.PropTypes.func.isRequired,
  index: React.PropTypes.func.isRequired,
	memberDetails: React.PropTypes.object.isRequired,
}
module.exports =  MemberSummary
