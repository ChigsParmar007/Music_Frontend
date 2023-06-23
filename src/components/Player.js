import React, { useEffect, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {
	Box,
	Button,
	CardActionArea,
	CardActions,
	CardMedia,
} from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Player = () => {
	const { search } = useSelector((state) => state.search)
	const [song, setSong] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const { token } = useSelector((state) => state.user)

	useEffect(() => {
		setSong(search)
	}, [search])

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			const response = await axios.get(
				'http://127.0.0.1:5000/api/songs/getsong',
				{
					headers: {
						Authorization: 'Bearer ' + token,
					},
				}
			)
			const data = await response.data
			setSong(data)
			setIsLoading(false)
		}
		fetchData()
	}, [token])

	const handleEnded = async () => {
		await axios.post(
			'http://127.0.0.1:5000/api/songs/createhistory',
			{ songType: song.type },
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		setIsLoading(true)
		const response = await axios.get(
			'http://127.0.0.1:5000/api/songs/getsong',
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		const data = await response.data
		setSong(data)
		setIsLoading(false)
	}

	const nextSong = async () => {
		setIsLoading(true)
		const response = await axios.get(
			'http://127.0.0.1:5000/api/songs/getsong',
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		)
		const data = await response.data
		setSong(data)
		setIsLoading(false)
	}

	return (
		<>
			{isLoading && (
				<Card
					sx={{
						width: '-webkit-fill-available',
						position: 'absolute',
						bottom: '0',
					}}
				>
					<>
						<CardActionArea>
							<CardContent>
								<Typography gutterBottom variant='h5' component='div'>
									Unknown
								</Typography>
							</CardContent>
						</CardActionArea>
						<CardActions>
							<AudioPlayer autoPlay id='audio' preload='auto' />
						</CardActions>
						<Button variant='contained' onClick={nextSong}>
							Next Song
						</Button>
					</>
				</Card>
			)}
			{!isLoading && (
				<Card
					sx={{
						width: '-webkit-fill-available',
						position: 'absolute',
						bottom: '0',
					}}
				>
					<>
						<Card>
							<CardContent>
								<Box display='flex' alignItems='center'>
									<CardMedia
										component='img'
										sx={{ width: 151 }}
										image={song.imageUrl}
										alt='Live from space album cover'
									/>
									<Typography
										gutterBottom
										variant='h5'
										component='div'
										sx={{ marginLeft: '1rem' }}
									>
										{song?.title}
									</Typography>
								</Box>
							</CardContent>
							<CardActions>
								<AudioPlayer
									src={song?.songUrl}
									onEnded={handleEnded}
									onPlayNext={handleEnded}
									onClickNext={nextSong}
									id='audio'
									preload='auto'
								/>
							</CardActions>
						</Card>
						<Button variant='contained' onClick={nextSong}>
							Next Song
						</Button>
					</>
				</Card>
			)}
		</>
	)
}

export default Player
