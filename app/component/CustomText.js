import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';
export default CustomText = (props) => {
    const { style, numberofLine } = props;
    return (
        <Text numberOfLines={numberofLine} style={[styles.mainFont, style]}>{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    mainFont: {
        fontFamily: Config.Theme.FONT_REGULAR,
        color: Config.Theme.COLOR_GRAY
    }
})