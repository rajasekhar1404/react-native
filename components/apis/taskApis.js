const BASE_URL = "https://rajasekhar.up.railway.app/"
// const BASE_URL = "http://localhost:8080/"
// const BASE_URL = 'https://krs-backend-lwq1.onrender.com/'

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

// github apis
export const GITHUB_APPLICATION_VERSION = "https://api.github.com/repos/rajasekhar1404/react-native/contents/package.json"
export const GITHUB_DOWNLOAD_LATEST = "https://raw.githubusercontent.com/rajasekhar1404/react-native/master/builds/krs.apk"