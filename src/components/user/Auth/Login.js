import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { loginUser } from '../../../store/userSlice'
import { useDispatch } from 'react-redux'

const theme = createTheme()

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [errors, setErrors] = useState({
		userNameError: '',
		passwordError: '',
	})

	const [user, setUser] = useState({
		userName: '',
		password: '',
	})

	const inputChangeHandler = (event) => {
		const { name, value } = event?.target

		if (name === 'userName') {
			setErrors((errors) => {
				return { ...errors, userNameError: '' }
			})
		}
		if (name === 'password') {
			setErrors((errors) => {
				return { ...errors, passwordError: '' }
			})
		}

		setUser(() => {
			return { ...user, [name]: value }
		})
	}

	const validateInputs = () => {
		let err = 0
		if (user.userName.length === 0) {
			setErrors((errors) => {
				return {
					...errors,
					userNameError: 'User Name is required.',
				}
			})
			err++
		}
		if (user.password.length < 8 || user.password.length > 20) {
			setErrors((errors) => {
				return {
					...errors,
					passwordError:
						'Password length must be 8 characters to 20 characters.',
				}
			})
			err++
		}
		if (err !== 0) return false
		return true
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const error = validateInputs()

		if (!error) {
			return
		}

		const response = await dispatch(loginUser(user))
		if (response?.meta?.requestStatus === 'fulfilled') {
			navigate('/')
		} else {
			toast.error(response?.payload?.message)
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Login
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							autoFocus
							required
							fullWidth
							margin='normal'
							id='userName'
							name='userName'
							label='User Name'
							onChange={inputChangeHandler}
						/>
						<span style={{ color: 'red' }}>
							{errors?.userNameError !== '' && errors?.userNameError}
						</span>
						<TextField
							required
							fullWidth
							margin='normal'
							id='password'
							name='password'
							label='Password'
							type='password'
							onChange={inputChangeHandler}
						/>
						<span style={{ color: 'red' }}>
							{errors?.passwordError !== '' && errors?.passwordError}
						</span>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Login
						</Button>
						<Grid container>
							<Grid item xs>
								<Link variant='body2'>Forgot password?</Link>
							</Grid>
							<Grid item>
								<Link to='/register' variant='body2'>
									Don`t have an account? Register
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Login
