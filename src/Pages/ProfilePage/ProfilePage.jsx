// Import necessary dependencies and components
import Loading from '../../Components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import EditProfileWidget from './Widgets/EditProfileWidget'
import UserWidgets from './Widgets/UserWidgets'
import WidgetsOnPage from '../../Components/WidgetsOnPage'
import { getUser } from './User.api'

// Define the ProfilePage component
const ProfilePage = () => {
  const { UID } = useParams()
  const admin = useSelector(state => state.user)
  const [editProf, setEditProf] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  // Use the useEffect hook to fetch user data based on the UID parameter
  useEffect(() => {
    const fetchData = async () => {
      if (UID === admin.username) {
        setUser(admin)
      } else {
        try {
          const { success, data } = await getUser(UID)
          success
            ? setUser(data.user)
            : navigate('/404', { state: 'Profile Not Found' })
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Handle error, maybe set a default state or show an error message
        }
      }
    }

    fetchData()
  }, [UID])

  // console.log(user)
  return (
    <>
      {user ? (
        <>
          <WidgetsOnPage
            leftComponent={
              <LeftComponents
                user={user}
                admin={UID === admin.username}
                setEditProf={setEditProf}
              />
            }
            rightComponent={
              <RightComponents
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

const LeftComponents = ({ setEditProf, user, admin }) => {
  return (
    <>
      {user ? (
        <UserWidgets setEditProf={setEditProf} user={user} admin={admin} />
      ) : (
        <Loading />
      )}
    </>
  )
}

const RightComponents = ({ user, editProf, setEditProf }) => {
  // const [refreshPage, setRefreshPage] = useState(true)
  return (
    <>
      {editProf ? (
        <>
          <EditProfileWidget setEditProf={setEditProf} user={user} />
          {/* Render EditProfileWidget component with specific props */}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProfilePage
