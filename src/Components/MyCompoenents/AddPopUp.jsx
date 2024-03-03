import { AddRounded, CloseRounded } from '@mui/icons-material'
import { Box } from '@mui/material'
import React from 'react'
import WidgetWrapper from '../WidgetWrapper'
import MyTitle from './MyTitle'
import MyButton from './MyButton'
import { useSelector } from 'react-redux'

const AddPopUp = ({
  title,
  form,
  openAddPopUp,
  setOpenAddPopUp,
  buttonIcon = <AddRounded />,
  buttonComponent = false
}) => {
  const user = useSelector(s => s.user)
  return (
    <>
      <Box position={'fixed'} zIndex={4}>
        {openAddPopUp && (
          <Box
            position={'inherit'}
            bgcolor={'rgba(0,0,0,0.5)'}
            top={0}
            right={0}
            width={'100vw'}
            height={'100vh'}
          >
            <Box width={'100%'} height={'100%'}>
              <WidgetWrapper maxWidth={'30rem'} margin={'auto'} my={20}>
                <MyTitle txt={title} />
                {form}
              </WidgetWrapper>
            </Box>
          </Box>
        )}
        {!buttonComponent && (
          <PopUpButton
            user={user}
            setOpenAddPopUp={setOpenAddPopUp}
            buttonIcon={buttonIcon}
            openAddPopUp={openAddPopUp}
          />
        )}
      </Box>
      {buttonComponent && (
        <PopUpButton
          user={user}
          setOpenAddPopUp={setOpenAddPopUp}
          buttonIcon={buttonIcon}
          openAddPopUp={openAddPopUp}
        />
      )}
    </>
  )
}

export default AddPopUp

const PopUpButton = ({ user, setOpenAddPopUp, buttonIcon, openAddPopUp }) => {
  return (
    <>
      <Box zIndex={5} right={20} bottom={5} position={'inherit'}>
        <MyButton
          onclickHandle={() => {
            user
              ? setOpenAddPopUp(!openAddPopUp)
              : alert('Login to start Auction')
          }}
          fullwidth={false}
          label={openAddPopUp ? <CloseRounded /> : <>{buttonIcon}</>}
          borderRadius={'100%'}
        />
      </Box>
    </>
  )
}
