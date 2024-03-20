import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import ChatBox from './Widgets/ChatBox'
import HistoryWidget from './Widgets/HistoryWidget'
import { useSelector } from 'react-redux'
import { fetchOneChatData } from './API/chats.api'

const RenderChat = () => {
  const { collectionName } = useParams()
  const chats = useSelector(state => state.chats)
  const token = useSelector(state => state.token)
  const [chatsData, setChatsData] = useState(null) // Initialize chatsData as null

  useEffect(() => {
    if (!chats) {
      fetchOneChatData({ token, collectionName })
        .then(data => {
          if (!data.success) {
            alert(data.message)
          } else {
            setChatsData(data)
          }
        })
        .catch(error => {
          console.error('Error fetching chat data:', error)
          alert('Failed to fetch chat data. Please try again later.')
        })
    } else {
      // If chats already exist in state, filter chatsData based on collectionName
      const filteredChatData = chats.page_data.find(
        chat => chat.collectionName === collectionName
      )
      setChatsData(filteredChatData)
    }
  }, [chats, collectionName, token])

  return (
    <WidgetsOnPage
      title={chatsData?.title || ''} // Provide a fallback value for title in case chatsData is null
      leftComponent={<HistoryWidget />}
      rightComponent={
        <>
          {chatsData && (
            <ChatBox
              collectionName={collectionName}
              sampleQ={chatsData?.sampleQuetions}
            />
          )}
        </>
      }
    />
  )
}

export default RenderChat
