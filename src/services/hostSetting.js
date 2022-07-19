var url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "http://account.localhost";
} else {
    url = "http://account.localhost";
}

export const API_BASE_URL = url;
