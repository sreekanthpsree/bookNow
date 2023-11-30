import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, getCookie } from "cookies-next";

const initialState = {
    value: {
        isAuth: false,
        name: "",
        email: "",
        number: "",
        username: ""
    }
}
const setAuthCookies = async (token, name) => {
    const toBase64 = Buffer.from(token).toString('base64');
    setCookie(name, toBase64, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        // httpOnly: true,
    });
};

const setUserDataCookies = async (data, name) => {
    setCookie(name, data, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
    })

}


export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            deleteCookie('auth-token');
            setUserDataCookies(initialState, "user")
            return initialState
        },
        login: (state, action) => {
            setAuthCookies(action.payload.token, "auth-token")
            setUserDataCookies({ ...action.payload, isAuth: true }, "user")
            return {
                value: {
                    isAuth: true,
                    name: action.payload.name,
                    email: action.payload.email,
                    number: action.payload.number,
                    username: action.payload.username
                }
            }

        },
    }
})

export const { login, logout, setAuthCookie } = auth.actions;
export default auth.reducer;