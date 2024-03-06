import React, { useEffect, useState } from 'react'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import FlexBetween from '../../../Components/FlexBetween'
import { DeleteForever, History } from '@mui/icons-material'
import MyTitle from '../../../Components/MyCompoenents/MyTitle'
import { deleteQuestion, getChatHistory } from '../API/chatHistory.api'
import { useSelector } from 'react-redux'
import { Box, Button, Divider } from '@mui/material'
import Loading from '../../../Components/Loading/Loading'

const HistoryWidget = () => {
  const [page, setPage] = useState(1)
  const token = useSelector(s => s.token)
  const [historyData, setHistory] = useState()
  useEffect(() => {
    !historyData &&
      getChatHistory({ page, limit: 10, token }).then(d => {
        setHistory(d)
      })
  }, [historyData, setHistory])

  return (
    <WidgetWrapper>
      <FlexBetween flexDirection={'column'}>
        <FlexBetween>
          <MyTitle
            txt={
              <>
                <History /> Your Previous Quetions
              </>
            }
          />
        </FlexBetween>
        <Box width={'100%'}>
          {historyData ? (
            false === historyData.success ? (
              <>{historyData.message}</>
            ) : (
              historyData.page_data.map(m => (
                <QA
                  key={m._id}
                  data={m}
                  token={token}
                  setHistory={setHistory}
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

const QA = ({ data, token, setHistory }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const toggleAnswer = () => setShowAnswer(!showAnswer)

  const handleDelete = () =>
    deleteQuestion({ questionId: data._id, token }).then(() => setHistory())

  return (
    <>
      <FlexBetween>
        <Button fullWidth onClick={toggleAnswer}>
          {data.question}
        </Button>
        <Button sx={{ color: 'red' }} onClick={handleDelete}>
          <DeleteForever />
        </Button>
      </FlexBetween>
      {showAnswer && (
        <>
          <Box fullWidth>{data.answer}</Box>
          <Divider />
        </>
      )}
    </>
  )
}
