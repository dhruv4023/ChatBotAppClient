import React, { useEffect, useState } from 'react'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import ChatBox from './Widgets/ChatBox'
import HistoryWidget from './Widgets/HistoryWidget'
import UploadDocuments from './Widgets/UploadDocuments'

const ChatWithPdf = () => {
  const [isChainCreated, setIsChainCreated] = useState(false)
  useEffect(() => {}, [isChainCreated])
console.log(isChainCreated)
  return (
    <WidgetsOnPage
      title={'Chat With Your PDFs'}
      leftComponent={
        <>
          <HistoryWidget />
        </>
      }
      rightComponent={
        <>
          {isChainCreated ? (
            <ChatBox />
          ) : (
            <UploadDocuments setIsChainCreated={setIsChainCreated} />
          )}
        </>
      }
    />
  )
}

export default ChatWithPdf
