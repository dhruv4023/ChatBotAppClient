import React, { useEffect, useRef, useState } from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import FlexBetween from '../../../Components/FlexBetween'
import WriteMsg from './ChatArea/WriteMsg'
import NewMsg from './ChatArea/NewMsg'

const ChatBox = ({ collectionName }) => {
  const msgContainerRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [msgList, setMessages] = useState([
    { answer: `Greetings! 🌐 I'm your Chat Bot.` }
  ])

  useEffect(() => {
    const container = msgContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight - container.clientHeight
      const observer = new MutationObserver(() => {
        container.scrollTop = container.scrollHeight - container.clientHeight
      })
      observer.observe(container, {
        attributes: true,
        childList: true,
        subtree: true
      })

      return () => {
        observer.disconnect() // Cleanup observer when component unmounts
      }
    }
  }, [collectionName, loading])

  return (
    <WidgetWrapper>
      <FlexBetween
        ref={msgContainerRef}
        height={'55vh'}
        flexDirection={'column'}
        overflow={'auto'}
      >
        <NewMsg loading={loading} msgList={msgList} />
      </FlexBetween>
      <FlexBetween>
        <WriteMsg
          loading={loading}
          setLoading={setLoading}
          collectionName={collectionName}
          setMessages={setMessages}
          msgList={msgList}
        />
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default ChatBox
