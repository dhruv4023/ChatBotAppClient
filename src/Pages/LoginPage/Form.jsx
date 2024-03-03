import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { setLogin } from '../../state'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import FlexBetween from '../../Components/FlexBetween'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FlexEvenly from '../../Components/FlexEvenly'
import {
  getUserNames,
  login,
  register,
  updateProfile
} from './LoginRegisterChangePass'
import { SelectLocation } from '../../Components/MyComponents'
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import Loading from '../../Components/Loading/Loading'

const Form = ({ pgType, editProfile, user }) => {
  // Initial values for registration and login
  const initialValuesRegister = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    about: '',
    password: '',
    picPath: '',
    location: {
      state: 'Gujarat',
      city: '',
      pincode: ''
    }
  }
  const initialValuesLogin = {
    uid: '',
    password: ''
  }

  const { palette } = useTheme()
  const [loading, setLoading] = useState(false)
  const [pageType, setPageType] = useState(pgType)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = pageType === 'Login'
  const isRegister = pageType === 'Register'

  // Set initial values based on page type
  const [values, setValues] = useState(
    isLogin ? initialValuesLogin : editProfile ? user : initialValuesRegister
  )

  // Handle form field changes
  const onChangehandle = (val, name) => {
    let tmp = { ...values }
    tmp[name] = val
    setValues(tmp)
  }

  // Handle image change
  const imgChangeHandl = (fl, name) => {
    let tmp = values
    tmp[name] = fl
    setValues(tmp)
  }

  const token = useSelector(s => s.token)

  const [userNames, setUserNames] = useState()

  // Handle form submission
  const handleFormSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    if (editProfile) values['_id'] = true

    if (isLogin) {
      await login({values, dispatch, setLogin, navigate}) // Handle login
    } else if (userNames?.includes(values.username)) {
      alert('Please select a unique username.')
    } else if (editProfile && values.email === user.email) {
      // Handle profile update
      await updateProfile(values, dispatch, token, navigate)
    } else {
      await register(values)
      // navigate("/auth/login", { state: null });
    }
    setLoading(false)
  }

  // Reset form values
  const resetForm = () => {
    setValues(!isLogin ? initialValuesLogin : initialValuesRegister)
  }

  const [getUserNamesOnce, setGetUserNamesOnce] = useState(false)

  useEffect(() => {
    // Get user names for registration once
    !editProfile &&
      isRegister &&
      getUserNames()
        .then(d => setUserNames(d))
        .catch(e => alert(e))
  }, [getUserNamesOnce])

  return (
    <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <FormFields
          onChangehandle={onChangehandle}
          values={values}
          isRegister={isRegister}
          userNames={userNames}
          isLogin={isLogin}
          imgChangeHandl={imgChangeHandl}
          editProfile={editProfile}
        />
      )}
      <Box>
        <Button
          fullWidth
          type='submit'
          disabled={loading}
          sx={{
            m: '2rem 0',
            p: '1rem',
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            '&:hover': { color: palette.primary.main }
          }}
        >
          {isLogin ? 'LOGIN' : editProfile ? 'Save Changes' : 'REGISTER'}
        </Button>
        {!editProfile && (
          <Typography
            onClick={() => {
              setPageType(isLogin ? 'Register' : 'Login')
              setGetUserNamesOnce(true)
              resetForm()
            }}
            sx={{
              textDecoration: 'underline',
              color: palette.primary.main,
              '&:hover': {
                cursor: 'pointer',
                color: palette.primary.dark
              }
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : 'Already have an account? Login here.'}
          </Typography>
        )}{' '}
        {/* {isLogin && (
          <Typography
            onClick={() => {
              navigate('/auth/changepass', { state: { page: 'enteremail' } })
            }}
            sx={{
              textDecoration: 'underline',
              color: palette.primary.main,
              '&:hover': {
                cursor: 'pointer',
                color: palette.primary.dark
              }
            }}
          >
            Forgot Password ?
          </Typography>
        )} */}
      </Box>
    </form>
  )
}
export default Form

const FormFields = ({
  onChangehandle,
  userNames,
  values,
  isRegister,
  isLogin,
  editProfile,
  imgChangeHandl
}) => {
  const [addPic, setAddPic] = useState(false)
  const { palette } = useTheme()
  return (
    <>
      {isRegister && (
        <FlexEvenly>
          <TextField
            required
            label='First Name'
            onChange={e => onChangehandle(e.target.value, 'firstName')}
            name='firstName'
            value={values.firstName}
            sx={{ margin: '0.5rem', width: '100%' }}
          />
          <TextField
            required
            label='Last Name'
            onChange={e => onChangehandle(e.target.value, 'lastName')}
            name='lastName'
            value={values.lastName}
            sx={{ margin: '0.5rem', width: '100%' }}
          />
        </FlexEvenly>
      )}
      <FlexEvenly flexDirection='column' margin={'0 .5rem 0 .5rem'}>
        <TextField
          required
          type={isRegister ? 'email' : 'text'}
          label={isLogin ? 'Email or Username' : 'Email'}
          onChange={e =>
            isLogin
              ? onChangehandle(e.target.value, 'uid')
              : onChangehandle(e.target.value, 'email')
          }
          value={values.email}
          name='email'
          sx={{ margin: '0.5rem', width: '100%' }}
        />
        {!editProfile && (
          <TextField
            required
            label='Password'
            type='password'
            onChange={e => onChangehandle(e.target.value, 'password')}
            value={values.password}
            name='password'
            sx={{ margin: '0.5rem', width: '100%' }}
          />
        )}
        {isRegister && (
          <>
            {editProfile ? (
              <TextField
                disabled={editProfile}
                value={values.username}
                sx={{ margin: '0.5rem', width: '100%' }}
              />
            ) : userNames ? (
              <TextField
                disabled={editProfile}
                required
                label='Username'
                error={userNames?.includes(values.username) && !editProfile}
                onChange={e => onChangehandle(e.target.value, 'username')}
                value={values.username}
                name='username'
                helperText={'Enter Unique Username'}
                sx={{ margin: '0.5rem', width: '100%' }}
              />
            ) : (
              <Loading />
            )}
            <TextField
              required
              label='About'
              onChange={e => onChangehandle(e.target.value, 'about')}
              name='about'
              value={values.about}
              sx={{ margin: '0.5rem', width: '100%' }}
            />
            <FlexBetween width={'100%'}>
              <IconButton
                onClick={() => {
                  setAddPic(!addPic)
                  imgChangeHandl('', 'picPath')
                }}
              >
                {addPic ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </IconButton>
              <Typography flexGrow={'1'}>
                {addPic
                  ? 'Click to turn off Picture Option'
                  : 'Click to turn on Picture Option'}
              </Typography>
            </FlexBetween>
            {addPic && (
              <Box
                border={`2px solid ${palette.neutral.medium}`}
                borderRadius='5px'
                width={'100%'}
                p='1rem'
                margin={'0.5rem'}
              >
                <Dropzone
                  acceptedFiles='.jpg,.jpeg,.png'
                  multiple={false}
                  onDrop={acceptedFiles => {
                    imgChangeHandl(acceptedFiles[0], 'picPath')
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`1px dashed ${palette.primary.main}`}
                      textAlign='center'
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />
                      {values?.picPath === '' ? (
                        <p>Add Picture Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography padding={'0.5rem '}>
                            {values.picPath.name}
                          </Typography>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}
          </>
        )}
      </FlexEvenly>

      {isRegister && (
        <>
          <SelectLocation
            location={values?.location}
            inputValues={onChangehandle}
          />
        </>
      )}
    </>
  )
}
