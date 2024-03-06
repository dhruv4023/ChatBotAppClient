import React, { useEffect, useState } from 'react'
import WidgetWrapper from '../../Components/WidgetWrapper'
import { ChatSharp } from '@mui/icons-material'
import MyTitle from '../../Components/MyCompoenents/MyTitle'
import FlexBetween from '../../Components/FlexBetween'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllChatsData } from './homepage.api'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading'
import { setChats } from '../../state'
import MyLogin from '../../Components/MyCompoenents/MyLogin'

const ChatButtonsWidget = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const [chats, setChatsData] = useState(useSelector(state => state.chats))
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && !chats) {
          const data = await fetchAllChatsData({ token, page })
          if (data.success) {
            setChatsData(data)
            dispatch(setChats({ chats: data }))
          } else {
            setChatsData(false)
          }
        }
      } catch (error) {
        console.error('Error fetching chat data:', error)
        setChatsData(false)
      }
    }
    fetchData()
  }, [chats, dispatch, page, token])

  return (
    <WidgetWrapper>
      <MyTitle
        txt={
          <FlexBetween margin={1}>
            <ChatSharp />
            Chats
            <Box flexGrow={1} />
          </FlexBetween>
        }
      />
      <FlexBetween gap={1} flexDirection={'column'}>
        {chats ? (
          <>
            <Button onClick={() => navigate('/chat-with-pdf')}>
              Chat with your PDFs
            </Button>
            {chats.page_data.map(chat => (
              <Button
                key={chat.collectionName}
                onClick={() => navigate(`/chat/${chat.collectionName}`)}
              >
                {chat.title}
              </Button>
            ))}
          </>
        ) : chats === false ? (
          <MyLogin txt={'Login to access chats'} />
        ) : (
          <Loading />
        )}
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default ChatButtonsWidget
