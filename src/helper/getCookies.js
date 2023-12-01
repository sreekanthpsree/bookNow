import { getCookie } from 'cookies-next';

// helpers to get cookies
const getAuthCookie = (name) => {
    const cookie = getCookie(name);
    if (!cookie) return undefined;

    return Buffer.from(cookie, 'base64').toString('ascii');
};

export const getValidAuthTokens = (name) => {
    const token = getAuthCookie(name);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };
    const decodedJwt = parseJwt(token);

    const tokenData = !(decodedJwt?.exp * 1000 < Date.now()) ? token : undefined

    return {
        token: tokenData,
    };
};

export const getUserCookies = (name) => {
    try {
        const data = (getCookie(name));
        if (data) {
            const result = JSON.parse(data);
            return result;

        }
        return
    } catch (error) {
        console.log(error)
    }

}