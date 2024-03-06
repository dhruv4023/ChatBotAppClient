import { Box } from '@mui/system'

const UserImg = ({ image, size = '60px' }) => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <img
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          width: size,
          height: size
        }}
        alt='userImage'
        src={
          image
            ? `${process.env.REACT_APP_CLOUDINARY_IMG}/${image}`
            : '/assets/defaultUserPic.png'
        }
      />
    </Box>
  )
}

export default UserImg
