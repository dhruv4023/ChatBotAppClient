import React, { useState } from 'react'
import WidgetWrapper from '../../Components/WidgetWrapper'
import { ChatSharp } from '@mui/icons-material'
import MyTitle from '../../Components/MyCompoenents/MyTitle'
import FlexBetween from '../../Components/FlexBetween'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ChatButtonsWidget = () => {
  const navigate = useNavigate()
  const [chats, setChats] = useState(['lawchat'])

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
        <Button onClick={() => navigate('/chat-with-pdf')}>
          Chat with your pdfs
        </Button>
        {chats.map(m => (
          <Button onClick={() => navigate(`/chat/${m}`)}>
            Chat with Legal Ducuments
          </Button>
        ))}
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default ChatButtonsWidget
