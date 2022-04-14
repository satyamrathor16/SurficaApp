import { StyleSheet } from 'react-native';
import Config from '../../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_GRAY_ATHENS
    },
    contentContainer: {
        flex: 1,
    },
    navbarMainContainer: {
        backgroundColor: Config.Theme.COLOR_GRAY_ATHENS
    },
    mavBarHeaderCenter: {
        alignItems: 'center',
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
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
    codeInputView: {
        height: 150,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: Config.Theme.COLOR_WHITE,
        position: 'absolute',
        bottom: 0
    }
})