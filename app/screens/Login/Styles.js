import { StyleSheet } from 'react-native';
import Config from '../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_WHITE
    },
    SignupText: {
        fontSize: wp(5),
        fontFamily: Config.Theme.FONT_BOLD,
        alignSelf: 'center',
        marginTop: hp(8)
    },
    filldetailsText: {
        fontSize: wp(4),
        fontFamily: Config.Theme.FONT_REGULAR,
        alignSelf: 'center',
        marginTop: hp(2)
    },
    contentContainer: {
        marginHorizontal: wp(6)
    },
    textInput: {
        marginTop: 10
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
    TNC: {
        color: Config.Theme.COLOR_PRIMARY
    },
    TNCMain: {
        fontSize: wp(3.1)
    },
    signupButton: {
        marginTop: hp(3),
        width: wp(50),
        alignSelf: 'center',
        marginBottom: hp(3)
    },
    alreadyHaveAccountButton: {
        alignItems: 'center',
        marginTop: hp(1),
        marginBottom: hp(3)
    },
    signinText: {
        color: Config.Theme.COLOR_GRAY,
        fontFamily: Config.Theme.FONT_BOLD
    },
    LoginWithOTPButton: {
        width: wp(50),
        alignSelf: 'center',
        // marginTop: hp(3)
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginTop: hp(2),

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Config.Theme.COLOR_BLACK_TRASPARENT
    },
    modalView: {
        margin: 20,
        width: Config.Constants.SCREEN_WIDTH * 0.9,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    dialogTitleText: {
        fontSize: 20,
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        textAlign: 'center'
    },
    descriptionTextStyle: {
        fontSize: 12,
        textAlign: 'center',
        color: Config.Theme.COLOR_GRAY
    },
    otpTextContainer: {
        height: 100,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.Theme.COLOR_WHITE
    },
    resendButton: {
        color: Config.Theme.COLOR_PRIMARY,
        textDecorationLine: 'underline',

    },
    optTextInput: {
        borderWidth: 1,
        borderColor: Config.Theme.COLOR_BLACK,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 50,
        height: 65,
        fontSize: 22,
        color: Config.Theme.COLOR_BLACK
    },
    optTextInputHighlighted: {
        borderColor: Config.Theme.COLOR_PRIMARY,
    },
    continueButton: {
        width: '90%',
        marginTop: 15,
        elevation: 5,
        alignSelf: 'center',
        shadowColor: Config.Theme.COLOR_PRIMARY,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.25,
        shadowRadius: 5
    },
    cancelSelectedItemButton: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: Config.Theme.COLOR_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: -7,
        top: -7
    },
    modalCancelImage: {
        height: 15,
        width: 15,
    },
    NumberError: {
        fontSize: 14,
        fontFamily: Config.Theme.FONT_BOLD,
        color: 'red'
    },
})