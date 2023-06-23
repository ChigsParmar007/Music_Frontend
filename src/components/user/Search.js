import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'react-h5-audio-player/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { searchSong } from '../../store/searchSlice'

const Search = () => {
	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.user)
	const [search, setSearch] = useState('')
	const [songList, setSongList] = useState([])

	useEffect(() => {
		const debounceTimer = setTimeout(async () => {
			if (search.length === 0) {
				setSongList([])
				return
			}
			const response = await axios.get(
				`http://127.0.0.1:5000/api/songs/searchsong/${search}`,
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
			const data = await response.data
			setSongList(data)
		}, 1000)

		return () => clearTimeout(debounceTimer)
	}, [dispatch, search, token])

	const setSearchChangeHandler = async (event) => {
		setSearch(event.target.value)
	}

	const getSongById = async (id) => {
		const response = await axios.get(
			`http://127.0.0.1:5000/api/songs/getsongbyid/${id}`,
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		const data = await response.data
		dispatch(searchSong(data))
	}

	return (
		<>
			<TextField
				id='outlined-search'
				label='Search field'
				type='search'
				onChange={setSearchChangeHandler}
			/>

			{songList?.map((element) => (
				<ul key={element._id}>
					<li onClick={() => getSongById(element._id)}>{element?.title}</li>
				</ul>
			))}
		</>
	)
}

export default Search
