import { Box } from '@mui/system'

const UserImg = ({ image, size = '60px' }) => {
  return (
    <Box display={'flex'}>
      <img
        style={{
          margin: 'auto',
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        height={size}
        width={size}
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
