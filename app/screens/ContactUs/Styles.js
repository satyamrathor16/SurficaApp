import { StyleSheet } from 'react-native';
import Config from '../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_WHITE
    },
    contentContainer: {
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:15
        // justifyContent: 'space-between'
    },
    messageText: {
        fontSize: wp(3),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_PRIMARY,
        marginTop: 20
    },
    messageStyle: {
        backgroundColor: Config.Theme.COLOR_GRAY_LIGHT,
        borderRadius: 10,
        textAlignVertical: 'top',
        textAlign: 'left',
        width: '100%',
        minHeight: 150,
        marginTop: 10,
        padding: 15

    },
    signupButton: {
        marginTop: hp(3),
        width: wp(33),
        alignSelf: 'center',
        marginBottom: hp(3)
    },
    kindlyText: {
        fontSize: 17,
        color: Config.Theme.COLOR_BLACK,
        textAlign: 'center'
    },
    linkText: {
        color: Config.Theme.COLOR_PRIMARY,
        textDecorationLine: 'underline',
        flex:2
    },
    logoImage: {
        height: Config.Constants.SCREEN_WIDTH - 150,
        width: Config.Constants.SCREEN_WIDTH - 150,
    },
    InformationTitle: {
        flex: 1,
        color: Config.Theme.COLOR_BLACK,
        fontFamily: Config.Theme.FONT_SEMIBOLD
    },
    Information: {
        flex: 2,
        color: Config.Theme.COLOR_BLACK,
    }
})