import React from 'react'
import {
	StyleSheet,
	View
} from 'react-native'
import colors from './../utils/colors'

const styles = StyleSheet.create({
	separator: {
		marginLeft: 16,
		marginRight: 16,
		height: 1,
		backgroundColor: colors.blueberry_10
	}
})
const Separator = props => <View style={ [ styles.separator, props.separator ] } />

Separator.propTypes = { separator: View.propTypes.style }

module.exports = Separator
