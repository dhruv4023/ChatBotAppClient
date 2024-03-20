import React, { useEffect, useState } from 'react'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import ChatBox from './Widgets/ChatBox'
import HistoryWidget from './Widgets/HistoryWidget'
import UploadDocuments from './Widgets/UploadDocuments'
import { useSelector } from 'react-redux'
import WidgetWrapper from '../../Components/WidgetWrapper'

const ChatWithPdf = () => {
  const uploadedFiles = useSelector(s => s.uploadedFiles)
  const [isChainCreated, setIsChainCreated] = useState(uploadedFiles !== null)
  useEffect(() => {}, [isChainCreated])

  return (
    <WidgetsOnPage
      title='Chat With Your PDFs'
      leftComponent={
        <>
          <HistoryWidget />
          <UploadDocuments setIsChainCreated={setIsChainCreated} />
        </>
      }
      rightComponent={
        isChainCreated ? (
          <ChatBox />
        ) : (
          <WidgetWrapper>Add PDF files to start chat</WidgetWrapper>
        )
      }
    />
  )
}

export default ChatWithPdf
