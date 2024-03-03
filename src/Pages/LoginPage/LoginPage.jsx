import Form from './Form'
import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate()
  const isNonMobileScreens = useMediaQuery('(min-width: 800px)')
  const theme = useTheme()
  const { page } = useParams()

  return (
    <Box>
      <Box
        width={'100%'}
        p={'1rem 6%'}
        textAlign='center'
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight={'bold'} fontSize='32px' color={'primary'}>
          Authentication To ChatApp
        </Typography>
      </Box>
      <Box
        p='2rem'
        m={'2rem auto'}
        border='2px solid'
        borderRadius={'1.5rem'}
        width={isNonMobileScreens ? '40%' : '90%'}
      >
        {page === 'login' ? (
          // Display the EmailVerification component if 'page' is 'verifyemail'.
          <Form pgType={'Login'} />
        ) : page === 'changepass' ? (
          // Display the ChangePass component if 'page' is 'changepass'.
          // <ChangePass />
          navigate('/404', { state: "Not implemented" })
        ) : (
          navigate('/404', { state: null })
        )}
      </Box>
    </Box>
  )
}
