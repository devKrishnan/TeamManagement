import React from 'react'
import {
	StyleSheet,
  Text,
  TouchableHighlight,
	View
} from 'react-native'
import colors from './../utils/colors'

const styles = StyleSheet.create({
	buttonView: {
    marginTop: 10,
    height: 44,
    width: 90,
    backgroundColor: colors.blueberry_10,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.blueberry_40,
    borderRadius: 5,
  },
  text: {
    fontSize: 12,
    alignSelf: 'center'
  }
})

const Button = props => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={ props.handleEvent }>
      <View style={ [ styles.buttonView, props.buttonViewStyle ] }>
        <Text style={ [ styles.text, props.textStyle ] }>{ props.name }</Text>
      </View>
    </TouchableHighlight>)
}
Button.propTypes = {
  buttonViewStyle: React.PropTypes.number.isRequired,
  textStyle: React.PropTypes.number.isRequired,
  handleEvent: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
}
module.exports = Button
