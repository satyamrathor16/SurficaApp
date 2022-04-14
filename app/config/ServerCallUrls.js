import Constants from './Constants';

export default {
    GET_PROFILE: Constants.BASE_URL + 'get_profile',
    SIGNUP: Constants.BASE_URL + 'signup',
    GET_CITY_LIST: Constants.BASE_URL + 'search_cities',
    GET_STATE_LIST: Constants.BASE_URL + 'search_states',
    SIGNIN: Constants.BASE_URL + 'login',
    LOGIN_WITH_OTP: Constants.BASE_URL + 'loginmobile',
    FORGOT_PASSWORD: Constants.BASE_URL + 'forgot',
    SEND_CONTACT: Constants.BASE_URL + 'send_contact',
    UPDATE_PROFILE: Constants.BASE_URL + 'update_profile',
    UPDATE_PROFILE_PICTURE: Constants.BASE_URL + 'update_profile_pic',
    VERIFY_BANK_ACCOUNT: Constants.BASE_URL + 'verify_bank_account',
    SCAN_QR_CODE: Constants.BASE_URL + 'scan_qrcode',
    GET_REWARD_LIST: Constants.BASE_URL + 'get_rewards_list',
    GET_WITHDRAW_LIST: Constants.BASE_URL + 'get_withdrawrequest_list',
    GET_PRODUCTS: Constants.BASE_URL + 'get_products',
    POST_RECOMMENDATION: Constants.BASE_URL + 'post_recommendation',
    GET_RECOMMENDATION: Constants.BASE_URL + 'get_recommendations',
    WITHDRAW_REQUEST: Constants.BASE_URL + 'withdraw_request',
    SEND_OTP: Constants.BASE_URL + 'sendsmsmobile',
    VERIFY_OTP: Constants.BASE_URL + 'loginotp',
}