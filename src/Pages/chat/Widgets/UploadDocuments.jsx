import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Box, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import FlexBetween from '../../../Components/FlexBetween'
import { useTheme } from '@emotion/react'
import { createTmpChain } from '../API/chats.api'
import { useSelector } from 'react-redux'
import Loading from '../../../Components/Loading/Loading'
import MyButton from '../../../Components/MyCompoenents/MyButton'

const UploadDocuments = ({ setIsChainCreated }) => {
  const { palette } = useTheme()
  const [values, setValues] = useState({
    files: []
  })
  const [loading, setLoading] = useState(false)
  const handlePdfFiles = acceptedFiles => {
    setValues({ ...values, files: acceptedFiles })
  }

  const token = useSelector(s => s.token)
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    createTmpChain({ token, values })
      .then(d => {
        // console.log(d.success, d)
        setIsChainCreated(d.success)
      })
      .finally(() => setLoading(false))
  }

  return (
    <WidgetWrapper>
      <form onSubmit={handleSubmit}>
        <Dropzone
          acceptedFiles='.pdf'
          disabled={loading}
          multiple={true}
          onDrop={acceptedFiles => {
            handlePdfFiles(acceptedFiles)
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              {...getRootProps()}
              border={`1px dashed ${palette.primary.main}`}
              textAlign='center'
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              <input {...getInputProps()} />
              {values?.files.length === 0 ? (
                <p>Add PDF Files Here</p>
              ) : (
                values.files.map((file, index) => (
                  <FlexBetween key={index}>
                    <Typography padding={'0.5rem '}>{file.name}</Typography>
                    <EditOutlinedIcon />
                  </FlexBetween>
                ))
              )}
            </Box>
          )}
        </Dropzone>
        <MyButton disabled={loading} label='Start chat with these files' />
      </form>
      {loading && <Loading />}
    </WidgetWrapper>
  )
}

export default UploadDocuments
