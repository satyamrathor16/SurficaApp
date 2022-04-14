import { StyleSheet } from 'react-native';
import Config from '../../../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Config.Theme.COLOR_GRAY_ATHENS
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
    headerRightImage: {
        tintColor: Config.Theme.COLOR_GRAY,
    },
    listContainerStyle: {
        paddingHorizontal: wp(3)
    },
    //List Item
    mainContainer1: {
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
        position: 'absolute',
        right: 0,
        height: 50,
        width: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectionImageStyle: {
        height: 20,
        width: 20,
    },
    HorizonLine: {
        height: 2,
        width: '100%',
        backgroundColor: Config.Theme.COLOR_PRIMARY,
        marginTop: 30
    },
    categoryList: {
        width: wp(50),
        alignSelf: 'center',
        marginTop: 20
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    totalText: {
        fontSize: wp(4),
        fontFamily: Config.Theme.FONT_SEMIBOLD,
        color: Config.Theme.COLOR_GRAY,
        alignSelf: 'center',
        marginTop: 20
    },
    imageSliderView: {
        height: hp(20),
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20
    },
    slideContainer: {
        height: '100%',
        width: '100%',
    },
    slide1: {
        backgroundColor: 'rgba(20,20,200,0.3)',
    },
    slide2: {
        backgroundColor: 'rgba(20,200,20,0.3)',
    },
    slide3: {
        backgroundColor: 'rgba(200,20,20,0.3)',
    },
    slideImage: {
        height: '100%',
        width: '100%',
        
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
})