import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import Loading from '../../Components/Loading/Loading'
import ChatBox from './Widgets/ChatBox'
import { useSelector } from 'react-redux'
import { getUser } from '../ProfilePage/User.api'
import FlexBetween from '../../Components/FlexBetween'
import { IconButton } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'

const RenderChat = () => {
  const { chatId } = useParams()
  const token = useSelector(s => s.token)
  const user = useSelector(s => s.user)
  const navigate = useNavigate()
  const [socket, setSocket] = useState()
  const [chatData, setChatData] = useState()

  // useEffect(() => {
  //   const socket = io(process.env.REACT_APP_WS) // Connect to the server

  //   socket.auth = { token, chatRoomId: CID }

  //   // Log a message when the connection is established
  //   socket.on('connect', () => {
  //     console.log('Connected to server')
  //     setSocket(socket)
  //   })

  //   // Clean up the socket connection when the component unmounts
  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])

  return (
    <>
      <>
        <WidgetsOnPage title={chatId}
         rightComponent={<></>} />
      </>
    </>
  )
}

export default RenderChat
