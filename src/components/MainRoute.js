import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './user/Auth/Login'
import Register from './user/Auth/Register'
import Home from './user/Home'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Profile from './user/Profile'
import Layout from './Layout'
import Search from './user/Search'

const MainRoute = () => {
	const { token } = useSelector((state) => state?.user)

	return (
		<>
			<Routes>
				{!token && (
					<>
						<Route path='/' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</>
				)}
				{token && (
					<>
						<Route element={<Layout />}>
							<Route path='/' element={<Home />} />
							<Route path='/search' element={<Search />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/aboutus' element={<AboutUs />} />
							<Route path='/contactus' element={<ContactUs />} />
						</Route>
					</>
				)}
			</Routes>
		</>
	)
}

export default MainRoute
