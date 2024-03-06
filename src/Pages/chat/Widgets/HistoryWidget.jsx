import React, { useEffect, useState } from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import FlexBetween from '../../../Components/FlexBetween'
import { DeleteForever, History } from '@mui/icons-material'
import MyTitle from '../../../Components/MyCompoenents/MyTitle'
import { deleteQuestion, getChatHistory } from '../API/chatHistory.api'
import { useSelector } from 'react-redux'
import { Box, Button, Divider } from '@mui/material'
import Loading from '../../../Components/Loading/Loading'
import MarkdownComponent from '../../../Components/MarkdownComponent'

const HistoryWidget = () => {
  const token = useSelector(s => s.token)
  const [historyData, setHistory] = useState(null)

  useEffect(() => {
    if (!historyData) {
      getChatHistory({ page: 1, limit: 10, token }).then(data => {
        setHistory(data)
      })
    }
  }, [historyData, token])

  const handleDelete = questionId => {
    deleteQuestion({ questionId, token }).then(() => {
      setHistory(prevHistoryData => ({
        ...prevHistoryData,
        page_data: prevHistoryData.page_data.filter(
          item => item._id !== questionId
        )
      }))
    })
  }

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection='column'>
        <FlexBetween>
          <MyTitle
            txt={
              <>
                <History /> Your Previous Questions
              </>
            }
          />
        </FlexBetween>
        <Box width='100%'>
          {historyData ? (
            historyData.success === false ? (
              <>{historyData.message}</>
            ) : (
              historyData.page_data.map(question => (
                <QA
                  key={question._id}
                  data={question}
                  handleDelete={handleDelete}
                />
              ))
            )
          ) : (
            <Loading />
          )}
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default HistoryWidget

const QA = ({ data, handleDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const toggleAnswer = () => setShowAnswer(prevShowAnswer => !prevShowAnswer)

  return (
    <>
      <Divider />
      <FlexBetween>
        <Button fullWidth onClick={toggleAnswer}>
          {data.question}
        </Button>
        <Button sx={{ color: 'red' }} onClick={() => handleDelete(data._id)}>
          <DeleteForever />
        </Button>
      </FlexBetween>
      {showAnswer && (
        <>
          <Box fullWidth>
            {/* <MarkdownComponent markdownContent={data.answer}/> */}
            {data.answer}
          </Box>
        </>
      )}
    </>
  )
}
