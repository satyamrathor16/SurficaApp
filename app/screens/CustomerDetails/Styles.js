import { StyleSheet } from 'react-native';
import Config from '../../config';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:Config.Theme.COLOR_WHITE
    },
    textInputContainerStyle:{
        borderWidth:0,
        height: 50,
        
    },
    contentContainer:{
        paddingHorizontal:16
    },
    signupButton:{
        marginTop:hp(3),
        width:wp(33),
        alignSelf: 'center',
        marginBottom:hp(3)
    },
    DirectoryButton:{
        marginTop:hp(3),
        width:'100%',
        alignSelf: 'center',
    },
    selectionButton:{
        marginTop:hp(3),
        width:'100%',
        alignSelf: 'center',
        
        borderRadius:7,

    },
    
})