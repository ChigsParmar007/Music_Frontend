import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const loginData = JSON.parse(localStorage.getItem('loginData'))

const initialState = loginData
	? loginData
	: {
			isLoggedin: false,
			isLoading: false,
			token: null,
			user: {},
			error: undefined,
	  }

export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://127.0.0.1:5000/api/user/signup',
				user
			)

			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://127.0.0.1:5000/api/user/signin',
				user
			)

			const LoggedInUserData = {
				isLoggedin: true,
				token: response.data.token,
				user: response.data.user,
				isLoading: false,
				error: null,
			}
			localStorage.setItem('loginData', JSON.stringify(LoggedInUserData))

			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem('loginData')
			return {
				...state,
				isLoggedin: false,
				isLoading: false,
				token: null,
				user: {},
				error: undefined,
			}
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(registerUser.fulfilled, (state) => {
				return {
					...state,
					isLoading: false,
				}
			})
			.addCase(registerUser.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action.payload,
				}
			})
			.addCase(loginUser.pending, (state) => {
				return {
					...state,
					isLoading: true,
				}
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					isLoggedin: true,
					token: action.payload.token,
					user: action.payload.user,
					error: null,
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: action.payload,
				}
			})
	},
})

export const { logout } = userSlice.actions

export default userSlice.reducer
