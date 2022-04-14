import { StyleSheet } from 'react-native';
import Config from '../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_GRAY_ATHENS
    },
    imageStyle: {
        width: '100%',
        height: Config.Constants.SCREEN_HEIGHT * 0.4
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    flex1: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        marginTop: 20,
        color: Config.Theme.COLOR_BLACK
    },
    subTitle: {
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_BLACK
    }
})