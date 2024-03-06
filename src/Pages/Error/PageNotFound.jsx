import { IconButton } from '@mui/material'
import FlexBetween from '../../Components/FlexBetween'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <FlexBetween alignItems='center' flexDirection='column' textAlign='center'>
      <h1>{location.state} Page Not Found</h1>
      <IconButton onClick={() => navigate('/')}>Go to Home Page</IconButton>
    </FlexBetween>
  )
}

export default PageNotFound
