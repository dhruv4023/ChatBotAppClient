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
import FlexEvenly from '../../../Components/FlexEvenly'

const HistoryWidget = () => {
  const token = useSelector(s => s.token)
  const [historyData, setHistory] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => {
    getChatHistory({ page, limit: 10, token }).then(data => {
      setHistory(data)
      console.log(data)
    })
  }, [page, token])

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

  // console.log(historyData)

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
        {historyData?.page_information && (
          <Pagination
            setPage={setPage}
            metadata={historyData?.page_information}
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
          <Box width={'100%'}>
            {/* <MarkdownComponent markdownContent={data.answer}/> */}
            {data.answer}
          </Box>
        </>
      )}
    </>
  )
}

const Pagination = ({ metadata, setPage }) => {
  return (
    <FlexEvenly>
      {Array.from({ length: metadata.last_page }, (_, index) => index + 1).map(
        n => (
          <Button onClick={() => setPage(n)}>{n}</Button>
        )
      )}
    </FlexEvenly>
  )
}

export default HistoryWidget
