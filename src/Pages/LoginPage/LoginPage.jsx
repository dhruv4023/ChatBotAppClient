import Form from './Form'
import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'
import MyTitle from '../../Components/MyCompoenents/MyTitle'
import FlexEvenly from '../../Components/FlexEvenly'

const LoginPage = () => {
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
        <Typography
          color={'primary'}
          onClick={() => navigate('/')}
          fontWeight={'bold'}
          fontSize={'clamp(1rem,1.5rem,2rem)'}
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        >
          LLM Chat Hub
        </Typography>
      </Box>
      <FlexEvenly m={"2rem 0 2rem 0"} width={'100%'}>
        <MyTitle txt={'Authentication'} />
      </FlexEvenly>
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
          // navigate('/404', { state: 'Not implemented' })
          <ForgotPassword />
        ) : (
          navigate('/404', { state: null })
        )}
      </Box>
    </Box>
  )
}

export default LoginPage
