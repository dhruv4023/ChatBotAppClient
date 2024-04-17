import React, { useEffect, useState } from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import FlexBetween from '../../../Components/FlexBetween'
import { DeleteForever, History } from '@mui/icons-material'
import MyTitle from '../../../Components/MyCompoenents/MyTitle'
import { deleteQuestion, getChatHistory } from '../API/chatHistory.api'
import { useSelector } from 'react-redux'
import { Box, Button, Divider } from '@mui/material'
import Loading from '../../../Components/Loading/Loading'
import Pagination from '../../../Components/Pagination'
import { MessageContent } from './ChatArea/Messages'

const HistoryWidget = () => {
  const token = useSelector(state => state.token)
  const [historyData, setHistory] = useState(null)
  const [page, setPage] = useState(1)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getChatHistory({ page, limit: 5, token })
        if (response.success) setHistory(response.data)
        else setHistory(response)
      } catch (error) {
        console.error('Error fetching chat history:', error)
      }
    }

    fetchHistory()
  }, [page, token])

  const handleDelete = async questionId => {
    try {
      await deleteQuestion({ questionId, token })
      setHistory(prevHistoryData => ({
        ...prevHistoryData,
        page_data: prevHistoryData.page_data.filter(
          item => item._id !== questionId
        )
      }))
    } catch (error) {
      console.error('Error deleting question:', error)
    }
  }

  const toggleAnswer = questionId => {
    setSelectedQuestion(prevSelectedQuestion =>
      prevSelectedQuestion === questionId ? null : questionId
    )
  }
console.log(historyData)
  return (
    <WidgetWrapper>
      <FlexBetween flexDirection='column'>
        <FlexBetween>
          <MyTitle
            txt={
              <>
                <History /> Your all previous questions
              </>
            }
          />
        </FlexBetween>
        {historyData?.page_information && (
          <Pagination
            page={page}
            setPage={setPage}
            metadata={historyData.page_information}
          />
        )}
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
                  showAnswer={selectedQuestion === question._id}
                  toggleAnswer={() => toggleAnswer(question._id)}
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

const QA = ({ data, handleDelete, showAnswer, toggleAnswer }) => {
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
        <MessageContent msg={data.answer} style={{}} maxWidth={'100%'} />
      )}
    </>
  )
}

export default HistoryWidget
