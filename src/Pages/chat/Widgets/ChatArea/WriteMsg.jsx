import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { MyBtn } from '../../../../Components/MyComponents'
import FlexBetween from '../../../../Components/FlexBetween'

const WriteMsg = ({ CID, socket }) => {
  const [val, setVal] = useState('')
  const handleSendMess = e => {
    e.preventDefault()
    setVal("")
    socket.send(
      JSON.stringify({
        type: 'message',
        chatRoomId: CID,
        content: val
      })
    )
  }
  return (
    <form onSubmit={handleSendMess} style={{ width: '100%' }}>
      <FlexBetween width={'100%'}>
        <TextField
          fullWidth
          type='text'
          placeholder='Type here...'
          onChange={e => setVal(e.target.value)}
          value={val}
        />
        <MyBtn fullwidth={false} label='Send' />
      </FlexBetween>
    </form>
  )
}

export default WriteMsg
