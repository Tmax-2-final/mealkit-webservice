const CLIENT_ID = "8fdb3c0fe18f5222c5fbcaff554a7367";
const REDIRECT_URI = "http://15.165.139.232:3000/oauth/callback/kakao";
const SCOPE = "profile_nickname, account_email";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?scope=${SCOPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;