import React from 'react'
import { useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'
import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/userSlice'

const MainListItems = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { isLoggedin } = useSelector((state) => state?.user)

	const logoutHandler = async () => {
		dispatch(logout())
		navigate('/')
	}

	return (
		<>
			{isLoggedin && (
				<>
					<ListItemButton onClick={() => navigate('/')}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Home' />
					</ListItemButton>
					<ListItemButton onClick={() => navigate('/search')}>
						<ListItemIcon>
							<SearchIcon />
						</ListItemIcon>
						<ListItemText primary='Search' />
					</ListItemButton>
					<ListItemButton onClick={() => navigate('/contactus')}>
						<ListItemIcon>
							<ContactsIcon />
						</ListItemIcon>
						<ListItemText primary='Contact us' />
					</ListItemButton>
					<ListItemButton onClick={() => navigate('/aboutus')}>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary='About us' />
					</ListItemButton>
					<ListItemButton onClick={logoutHandler}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary='Logout' />
					</ListItemButton>
				</>
			)}
		</>
	)
}

export default MainListItems
