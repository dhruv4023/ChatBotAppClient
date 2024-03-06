import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import ChatBox from './Widgets/ChatBox'
import HistoryWidget from './Widgets/HistoryWidget'
import { useSelector } from 'react-redux'
import { fetchOneChatData } from './API/chats.api'

const RenderChat = () => {
  const { collectionName } = useParams()
  const chats = useSelector(s => s.chats)
  const token = useSelector(s => s.token)
  const [chatsData, setChatsData] = useState(
    chats?.page_data?.filter(f => f.collectionName === collectionName)[0]
  )
  useEffect(() => {
    !chats &&
      fetchOneChatData({ token, collectionName }).then(d => {
        if (false === d.success) alert(d.message)
        else {
          setChatsData(d)
        }
      })
  }, [chats, collectionName, token])

  return (
    <>
      <>
        <WidgetsOnPage
          title={chatsData?.title}
          leftComponent={
            <>
              <HistoryWidget />
            </>
          }
          rightComponent={
            <>
              <ChatBox collectionName={collectionName} />
            </>
          }
        />
      </>
    </>
  )
}

export default RenderChat
