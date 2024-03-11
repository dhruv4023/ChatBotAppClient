import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MyButton from '../../../../Components/MyCompoenents/MyButton'
import FlexBetween from '../../../../Components/FlexBetween'
import { sendQuestion } from '../../API/chatbot.api'

const WriteMsg = ({
  collectionName,
  setMessages,
  msgList,
  setLoading,
  loading
}) => {
  const [val, setVal] = useState('')
  const token = useSelector(state => state.token)

  const handleSendMess = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const startTime = performance.now()
      msgList.push({ question: val })
      setMessages([...msgList])

      const response = await sendQuestion({
        question: val,
        token,
        collectionName
      })
      console.log(response)
      msgList.push({ answer: String(response.data || response.message) })
      const endTime = performance.now()
      const elapsedTime = (endTime - startTime) / 1000
      msgList.push({ answer: `Taken: ${elapsedTime.toFixed(2)} seconds` })

      setMessages(msgList)
    } catch (error) {
      console.error('Error sending question:', error)
      alert('Failed to send question.')
    } finally {
      setLoading(false)
    }

    setVal('')
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
