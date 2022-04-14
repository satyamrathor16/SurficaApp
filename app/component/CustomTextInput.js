import React from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';

export default CustomTextInput = (props) => {
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

    const [showPassword, setShowPassword] = React.useState(true);

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

                    <TextInput
                        style={[styles.inputStyle, textInputStyle]}
                        placeholder={placeholder}
                        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
                        onSubmitEditing={onSubmitEditing}
                        returnKeyType={returnKeyType}
                        textContentType="oneTimeCode"
                        ref={(input) => onCreateRef(input)}
                        multiline={multiline}
                        maxLength={maxLength}
                        editable={editable}
                        selectTextOnFocus={editable}
                        value={value}
                        defaultValue={defaultValue}
                        keyboardType={keyboardType ? keyboardType : 'default'}
                        secureTextEntry={password ? showPassword : false}
                        onChangeText={(text) => {
                            onChangeText(text);
                        }}
                        placeholderTextColor={Config.Theme.COLOR_GRAY}
                        autoCorrect={autoCorrect}
                        numberOfLines={1}
                    />
                </View>
                {password &&
                    <TouchableOpacity
                        onPress={() => {
                            setShowPassword(!showPassword);
                        }}
                        style={styles.eyeButton}>
                        <Image
                            source={showPassword ? Config.Images.VIEW : Config.Images.HIDDEN}
                            style={styles.eyeImageStyle}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        height: hp(6),
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Config.Theme.COLOR_GRAY
    },
    secondContainer: {
        flexDirection: 'row',
        width: '100%',
        height: hp(6),
        borderBottomWidth: 1,
        borderBottomColor: Config.Theme.COLOR_GRAY,
        // borderWidth:1
    },
    inputStyle: {
        width: '100%',
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
        flex: 1,
        // width: wp(80),
        height: hp(6),
        marginLeft: 10,
        // borderWidth:1
    },
    eyeImageStyle: {
        width: 15,
        height: 15,
    },
    eyeButton: {
        height: '100%',
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }

})