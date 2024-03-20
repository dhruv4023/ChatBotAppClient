import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Box, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import WidgetWrapper from '../../../Components/WidgetWrapper'
import FlexBetween from '../../../Components/FlexBetween'
import { useTheme } from '@emotion/react'
import { createTmpChain } from '../API/chats.api'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Components/Loading/Loading'
import MyButton from '../../../Components/MyCompoenents/MyButton'
import { setUploadedFiles } from '../../../state'

const UploadDocuments = ({ setIsChainCreated }) => {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    files: []
  })
  const [loading, setLoading] = useState(false)

  const handlePdfFiles = acceptedFiles => {
    setValues({ ...values, files: acceptedFiles })
  }

  const token = useSelector(state => state.token)
  const uploadedFiles = useSelector(state => state.uploadedFiles) // Existing uploaded files

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const uploadedFileNames = values.files.map(file => file.name) // Extract file names
      await createTmpChain({ token, values })
      setIsChainCreated(true)
      dispatch(
        setUploadedFiles({
          uploadedFiles: uploadedFileNames
        })
      )
    } catch (error) {
      console.error('Error uploading documents:', error)
      alert('Failed to upload documents.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <WidgetWrapper marginTop={'0.5rem'}>
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
                <Typography>Add PDF Files Here</Typography>
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
        <MyButton disabled={loading} label='Add PDF file/s' />
      </form>
      <FlexBetween flexDirection={'column'} gap={1}>
        {uploadedFiles ? (
          uploadedFiles.map(m => {
            return <Box>{m}</Box>
          })
        ) : (
          <>No files uploaded</>
        )}
      </FlexBetween>
      {loading && <Loading />}
    </WidgetWrapper>
  )
}

export default UploadDocuments
