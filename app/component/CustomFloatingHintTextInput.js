import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';

const CustomFloatingHintTextInput = (props) => {

    const { label, value, onChangeText, containerStyles, customLabelStyles, labelStyle, inputStyle, maxLength, keyboardType, autoCapitalize } = props

    return (
        <FloatingLabelInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            containerStyles={{ ...styles.textInputContainerStyle, ...containerStyles }}
            customLabelStyles={styles.customLabelStyle}
            labelStyles={styles.labelStyle}
            inputStyles={styles.inputStyle}
            maxLength={maxLength}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
        />
    );
}

const styles = StyleSheet.create({
    textInputContainerStyle: {
        width: wp(82),
        height: hp(6),
        borderBottomWidth: 0.5,
        marginTop: 10
    },
    customLabelStyle: {
        colorFocused: Config.Theme.COLOR_PRIMARY,
        fontSizeFocused: wp(2.5),
    },
    labelStyle: {
        fontSizeFocused: wp(2.5),
        fontFamily: Config.Theme.FONT_REGULAR,
        color: Config.Theme.COLOR_GRAY,
    },
    inputStyle: {
        height: hp(6),
        paddingTop: 8,
        fontSize: wp(3),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        marginLeft: 5
    }
})

export default CustomFloatingHintTextInput;