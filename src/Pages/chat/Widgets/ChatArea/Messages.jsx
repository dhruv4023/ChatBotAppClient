import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FlexBetween from '../../../../Components/FlexBetween'
import { useTheme } from '@emotion/react'

export default function Messages ({ msgLst, loading, sampleQ }) {
  const { palette } = useTheme()

  return (
    <>
      {msgLst.map((m, i) => (
        <Box key={i}>
          <FlexBetween>
            {m.question && <Box />}
            <MessageContent
              msg={m.question || m.answer}
              style={{
                color: m.question ? undefined : palette.primary.dark,
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

export const MessageContent = ({ msg, style, maxWidth = '70%' }) => {
  return (
    <Box
      sx={style}
      borderRadius={'0.5rem'}
      padding={'0.5rem'}
      margin={'0.2rem'}
      maxWidth={maxWidth}
    >
      {String(msg)
        .split('\n')
        .map((m, i) => {
          return <Typography key={i}>{m}</Typography>
        })}
    </Box>
  )
}
