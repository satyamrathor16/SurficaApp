import Module from '../module';
import Utils from '../utils';

const GetApiCall = async (
    url,
    header,
    showLoader = true,
    showResponseError = true,
    showNoInternetMessage = true,
    manageApiResponse = true,
) => {
    console.log('Api Services', url);
    // if (Utils.UserSession.SESSION_EXPIRE) {
    //     Module.CustomLoader.isShowLoader(false);
    //     return null;
    // }
    if (showLoader) {
        Module.CustomLoader.isShowLoader(true);
    }
    // const isInternet = await Utils.MethodUtils.checkInternetConnection();

    // if (!isInternet) {
    //     Module.CustomLoader.isShowLoader(false);
    //     if (showNoInternetMessage) {
    //         Module.CustomDropdown.showAlert('error', Config.I18N.t('NO_INTERNET'), Config.I18N.t('NO_INTERNET_MESSAGE'));
    //     }
    //     return null;
    // }
    // console.log('AUTHORIZATION_USER',Config.Constant.AUTHORIZATION_USER);
    // console.log('USER TOKEN',Config.Constant.USER_TOKEN);
    // console.log('URL',url);
    // console.log('Header',header);
    const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // AuthorizationUser: Config.Constant.AUTHORIZATION_USER,
            // Authorization: 'Bearer ' + Config.Constant.USER_TOKEN,
            ...header,
        },
    }).then(r => r.json())
        .catch(exc => {
            console.log('Server Error:', exc);
            if (showNoInternetMessage) {
                // Module.CustomDropdown.showAlert('error', '', Config.I18N.t('SOME_THING_WENT_WRONG'));
                // Module.CustomDropdown.showAlert('error', '', 'Api URL:' + url);
                // Alert.alert(
                //     "Api Error",
                //     'Api URL:' + url,
                //     [
                //         { text: "OK", onPress: () => console.log("OK Pressed") }
                //     ]
                // )
            }
            if (showLoader)
                Module.CustomLoader.isShowLoader(false);

            return null;
        });
    console.log('rawResponse', rawResponse);
    if (showLoader)
        Module.CustomLoader.isShowLoader(false);
    if (!manageApiResponse) {
        return null;
    } else if (rawResponse === null) {
        return null;
    } else if (
        rawResponse.success === true
    ) {
        return rawResponse;
    } else if (
        rawResponse.success === false
    ) {
        if (showResponseError)

            Utils.Method.showToast('Error', rawResponse.message, 2)
        return null;
    } else {
        // if (showResponseError)
        // Utils.MethodUtils.manageApiResponseCode(rawResponse);
        return null;
    }
};

const PostApiCall = async (
    url,
    payload,
    header,
    showLoader = true,
    showResponseError = true,
    showNoInternetMessage = true,
    manageApiResponse = true,
) => {
    console.log('Api Services', url);
    // if (Utils.UserSession.SESSION_EXPIRE) {
    //     Module.CustomLoader.isShowLoader(false);
    //     return null;
    // }
    if (showLoader) {
        Module.CustomLoader.isShowLoader(true);
    }
    // const isInternet = await Utils.MethodUtils.checkInternetConnection();

    // if (!isInternet) {
    //     Module.CustomLoader.isShowLoader(false);
    //     if (showNoInternetMessage) {
    //         Module.CustomDropdown.showAlert('error', Config.I18N.t('NO_INTERNET'), Config.I18N.t('NO_INTERNET_MESSAGE'));
    //     }
    //     return null;
    // }
    // console.log('AUTHORIZATION_USER',Config.Constant.AUTHORIZATION_USER);
    // console.log('USER TOKEN',Config.Constant.USER_TOKEN);
    // console.log('URL',url);
    // console.log('Header',header);

    console.log('-------------API Call-------------');
    console.log('url:', url);
    console.log('request data:', JSON.stringify(payload));

    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // AuthorizationUser: Config.Constant.AUTHORIZATION_USER,
            // Authorization: 'Bearer ' + Config.Constant.USER_TOKEN,
            ...header,
        },
        body: payload
    }).then(r => r.json())
        .catch(exc => {
            console.log('Server Error:', exc);
            if (showLoader)
                Module.CustomLoader.isShowLoader(false);

            return null;
        });
    console.log('request response:', rawResponse);
    if (showLoader)
        Module.CustomLoader.isShowLoader(false);
    if (!manageApiResponse) {
        return null;
    } else if (rawResponse === null) {
        return null;
    } else if (
        rawResponse.success === true
    ) {
        return rawResponse;
    } else if (
        rawResponse.success === false
    ) {
        if (showResponseError) {
            if (!!rawResponse.data && JSON.stringify(rawResponse.data) != JSON.stringify({})) {
                var data = Object.values(rawResponse.data)[0];
                console.log('Response Data', data[0]);
                Utils.Method.showToast('Error', data[0], 2)
            } else {
                Utils.Method.showToast('Error', rawResponse.message, 2)
            }

        }
        return null;
    } else {
        // if (showResponseError)
        // Utils.MethodUtils.manageApiResponseCode(rawResponse);
        return null;
    }
};

export default {
    GetApiCall,
    PostApiCall
}