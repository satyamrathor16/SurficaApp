import React from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';

export default CustomTextInputHintText = (props) => {
    const {
        label,
        labelStyle,
        placeholder,
        autoCapitalize,
        password,
        containerStyle,
        image,
        imageStyle,
        onChangeText,
        keyboardType,
        textInputStyle,
        multiline,
        value,
        defaultValue,
        returnKeyType,
        onSubmitEditing,
        onCreateRef = () => { },
        maxLength,
        editable,
        autoCorrect = false,
        inputFocusColor
    } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            {/* <View style={styles.secondContainer}> */}

            <View style={styles.inputView}>
                {/* <CustomText textStyle={[styles.labelStyle,labelStyle]}>{label}</CustomText> */}
                {value == 'initial' ?
                    <>
                        <Text style={styles.placeholderText}></Text>
                        <Text style={styles.initPlaceHolder}>{placeholder}</Text>
                    </>
                    :
                    <>
                        <Text style={styles.placeholderText}>{placeholder}</Text>
                        <Text style={styles.mainText}>{value}</Text>
                    </>
                }
            </View>

            {/* </View> */}
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        height: hp(7),
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Config.Theme.COLOR_GRAY,
    },
    secondContainer: {
        flexDirection: 'row',
        width: '100%',
        height: hp(6),
        borderBottomWidth: 1,
        borderBottomColor: Config.Theme.COLOR_GRAY,
        alignItems: 'center',
        // borderWidth:1
    },
    inputStyle: {
        width: wp(82),
        height: hp(6),
        fontSize: wp(3),
        color: Config.Theme.COLOR_GRAY,
        fontFamily: Config.Theme.FONT_REGULAR,
        // borderWidth:1
        // paddingTop: 18
        // backgroundColor:Config.Theme.COLOR_PURPLE
    },
    imageStyle: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        // borderWidth:1
    },
    labelStyle: {
        fontSize: wp(3),
        color: Config.Theme.COLOR_BLACK_TEXT,
        // backgroundColor:Config.Theme.COLOR_PURPLE
    },
    inputView: {
        width: wp(80),
        height: hp(6),
        justifyContent: 'center',
        marginLeft: 5,
        marginBottom: 10
        // borderWidth:1
    },
    mainText: {
        fontSize: wp(3),
        color: Config.Theme.COLOR_PRIMARY,
        fontFamily: Config.Theme.FONT_SEMIBOLD,
    },
    placeholderText: {
        fontSize: wp(2.5),
        color: Config.Theme.COLOR_PRIMARY,
        fontFamily: Config.Theme.FONT_REGULAR,
        marginBottom: 10
    },
    initPlaceHolder: {
        fontSize: wp(3.7),
        color: '#5e7393',
        fontFamily: Config.Theme.FONT_REGULAR,
    }
})