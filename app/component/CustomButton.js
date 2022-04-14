import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';
import CustomText from './CustomText';
export default CustomButton = (props) => {

    const { label, onPress, image, containerStyle, textStyle, disable = false } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
            style={[styles.mainContainer, containerStyle]}>
            <CustomText style={[styles.textStyle, textStyle]}>{label}</CustomText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width:wp(33),
        backgroundColor: Config.Theme.COLOR_PRIMARY,
        paddingVertical: hp(2),
        paddingHorizontal: wp(3),
        borderRadius: wp(10),
        shadowOffset: { width: 0, height: 1 },
        shadowColor: Config.Theme.COLOR_BLACK,
        shadowOpacity: 0.3,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: wp(3.5),
        color: Config.Theme.COLOR_WHITE,
        fontFamily: Config.Theme.FONT_BOLD
    }
})