const BASE_URL = "http://3.95.166.145:8081/api/"
// const BASE_URL = "http://192.168.0.100:8081/api/"


// tasks
export const GET_ALL_TASKS = `${BASE_URL}tasks`
export const TASKS_BY_DATE = `${BASE_URL}tasks/date`
export const CREATE_TASK = `${BASE_URL}tasks/create`
export const UPDATE_TASK = `${BASE_URL}tasks/update`

// taskpad
export const GET_TASKPAD_CONTENT = `${BASE_URL}taskpad`
export const UPDATE_TASKPAD_CONTENT = `${BASE_URL}taskpad/update`

// psyche
export const PSYCHE_GET = `https://script.google.com/macros/s/AKfycbyHveY8SMnN5WgYltdw-_RHoIV_eZddMFvT0c_iolGtuNOQ0lbbrZ4nMQN-O38nu00P/exec`

// user
export const LOGIN = `${BASE_URL}users/login`
export const LOGGEDINUSER = `${BASE_URL}users/user`
export const REGISTER_USER = `${BASE_URL}users/register`
export const SEND_FORGOT_PASSWORD_OTP = `${BASE_URL}users/forgotPassword`
export const FORGOT_PASSWORD_VERIFY_OTP = `${BASE_URL}users/verifyotp`
export const UPDATE_PASSWORD_FORGOT = `${BASE_URL}users/updateForgotPassword`

// github apis
export const GITHUB_APPLICATION_VERSION = "https://api.github.com/repos/rajasekhar1404/react-native/contents/package.json"
export const GITHUB_DOWNLOAD_LATEST = `https://raw.githubusercontent.com/rajasekhar1404/krs-mobile-builds/main/`