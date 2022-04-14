import React from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';

export default CustomTextInputText = (props) => {
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
            <View style={styles.secondContainer}>
                {!!image &&
                    <Image source={image}
                        style={[styles.imageStyle, imageStyle]}
                        resizeMode='contain'
                    />
                }

                <View style={styles.inputView}>
                    {/* <CustomText textStyle={[styles.labelStyle,labelStyle]}>{label}</CustomText> */}
                    {value == 'initial' ?
                        <Text style={styles.placeholderText}>{placeholder}</Text>
                        :
                        <Text style={styles.mainText}>{value}</Text>
                    }
                </View>

            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        height: hp(6),
        width: wp(100),
        borderBottomWidth: 1,
        borderBottomColor: Config.Theme.COLOR_GRAY,
        marginTop: 10
    },
    secondContainer: {
        flexDirection: 'row',
        width: wp(100),
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
        marginLeft: 12,
        justifyContent: 'center',

        // borderWidth:1
    },
    mainText: {
        fontSize: wp(3),
        color: Config.Theme.COLOR_GRAY,
        fontFamily: Config.Theme.FONT_REGULAR,
    },
    placeholderText: {
        fontSize: wp(3),
        color: Config.Theme.COLOR_GRAY,
        fontFamily: Config.Theme.FONT_REGULAR,
    }
})