import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Component from '.';
import Config from '../config';
import CustomText from './CustomText';

export default CustomHeader = (props) => {

    const {
        title,
        imageStyle,
        titleStyles,
        leftButtonPress,
        showRightButton = false,
        showLeftButton = true,
        rightButtonPress,
        mainContainer,
        contentContainerStyle,
        centerImage,
        leftImage,
        leftImageStyle,
        rightImageStyle,
        rightImage,
        centerStyle
    } = props;

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <TouchableOpacity style={styles.imageButtonStyle} onPress={leftButtonPress}>
                <Image
                    source={leftImage ? leftImage : Config.Images.BACK}
                    resizeMode='contain'
                    style={[styles.image, leftImageStyle]}
                />
            </TouchableOpacity>
            <View style={[styles.centerPortion, centerStyle]}>
                {centerImage ?
                    <View style={styles.centerImageContainer}>
                        <Image
                            source={centerImage}
                            resizeMode='contain'
                            style={styles.centerImage}
                        />
                    </View>
                    :
                    <Component.CustomText numberofLine={1} style={[styles.titleStyle, titleStyles]}>{title}</Component.CustomText>
                }

            </View>
            
            {showRightButton ?
                <TouchableOpacity style={[styles.imageButtonStyle, { alignItems: 'flex-end', }]} onPress={rightButtonPress}>
                    <Image
                        source={rightImage}
                        resizeMode='contain'
                        style={[styles.image, rightImageStyle]}
                    />
                </TouchableOpacity>
                :
                <View style={[styles.imageButtonStyle, { alignItems: 'flex-end', }]} />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        width: wp(100),
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Config.Theme.COLOR_PRIMARY
    },
    image: {
        height: 20,
        width: 20,
        tintColor: Config.Theme.COLOR_WHITE
    },
    imageButtonStyle: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    centerPortion: {
        flex: 1,
        alignItems: 'flex-start',
        // borderWidth:2
    },
    centerImage: {
        height: 45,
        width: 150,
    },
    centerImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 18,
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        textAlign: 'center',
        color: Config.Theme.COLOR_WHITE
    },
})