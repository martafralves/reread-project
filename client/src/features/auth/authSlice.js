import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// REGISTER user

export const registerUser = createAsyncThunk(
    'auth/register',
    async(user, thunkAPI) => {
        try {
            return await authService.registerUser(user)
        }catch(error){
            const message =
            (error.response &&
                error.response.data &&
                 error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// LOGIN user

export const login = createAsyncThunk(
    'auth/login',
    async(user, thunkAPI) => {
        try {
            return await authService.login(user)
        }catch(error){
            const message =
            (error.response &&
                error.response.data &&
                 error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//LOGOUT
export const logout = createAsyncThunk('auth/logout', 
async() => {
    await authService.logout()
})

//update user information
export const updateUser = createAsyncThunk('users/update', async(userId, updatedUser, thunkAPI) =>{
  try{
      return await authService.updateUser(userId, updatedUser)
  }catch(error){
      const message =
          (error.response &&
              error.response.data &&
               error.response.data.message) ||
              error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
  }
}) 

//get user by id
export const getaUser = createAsyncThunk('users/getaUser', async(userId, thunkAPI) => {
  try{
      return await authService.getaUser(userId)
  }catch(error){
      const message =
          (error.response &&
              error.response.data &&
               error.response.data.message) ||
              error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
          },
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(logout.fulfilled, (state) => {
            state.user = null
          })
          .addCase(login.pending, (state) => {
            state.isLoading = true
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(updateUser.pending, (state) =>{
            state.isLoading = true
        })
          .addCase(updateUser.fulfilled, (state, action, {payload}) => {
            const updatedUser = state.users.map((user) => user._id === action.payload._id ? action.payload : user)
            state.isLoading = false
            state.isSuccess = true
            state.users = updatedUser
            localStorage.setItem('user', JSON.stringify(updatedUser));
        })
         .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message=action.payload
        })
        .addCase(getaUser.pending, (state) =>{
          state.isLoading = true
      })
      .addCase(getaUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
      })
      .addCase(getaUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message=action.payload
      })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer