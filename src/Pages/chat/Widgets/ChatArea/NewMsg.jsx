import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Messages from './Messages'

const NewMsg = ({ CID, socket }) => {
  const [msgList, setMsgList] = useState([
    { content: 'hello tmp' },
    { content: 'hello tmp' }
  ])

  useEffect(() => {
    const handleMessage = message => {
      try {
        const data = JSON.parse(message)
        setMsgList(prevMsgList => [...prevMsgList, data])
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    // Add event listener on component mount
    socket.on('message', handleMessage)

    // Remove event listener on component unmount
    return () => {
      socket.off('message', handleMessage)
    }
  }, [socket, setMsgList])

  return (
    <>
      <Box width={'100%'}>
        <Messages msgLst={msgList} />
      </Box>{' '}

    </>
  )
}

export default NewMsg
