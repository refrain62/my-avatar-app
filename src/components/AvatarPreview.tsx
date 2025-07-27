import { Box } from '@mui/material';

const AvatarPreview = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      <img 
        src="https://via.placeholder.com/400?text=Body"
        alt="Body"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <img 
        src="https://via.placeholder.com/400?text=Face"
        alt="Face"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
      <img 
        src="https://via.placeholder.com/400?text=Hair"
        alt="Hair"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default AvatarPreview;
