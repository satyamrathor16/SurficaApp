import { StyleSheet } from 'react-native';
import Config from '../../config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Config.Theme.COLOR_PRIMARY,
    },
    centerImage:{
        width: wp('50%'),
        height: hp('30%'),
        alignSelf:'center',
        marginTop:hp(5),
    },
    SignupText:{
        color:Config.Theme.COLOR_WHITE,
        fontSize:hp(3),
        fontFamily:Config.Theme.FONT_SEMIBOLD,
        alignSelf: 'center',
    },
    RoleView:{
        marginHorizontal:wp(5),
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center'
    },
    roleImage:{
        height: wp(22),
        width: wp(22),
    },
    roleCarpenterView:{
        height: wp(30),
        width: wp(30),
        backgroundColor: Config.Theme.COLOR_PRIMARY_LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:200,
    },
    roleArchitectView:{
        height: wp(30),
        width: wp(30),
        backgroundColor: Config.Theme.COLOR_YELLOW,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:200,
    },
    roleText:{
        color:Config.Theme.COLOR_WHITE,
        fontSize:hp(3),
        alignSelf: 'center',
        marginTop:hp(3)
    },
})