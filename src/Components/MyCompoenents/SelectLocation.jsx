import { useTheme } from '@emotion/react'
import { Autocomplete, Box, Button, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexEvenly from '../FlexEvenly'

const SelectLocation = ({ location, inputValues }) => {
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

export default SelectLocation
