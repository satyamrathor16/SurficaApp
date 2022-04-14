import { StyleSheet } from 'react-native';
import Config from '../../config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Config.Theme.COLOR_WHITE
    },
    contentContainer:{
        paddingHorizontal:20,        
    },
    flexRow:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    messageText:{
        fontSize:wp(3),
        fontFamily:Config.Theme.FONT_SEMIBOLD,
        color:Config.Theme.COLOR_PRIMARY,
        marginTop:20
    },
    messageStyle:{
        backgroundColor:Config.Theme.COLOR_GRAY_LIGHT,
        borderRadius:10,
        textAlignVertical:'top',
        textAlign:'left',
        width:'100%',
        minHeight:150,
        marginTop:10,
        paddingHorizontal:15
    },
    signupButton:{
        marginTop:hp(3),
        width:wp(33),
        alignSelf: 'center',
        marginBottom:hp(3)
    },
    textInput:{
        marginTop:hp(5)
    }
})