import { StyleSheet } from 'react-native';
import Config from '../../config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Config.Theme.COLOR_WHITE
    },
    SignupText:{    
        fontSize:wp(5),
        fontFamily:Config.Theme.FONT_BOLD,
        alignSelf: 'center',
        marginTop:hp(8)
    },
    filldetailsText:{
        fontSize:wp(4),
        fontFamily:Config.Theme.FONT_REGULAR,
        alignSelf: 'center',
        marginTop:hp(2)
    },
    contentContainer:{
        marginHorizontal:wp(6)
    },
    textInput:{
        marginTop:10
    },
    termsConditionView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    termsConditionCheckbox: {
        height: wp(5),
        width: wp(5),
        backgroundColor: Config.Theme.COLOR_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1.2),
        borderWidth: 3,
        borderColor: Config.Theme.COLOR_PRIMARY,
        marginRight: 15
    },
    checkBoxImage: {
        height: wp(3),
        width: wp(3),
    },
    TNC:{
        color:Config.Theme.COLOR_PRIMARY
    },
    TNCMain:{
        fontSize:wp(3.1)
    },
    signupButton:{
        marginTop:hp(3),
        width:wp(33),
        alignSelf: 'center',
        marginBottom:hp(3)
    },
    alreadyHaveAccountButton:{
       alignItems: 'center',
       marginTop:hp(1),
       marginBottom:hp(5)
    },
    signinText:{
        color:Config.Theme.COLOR_GRAY,
        fontFamily:Config.Theme.FONT_BOLD
    },
    LoginWithOTPButton:{
        width:wp(50),
        alignSelf: 'center',
        marginBottom:hp(3)
    },
})