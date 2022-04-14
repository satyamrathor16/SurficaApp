import { StyleSheet } from 'react-native';
import Config from '../../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_GRAY_ATHENS
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    navbarMainContainer: {
        backgroundColor: Config.Theme.COLOR_GRAY_ATHENS
    },
    mavBarHeaderCenter: {
        alignItems: 'center',
    },
    headerLeftImage: {
        tintColor: Config.Theme.COLOR_PRIMARY,
    },
    totalText: {
        fontSize: wp(4),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_GRAY,
        alignSelf: 'center',
        marginTop: 20
    },
    totalValueText: {
        fontSize: wp(5),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_PRIMARY,
        alignSelf: 'center',
        borderWidth: 0.5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5
    },
    flexRowforButton: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,

    },
    signupButton: {
        width: wp(40),
    },
    HorizonLine: {
        height: 2,
        width: '100%',
        backgroundColor: Config.Theme.COLOR_PRIMARY,
        marginTop: 30
    },
    categoryList: {
        width: wp(40),
        alignSelf: 'center',
        marginTop: 20
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
    filterMainTitle: {
        fontSize: 15,
        color: Config.Theme.COLOR_BLACK,
        fontFamily:Config.Theme.FONT_SEMIBOLD,
        alignSelf: 'center',
        textAlign:'center'
    },
    withdrawInputText:{
        width: '50%',
    }
})