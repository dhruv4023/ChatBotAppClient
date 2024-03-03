import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchChatrooms } from '../User.api'
import Loading from '../../../Components/Loading/Loading'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FlexEvenly from '../../../Components/FlexEvenly'
import MyTitle from '../../../Components/MyCompoenents/MyTitle'

const AllChat = () => {
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const [chats, setChats] = useState()
  useEffect(() => {
    fetchChatrooms(token)
      .then(d => {
        setChats(d)
      })
      .catch(e => alert(e.message))
  }, [setChats, token])
  const navigate = useNavigate()

  return (
    <FlexEvenly flexDirection={'column'} gap={'0.5rem'}>
      {chats ? (
        <>
          <MyTitle txt={'Your Chats'} />
          {chats.map(chat => (
            <WidgetWrapper
              style={{ cursor: 'pointer', width: '100%' }}
              onClick={() => navigate(`/chat/${chat._id}`)}
            >
              <Typography fontSize={'larger'} fontWeight={'bold'}>
                {chat.name}
              </Typography>
              <Box>{chat.users?.filter(f => f !== user._id)}</Box>
            </WidgetWrapper>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </FlexEvenly>
  )
}

export default AllChat
