import {
  DarkMode,
  LightMode,
  LoginRounded,
  ContactSupport,
  Logout
} from '@mui/icons-material'
import { setMode, setLogout } from '../../state/index'
import { IconButton, FormControl, Tooltip, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import UserImg from '../../Components/UserImg'
import FlexBetween from '../../Components/FlexBetween'

const MenuItems = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const dark = theme.palette.neutral.dark
  const user = useSelector(s => s.user)

  return (
    <>
      <IconButton gap={'1rem'} onClick={() => dispatch(setMode())}>
        {theme.palette.mode === 'dark' ? (
          <Tooltip title='light mode'>
            <LightMode sx={{ fontSize: '25px' }} />
          </Tooltip>
        ) : (
          <Tooltip title='dark mode'>
            <DarkMode sx={{ fontSize: '25px', color: dark }} />
          </Tooltip>
        )}
      </IconButton>
      {/* <IconButton onClick={() => navigate('/contact')}>
        <Tooltip title='Contact Support'>
          <ContactSupport sx={{ fontSize: '25px' }} />
        </Tooltip>
      </IconButton> */}
      {user ? (
        <>
          <Tooltip title={`${user?.firstName} ${user?.lastName}`}>
            <IconButton onClick={() => navigate(`/profile/${user?.username}`)}>
              <UserImg image={user?.picPath} size={'30px'} />
            </IconButton>
          </Tooltip>
          <IconButton
            onClick={() => {
              dispatch(setLogout())
              navigate('/')
            }}
          >
            <Tooltip title='Log out'>
              <Logout />
            </Tooltip>
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => {
              navigate('/auth/login')
            }}
          >
            <Tooltip title='Login'>
              <LoginRounded sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </IconButton>
        </>
      )}
    </>
  )
}

export default MenuItems
