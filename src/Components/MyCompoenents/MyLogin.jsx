import { useTheme } from '@emotion/react'
import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MyLogin = ({ txt }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Button
      style={{
        fontWeight: 'bold',
        border: `2px solid ${theme.palette.primary.main}`
      }}
      onClick={() => navigate('/auth/login')}
    >
      {txt ? txt : 'Login'}
    </Button>
  )
}

export default MyLogin
