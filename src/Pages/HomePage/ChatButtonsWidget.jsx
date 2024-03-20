import React, { useEffect, useState } from 'react'
import WidgetWrapper from '../../Components/WidgetWrapper'
import { ChatSharp } from '@mui/icons-material'
import MyTitle from '../../Components/MyCompoenents/MyTitle'
import FlexBetween from '../../Components/FlexBetween'
import { Box, Button, Icon } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchAllChatsData } from './homepage.api'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Components/Loading/Loading'
import { setChats } from '../../state'
import MyLogin from '../../Components/MyCompoenents/MyLogin'
import FlexEvenly from '../../Components/FlexEvenly'

const ChatButtonsWidget = () => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.token)

  const [chats, setChatsData] = useState(useSelector(state => state.chats))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (token && !chats) {
          const response = await fetchAllChatsData({ token, page: 1 })
          if (response.success) {
            setChatsData(response.data)
            dispatch(setChats({ chats: response.data }))
          } else {
            setChatsData(null)
          }
        }
      } catch (error) {
        console.error('Error fetching chat data:', error)
        setChatsData(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [chats, dispatch, token])

  return (
    <WidgetWrapper width={'100%'}>
      <FlexEvenly>
        <MyTitle
          txt={
            <FlexBetween margin={1}>
              <ChatSharp />
              Get Started with following Chats
              <Box flexGrow={1} />
            </FlexBetween>
          }
        />
      </FlexEvenly>{' '}
      <FlexEvenly flexWrap={'wrap'} padding={'0.2rem'} width={'100%'} gap={1}>
        {chats ? (
          <>
            <ButtonIcon
              public_id={'ChatIcons/pdf_chatbot_ezkbnj'}
              redirect_to={'/chat-with-pdf'}
              txt={'Chat with your PDFs'}
            />
            {chats.page_data.map(chat => (
              <ButtonIcon
                key={chat.collectionName}
                public_id={chat.buttonIcon}
                redirect_to={`/chat/${chat.collectionName}`}
                txt={chat.title}
              />
            ))}
          </>
        ) : !loading ? (
          <MyLogin txt={'Login to access chats'} />
        ) : (
          <Loading />
        )}
      </FlexEvenly>
    </WidgetWrapper>
  )
}

export default ChatButtonsWidget

const ButtonIcon = ({ public_id, redirect_to, txt }) => {
  const navigate = useNavigate()

  return (
    <FlexBetween
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate(redirect_to)}
      flexDirection={'column'}
      width={'13rem'}
    >
      <img
        style={{ borderRadius: '2rem', maxWidth: '100%' }} // Ensure image doesn't exceed its container's width
        src={`${process.env.REACT_APP_CLOUDINARY_IMG}/${public_id}`}
        alt={txt} // Add alt text for accessibility
      />
      <Box>{txt}</Box>
    </FlexBetween>
  )
}
