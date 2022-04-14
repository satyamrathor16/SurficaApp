import { StyleSheet } from 'react-native';
import Config from '../../config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Config.Theme.COLOR_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerImage:{
        width: wp('50%'),
        height: hp('30%'),
    }
})