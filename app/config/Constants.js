import { Dimensions, Platform } from 'react-native';

const IS_LIVE = false;
var baseURL = IS_LIVE ? 'http://surfica.pmcommu.in/api/v1/' : 'https://test13.infilon.net/api/v1/';


export default {
    platform: Platform.OS,
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    SCREEN_WIDTH: Dimensions.get('screen').width,
    BASE_URL: baseURL,
    ASYNC_KEY_USER_TOKEN: 'token',
    ASYNC_KEY_ROLE: 'role',
    ASYNC_KEY_USER_DATA: 'user_data',
    ROOT_NAVIGATOR: null,
    EMAIL_REGEX: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    NUMBER_ONLY_REGEX: /^[0-9\b]+$/,
    ARCHITECT: '1',
    CARPANTER: '2',
    DATE_FORMAT:{
        DD_MMMM_YYYY:'DD MMMM YYYY',
        HH_MM:'hh:mm A',

    }
}