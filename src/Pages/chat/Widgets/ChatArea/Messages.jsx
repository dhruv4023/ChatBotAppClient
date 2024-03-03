import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import FlexBetween from '../../../../Components/FlexBetween'
import { useTheme } from '@emotion/react'
export default function Messages ({ msgLst }) {
  const user = useSelector(s => s.user)

  const { palette } = useTheme()
  return (
    <>
      {msgLst.map((m, i) => (
        <Box key={i}>
          {m.sender === user?._id ? (
            <FlexBetween>
              <Box />
              <MessageContent
                msg={m}
                style={{
                  color: palette.primary.dark,
                  background: palette.neutral.light
                }}
              />
            </FlexBetween>
          ) : (
            <FlexBetween>
              <MessageContent
                msg={m}
                style={{
                  background: palette.neutral.light
                }}
              />
            </FlexBetween>
          )}
        </Box>
      ))}
    </>
  )
}

const MessageContent = ({ msg, style }) => {
  return (
    <Typography
      style={style}
      borderRadius={'0.5rem'}
      padding={'0.5rem'}
      margin={'0.2rem'}
      maxWidth={'70%'}
    >
      {msg.content}
    </Typography>
  )
}
