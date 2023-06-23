import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	search: {},
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		searchSong: (state, action) => {
			return {
				...state,
				search: action.payload,
			}
		},
	},
})

export const { searchSong } = searchSlice.actions

export default searchSlice.reducer
