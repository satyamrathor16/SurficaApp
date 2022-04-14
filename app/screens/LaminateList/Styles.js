import { StyleSheet } from 'react-native';
import Config from '../../config';
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
    filterView: {
        alignItems: 'flex-end',
    },
    filterImageStyle: {
        height: 25,
        width: 25,
        paddingHorizontal: 30,
        marginVertical: 10,
        tintColor: Config.Theme.COLOR_GRAY
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
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    multiChoiceButtonStyle: {
        borderRadius: 50,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: Config.Theme.COLOR_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 5
    },
    multiChoiceTextStyle: {
        color: Config.Theme.COLOR_GRAY,
        fontSize: 13
    },
    filterTitle: {
        fontSize: 15,
        color: Config.Theme.COLOR_BLACK,
        fontFamily:Config.Theme.FONT_SEMIBOLD,
        marginTop:10
    },
    filterMainTitle: {
        fontSize: 18,
        color: Config.Theme.COLOR_BLACK,
        fontFamily:Config.Theme.FONT_SEMIBOLD,
        alignSelf: 'center',
    },
    
})