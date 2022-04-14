import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from '../config';
import CustomText from './CustomText';
export default CustomImageButton = (props) => {

    const { label, onPress, image, containerStyle, imageStyle, disable = false } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disable}
            style={[styles.mainContainer, containerStyle]}>
            <Image
                source={image}
                style={[styles.imageStyle, imageStyle]}
                resizeMode='contain'
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: wp(33),
        height: hp(7),
        backgroundColor: Config.Theme.COLOR_WHITE,
        paddingVertical: hp(1),
        paddingHorizontal: wp(1),
        borderRadius: wp(10),
        shadowOffset: { width: 0, height: 1 },
        shadowColor: Config.Theme.COLOR_BLACK,
        shadowOpacity: 0.3,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Config.Theme.COLOR_PRIMARY
    },
    imageStyle: {
        height: '80%',
        width: '70%',
    }
})