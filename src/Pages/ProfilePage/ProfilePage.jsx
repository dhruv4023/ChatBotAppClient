// Import necessary dependencies and components
import Loading from '../../Components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import EditProfileWidget from './Widgets/EditProfileWidget'
import UserWidgets from './Widgets/UserWidgets'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import AllChat from './Widgets/AllChat'
import { getUser } from './User.api'

// Define the ProfilePage component
export const ProfilePage = () => {
  const { UID } = useParams()
  const admin = useSelector(state => state.user)
  const [editProf, setEditProf] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  // Use the useEffect hook to fetch user data based on the UID parameter
  useEffect(() => {
    UID &&
      !user &&
      getUser(UID).then(data => {
        data ? setUser(data) : navigate('/404', { state: 'Profile Not Found' })
      })
  }, [UID])

  return (
    <>
      {user ? (
        <>
          <WidgetsOnPage
            leftComponent={
              <LeftComponents
                user={user}
                UID={UID}
                admin={admin}
                setEditProf={setEditProf}
              />
            }
            rightComponent={
              <RightComponents
                UID={UID}
                admin={admin}
                user={user}
                editProf={editProf}
                setEditProf={setEditProf}
              />
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

const LeftComponents = ({ setEditProf, UID, admin, user }) => {
  return (
    <>
      {user ? (
        // Render UserWidgets component with specific props
        <UserWidgets
          setEditProf={setEditProf}
          user={admin?.username === UID ? admin : user}
          admin={admin?.username === UID}
        />
      ) : (
        // Render Loading component while user data is being fetched
        <Loading />
      )}
    </>
  )
}

const RightComponents = ({ user, editProf, setEditProf, UID, admin }) => {
  // const [refreshPage, setRefreshPage] = useState(true)
  return (
    <>
      {editProf ? (
        <>
          <EditProfileWidget setEditProf={setEditProf} user={user} />
          {/* Render EditProfileWidget component with specific props */}
        </>
      ) : (
        <>
     
        </>
      )}
    </>
  )
}
