import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../store/userSlice'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const theme = createTheme()

const validationSchema = Yup.object({
	name: Yup.string().required('*Name is required.'),
	userName: Yup.string().required('*User Name is required.'),
	gender: Yup.string().required('*Gender is required.'),
	dob: Yup.date().required('*Date Of Birth is required.'),
	phone: Yup.number()
		.required('*A phone number is required.')
		.positive(`A phone number can't start with a minus.`)
		.integer(`A phone number can't include a decimal point.`)
		.min(10, 'Phone number must be exactly 10 digits'),
	email: Yup.string().email().required('*Email is required.'),
	password: Yup.string()
		.required('*Password is required.')
		.min(
			8,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.'
		),
	passwordConfirm: Yup.string()
		.required('*Password Confirm is required.')
		.min(
			8,
			'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number.'
		)
		.oneOf(
			[Yup.ref('password'), null],
			'Password and passwordConfirm not match.'
		),
})

const Signup = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { handleSubmit, handleChange, values, errors, touched } = useFormik({
		initialValues: {
			name: '',
			userName: '',
			gender: '',
			dob: '',
			email: '',
			phone: '',
			password: '',
			passwordConfirm: '',
		},
		validationSchema,
		onSubmit: (values) => {
			addUser(values)
		},
	})

	const addUser = async (body) => {
		const response = await dispatch(registerUser(body))
		if (response?.meta?.requestStatus === 'fulfilled') {
			toast.success(response?.payload?.message)
			navigate('/')
		} else if (response?.meta?.requestStatus === 'rejected') {
			toast.error(response?.payload?.message)
		} else {
			toast.error('Something went wrong. try again later.')
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
						Sign up
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoFocus
									required
									fullWidth
									id='name'
									name='name'
									label='Name'
									onChange={handleChange}
									value={values?.name}
								/>
								{touched?.name && errors?.name && (
									<div className='error-text-display'>{errors?.name}</div>
								)}
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='userName'
									name='userName'
									label='User Name'
									onChange={handleChange}
									value={values?.userName}
								/>
								{touched?.user && errors?.user && (
									<div className='error-text-display'>{errors?.user}</div>
								)}
							</Grid>

							<Grid item xs={12} sm={6}>
								<FormLabel id='demo-controlled-radio-buttons-group'>
									Gender
								</FormLabel>
								<RadioGroup
									row
									aria-labelledby='demo-row-radio-buttons-group-label'
									id='gender'
									name='gender'
									onChange={handleChange}
									value={values?.gender}
								>
									<FormControlLabel
										value='Male'
										control={<Radio />}
										label='Male'
									/>
									<FormControlLabel
										value='Female'
										control={<Radio />}
										label='Female'
									/>
								</RadioGroup>
								{touched?.gender && errors?.gender && (
									<div className='error-text-display'>{errors?.gender}</div>
								)}
							</Grid>

							<Grid item xs={12} sm={6}>
								<br />
								<TextField
									required
									fullWidth
									id='dob'
									name='dob'
									label='Select a date of birth'
									type='date'
									focused={false}
									onChange={handleChange}
									InputLabelProps={{
										shrink: true,
									}}
								/>
								{touched?.dob && errors?.dob && (
									<div className='error-text-display'>{errors?.dob}</div>
								)}
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='phone'
									name='phone'
									label='Phone number'
									type='number'
									onChange={handleChange}
									value={values?.phone}
								/>
								{touched?.phone && errors?.phone && (
									<div className='error-text-display'>{errors?.phone}</div>
								)}
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									name='email'
									label='Email Address'
									onChange={handleChange}
									value={values?.email}
								/>
								{touched?.email && errors?.email && (
									<div className='error-text-display'>{errors?.email}</div>
								)}
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='password'
									name='password'
									label='Password'
									type='password'
									onChange={handleChange}
									value={values?.password}
								/>
								{touched?.password && errors?.password && (
									<div className='error-text-display'>{errors?.password}</div>
								)}
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='passwordConfirm'
									name='passwordConfirm'
									label='Password Confirm'
									type='password'
									onChange={handleChange}
									value={values?.passwordConfirm}
								/>
								{touched?.passwordConfirm && errors?.passwordConfirm && (
									<div className='error-text-display'>
										{errors?.passwordConfirm}
									</div>
								)}
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link to='/' variant='body2'>
									Already have an account? login here
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Signup
