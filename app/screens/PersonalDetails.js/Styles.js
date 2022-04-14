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
    profilePicMainView: {
        width: wp(25),
        height: wp(25),
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Config.Theme.COLOR_PRIMARY,
        borderRadius:300,
        marginTop:20
    },
    profilePicView: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius:300,
    },
    profilePic: {
        width: '100%',
        height: '100%',
    }
})