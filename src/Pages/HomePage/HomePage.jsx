import React from 'react'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import { Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import ChatButtonsWidget from './ChatButtonsWidget'
const HomePage = () => {
  return (
    <WidgetsOnPage
      title={'Chat with PDFs Application'}
      leftComponent={<ChatButtonsWidget />}
      rightComponent={<RightBar />}
    />
  )
}

export default HomePage

const RightBar = () => {
  const { palette } = useTheme()

  return (
    <Typography
      sx={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: 1.5,
        color: palette.primary.dark
      }}
    >
      Welcome to LLM Chat App, where knowledge meets convenience. Seamlessly
      interact with your uploaded PDFs by posing questions directly to them.
      Additionally, explore our curated selection of pre-configured chats
      conveniently accessible through the button on the left sidebar. Initiate a
      chat with a simple click and delve into your inquiries effortlessly.
      Welcome to a smarter way of engaging with your documents.
    </Typography>
  )
}
