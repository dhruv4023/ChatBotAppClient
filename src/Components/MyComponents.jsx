import { useTheme } from '@emotion/react'
import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexEvenly from './FlexEvenly'
export const SelectAutoComplete = ({
  msg,
  setInputVal,
  options,
  label,
  value,
  req = true
}) => {
  return (
    <Tooltip title={msg}>
      <Autocomplete
        sx={{ width: '100%' }}
        options={options}
        autoHighlight
        value={value}
        getOptionLabel={option => option}
        onInputChange={(e, newInputValue) => {
          setInputVal(newInputValue, String(label).replace(' ', ''))
        }}
        renderOption={(props, option) => (
          <Box
            component='li'
            sx={{ width: '100%' }}
            // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option}
          </Box>
        )}
        renderInput={params => (
          <TextField
            required={req}
            value={value}
            {...params}
            label={
              String(label).charAt(0).toUpperCase() + String(label).substring(1)
            }
          />
        )}
      />
    </Tooltip>
  )
}

export const SelectLocation = ({ location, inputValues }) => {
  const initialLocation = {
    city: location ? location.city : '',
    pincode: location ? location.pincode : '',
    state: 'Gujarat'
  }
  // console.log(location);
  const [values, setValues] = useState(initialLocation)
  const onChangehandle = (val, name) => {
    // e.preventDefault();
    let tmp = { ...values }
    // console.log(val);
    tmp[name] = val
    setValues(tmp)
  }
  useEffect(() => {
    inputValues(values, 'location')
  }, [values])
  // console.log(values);
  return (
    <>
      <FlexEvenly gap={'1rem'} width={'100%'}>
        <TextField
          required
          label='State'
          onChange={e => onChangehandle(e.target.value, 'state')}
          name='state'
          value={values.state}
          disabled={true}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          required
          label='City'
          onChange={e => onChangehandle(e.target.value, 'city')}
          name='city'
          value={values.city}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          required
          inputProps={{
            minLength: 6,
            maxLength: 6
          }}
          label='Pincode'
          onChange={e => onChangehandle(e.target.value, 'pincode')}
          name='pincode'
          value={values.pincode}
          sx={{ flexGrow: 1 }}
        />
      </FlexEvenly>
    </>
  )
}

export const MyTextField = ({
  name,
  val,
  setInputVal,
  mxVal,
  mnVal,
  type = 'text',
  error = false
}) => {
  const nm = String(name).replace('_', ' ')
  return (
    <TextField
      key={name}
      label={nm.charAt(0).toUpperCase() + nm.substring(1)}
      onChange={e => setInputVal(e.target.value, name)}
      name='Name'
      required
      type={type}
      error={error}
      value={val}
      InputProps={{
        inputProps: {
          min: mnVal,
          max: mxVal
        }
      }}
      sx={{ width: '100%' }}
    />
  )
}

export const MyBtn = ({ onclickHandle, fullwidth = true, label = 'x' }) => {
  const theme = useTheme()
  return (
    <Button
      fullWidth={fullwidth}
      type='submit'
      onClick={onclickHandle}
      sx={{
        m: '1.2rem 0',
        p: '1rem',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.alt,
        '&:hover': { color: theme.palette.primary.main }
      }}
    >
      {label}
    </Button>
  )
}

export const DateTimeField = ({
  name = '',
  setInputVal,
  mnDate,
  mxDate,
  oldVals,
  disabled
}) => {
  const [values, setValues] = useState({
    // date: new Date().toISOString().substring(0, 10),
    time: '00:00'
  })
  const onChangehandle = (val, name) => {
    let tmp = { ...values }
    tmp[name] = val
    setValues(tmp)
  }
  useEffect(() => {
    setInputVal(values?.date + ' ' + values?.time, name + '_time')
  }, [values])
  return (
    <Box width={'100%'}>
      <b>Select {name.toUpperCase()} Date & Time</b>
      <FlexEvenly gap={2}>
        <TextField
          key={name + 'date'}
          onChange={e => onChangehandle(e.target.value, 'date')}
          name={'Name'}
          value={oldVals && String(oldVals).substring(0, 10)}
          required
          fullWidth
          disabled={disabled}
          type='date'
          InputProps={{
            inputProps: {
              min: mnDate,
              max: mxDate
            }
          }}
        />
        <TextField
          key={name + 'time'}
          value={oldVals && String(oldVals).substring(11, 16)}
          onChange={e => onChangehandle(e.target.value, 'time')}
          name={'Name'}
          required
          fullWidth
          disabled={disabled}
          type='time'
        />
      </FlexEvenly>
    </Box>
  )
}
