import React from 'react'
import Markdown from 'markdown-to-jsx'
import { Typography } from '@mui/material'

const MarkdownComponent = ({ markdownContent }) => {
  return (
    <div className='markdown-container'>
      <Markdown
        options={{
          overrides: {
            h1: {
              component: Typography,
              props: {
                variant: 'h1',
                style: { fontFamily: 'Arial' } // Change font family here
              }
            }
          }
        }}
      >
        {markdownContent}
      </Markdown>
    </div>
  )
}

export default MarkdownComponent
