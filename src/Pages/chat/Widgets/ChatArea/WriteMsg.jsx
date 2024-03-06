import { TextField } from '@mui/material'
import React, { useState } from 'react'
import FlexBetween from '../../../../Components/FlexBetween'
import { sendQuetion } from '../../API/chatbot.api'
import { useSelector } from 'react-redux'
import MyButton from '../../../../Components/MyCompoenents/MyButton'

const WriteMsg = ({ collectionName, setMessages, msgList, setLoading, loading }) => {
  const [val, setVal] = useState('')
  const token = useSelector(s => s.token)
  const handleSendMess = e => {
    e.preventDefault()
    setVal('')
    setLoading(true)
    msgList.push({ question: val })
    setMessages(msgList)
    const startTime = performance.now()
    sendQuetion({ question: val, token, collectionName })
      .then(d => {
        msgList.push({ answer: String(d) })
        setMessages(msgList)
      })
      .finally(() => {
        const endTime = performance.now()
        const elapsedTime = endTime - startTime
        msgList.push({
          answer:
            'Taken: ' + String(elapsedTime.toFixed(2) / 1000) + ' seconds'
        })
        setMessages(msgList)
        setLoading(false)
      })
  }
  return (
    <form onSubmit={handleSendMess} style={{ width: '100%' }}>
      <FlexBetween width={'100%'}>
        <TextField
          fullWidth
          disabled={loading}
          type='text'
          placeholder='Type here...'
          onChange={e => setVal(e.target.value)}
          value={val}
        />
        <MyButton disabled={loading} fullwidth={false} label='Send' />
      </FlexBetween>
    </form>
  )
}

export default WriteMsg
