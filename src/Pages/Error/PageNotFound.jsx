import { IconButton } from '@mui/material'
import FlexBetween from '../../Components/FlexBetween'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <FlexBetween>
      {location.state} PageNotFound
      <IconButton onClick={() => navigate('/')}>Home Page</IconButton>
    </FlexBetween>
  )
}

export default PageNotFound
