import React from 'react'
import colors from './../utils/colors'

import {
  Image,
	ListView,
	StyleSheet,
	Text,
  TouchableHighlight,
	View,
} from 'react-native'

const styles = StyleSheet.create({
  subTitle: {
    color: colors.blueberry_40,
    fontSize: 14,
  },
  title: {
    color: colors.blueberry,
    fontSize: 18,
  },
  container: {
    alignItems: 'center',
    height: 85,
  },
  actionTitle: {
    padding: 1,
    width: 44,
    height: 44,
    textAlign: 'center',
    fontSize: 30,
    color: 'blue'
  },
  actionContainer: {
    alignSelf: 'flex-end',
  }
})

const Header = props => {
    return (
      <View style = { styles.container }>
        <View style={ styles.actionContainer }>
          <TouchableHighlight underlayColor="transparent" onPress={ props.handleEvent }>
            <Text style={ styles.actionTitle }>{ props.actionTitle }</Text>
          </TouchableHighlight>
        </View>
        <Text style={ styles.title }>{ props.title }</Text>
        <Text style={ styles.subTitle }>{ props.subTitle }</Text>
      </View>
    )
}

Header.propTypes = {
  actionTitle: React.PropTypes.string.isRequired,
  subTitle: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  handleEvent: React.PropTypes.func.isRequired,
}
module.exports = Header
