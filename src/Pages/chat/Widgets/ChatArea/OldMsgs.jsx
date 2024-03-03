import React from 'react'
import Messages from './Messages'
import { Box } from '@mui/material'

const OldMsgs = ({ messages }) => {
  return (
    <Box width={'100%'}>
      <Messages msgLst={messages} />
    </Box>
  )
}

export default OldMsgs
