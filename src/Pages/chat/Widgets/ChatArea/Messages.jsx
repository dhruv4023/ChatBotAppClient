import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import FlexBetween from '../../../../Components/FlexBetween'
import { useTheme } from '@emotion/react'
import MarkdownComponent from '../../../../Components/MarkdownComponent'

export default function Messages ({ msgLst, loading }) {
  const { palette } = useTheme()

  return (
    <>
      {msgLst.map((m, i) => (
        <Box key={i}>
          <FlexBetween>
            {m.question && <Box />}
            <MessageContent
              msg={m.question || m.answer} // Simplified condition
              style={{
                color: m.question ? undefined : palette.primary.dark, // Set color only for answers
                background: palette.neutral.light
              }}
            />
          </FlexBetween>
        </Box>
      ))}
      {loading && (
        <FlexBetween>
          <MessageContent
            msg={'Typing...'}
            style={{
              background: palette.neutral.light
            }}
          />
        </FlexBetween>
      )}
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
      {String(msg)
        .split('\n')
        .map((m, i) => {
          return (
            <>
              <p>{m}</p>
            </>
          )
        })}
    </Typography>
  )
}
