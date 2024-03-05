import { Box, Typography } from '@mui/material'
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
          {m['question'] ? (
            <FlexBetween>
              <Box />
              <MessageContent
                msg={m['question']}
                style={{
                  background: palette.neutral.light
                }}
              />
            </FlexBetween>
          ) : (
            <FlexBetween>
              <MessageContent
                msg={m['answer']}
                style={{
                  color: palette.primary.dark,
                  background: palette.neutral.light
                }}
              />
            </FlexBetween>
          )}
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
      {/* <MarkdownComponent markdownContent={msg}/> */}
      {msg}
    </Typography>
  )
}
