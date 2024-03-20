import { GET, POST } from "../utils/http"

const manualAuthUrl = 'manual-auth/';
const googleAuthUrl = 'google-auth/';

export const login = async (email, password) => {
    return POST(manualAuthUrl + 'login', { email, password });
}

//google auth

export const sendVerificationCode = async (email) => {
    return GET(googleAuthUrl + `send-code/${email}`, null)
}

export const verifyCode = async (email, userOtp) => {
    return POST(googleAuthUrl + 'verify-code', { email, userOtp })
}