import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Component from '.';
import Config from '../config';

export default Item = (props) => {

    const { data, onSelection = () => { } } = props;

    return (
        <View style={styles.mainContainer}>

            <View style={styles.imageViewStyle}>
                <Image
                    source={Config.Images.SURFICA_LOGO}
                    resizeMode='contain'
                    style={styles.imageStyle}
                />
                
            </View>
            <View style={styles.otherDataView}>
                <View style={styles.nameTypeView}>
                    <Component.CustomText style={styles.textStyle}>{data.name}</Component.CustomText>
                    <Component.CustomText style={styles.textStyle}>{data.type}</Component.CustomText>
                </View>
                <Component.CustomText style={styles.textStyle}>{data.size}</Component.CustomText>
                <View style={{ flex: 1 }} />
                <Component.CustomText style={[styles.textStyle]}>{data.finish}</Component.CustomText>
                <TouchableOpacity
                    style={styles.selectButtonView}
                    onPress={onSelection}>
                    <Image
                        source={Config.Images.CHECKED}
                        style={[styles.selectionImageStyle, { tintColor: data.isSelected ? Config.Theme.COLOR_PRIMARY : Config.Theme.COLOR_GRAY }]}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        height: hp(41),
        width: wp(45),
        backgroundColor: Config.Theme.COLOR_WHITE,
        marginHorizontal: wp(1),
        marginVertical: wp(1)
    },
    imageViewStyle: {
        width: '100%',
        height: '75%',
    },
    otherDataView: {
        width: '100%',
        height: '25%',
        backgroundColor: Config.Theme.COLOR_PRIMARY,
        paddingHorizontal: wp(2.5),
        paddingVertical: wp(2)
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    nameTypeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        color: Config.Theme.COLOR_WHITE,
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        fontSize: wp(3)
    },
    selectButtonView: {
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.Theme.COLOR_PRIMARY
    },
    selectionImageStyle: {
        height: 20,
        width: 20,
    }
})