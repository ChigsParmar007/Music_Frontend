import React from 'react'
import Dashboard from './Header_And_Sidebar/Dashboard'
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
	return (
		<>
			<Dashboard>
				<Outlet />
			</Dashboard>
		</>
	)
}

export default Layout
