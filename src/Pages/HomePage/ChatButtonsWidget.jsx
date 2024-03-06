import React, { useEffect, useState } from 'react'
import WidgetWrapper from '../../Components/WidgetWrapper'
import { ChatSharp } from '@mui/icons-material'
import MyTitle from '../../Components/MyCompoenents/MyTitle'
import FlexBetween from '../../Components/FlexBetween'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllChatsData } from './homepage.api.js'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading.jsx'
import { setChats } from '../../state/index.js'
import MyLogin from '../../Components/MyCompoenents/MyLogin.jsx'
const ChatButtonsWidget = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(s => s.token)
  const [chats, setChatsData] = useState()
  const [page, setPage] = useState(1)
  useEffect(() => {
    !chats &&
      fetchAllChatsData({ token, page }).then(d => {
        console.log(d)
        if (false===d.success) setChatsData(d.success)
        else {
          setChatsData(d)
          dispatch(setChats({ chats: d.page_data }))
        }
      })
  }, [chats])
  console.log(chats)
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
              Chat with your pdfs
            </Button>
            {chats.page_data.map(m => (
              <Button
                key={m.collectionName}
                onClick={() => navigate(`/chat/${m.collectionName}`)}
              >
                {m.title}
              </Button>
            ))}
          </>
        ) : chats === false ? (
          <MyLogin txt={'login to access chats'} />
        ) : (
          <Loading />
        )}
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default ChatButtonsWidget
