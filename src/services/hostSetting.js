var url = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "https://accountsnew.hashroot.org/server";
} else {
    url = "https://accountsnew.hashroot.org/server";
}

export const API_BASE_URL = url;
