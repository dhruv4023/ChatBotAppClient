import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MyLogin = ({txt}) => {
  const navigate = useNavigate()
  return <Button onClick={()=>navigate("/auth/login")}>{txt ? txt : "Login"}</Button>
}

export default MyLogin
