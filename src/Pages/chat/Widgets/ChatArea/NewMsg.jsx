import { Box } from '@mui/material'
import React from 'react'
import Messages from './Messages'

const NewMsg = ({ msgList ,loading}) => {
  return (
    <>
      <Box width={'100%'}>
        <Messages loading={loading} msgLst={msgList} />
      </Box>{' '}
    </>
  )
}

export default NewMsg
