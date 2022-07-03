import axios from 'axios';
// import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
// import { API_BASE_URL } from './hostSetting';

export const ApiCall = (options) => {
    // const loggedInuser = getLoggedInUser();
    var new_options = { ...options };

    // let host = window.location.host;
    // let protocol = window.location.protocol;
    // let parts = host.split(".");
    // let subdomain = "";

    // if (parts.length >= 3) {
    //     subdomain = parts[0];
    //     parts.splice(0, 1);
    //     window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
    // }

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        let host = window.location.host;
        let parts = host.split(".");
        if (parts.length >= 2) {
            let old_url = new_options.url;
            let new_url = old_url.replace("app", parts[0]);
            new_options.url = new_url;
        }
    }

    // if (isUserAuthenticated()) {
    //     let baseUrl = API_BASE_URL;
    //     let replaceUrl = baseUrl.split('//').join(`//${loggedInuser.user.subdomain}.`);
    //     let old_url = new_options.url;
    //     let new_url = old_url.replace(baseUrl, replaceUrl);
    //     new_options.url = new_url;
    // }
    return axios(new_options).then((response) => response);
};
