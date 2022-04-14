import { StyleSheet } from 'react-native';
import Config from '../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_WHITE
    },
    textInputContainerStyle: {
        borderWidth: 0,
        height: 50,

    },
    contentContainer: {
        paddingHorizontal: 16
    },
    signupButton: {
        marginTop: hp(3),
        width: wp(33),
        alignSelf: 'center',
        marginBottom: hp(3)
    },
    selectionButton: {
        marginTop: hp(3),
        width: '100%',
        alignSelf: 'center',
        borderRadius: 7,
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
    continueButton: {
        width: '45%',
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
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    }
})