import axios from "axios";

const API_URL = '/api/users/'

//Register user
const registerUser = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async(userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}

//update user
const updateUser = async(userId, token, updatedUser) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + userId, config, updatedUser)
    
    return response.data
}

//get A user
const getaUser = async(userId) => {
    const response = await axios.get(API_URL + userId)
    return response.data
}

const authService = {
    registerUser,
    logout,
    login,
    updateUser,
    getaUser
}
export default authService