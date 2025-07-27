import { Box } from '@mui/material';
import type { SelectedParts } from '../App';

interface AvatarPreviewProps {
  selectedParts: SelectedParts;
}

const AvatarPreview = ({ selectedParts }: AvatarPreviewProps) => {
  const partOrder = ['body', 'clothes', 'face', 'hair']; // Define the stacking order

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      {partOrder.map((category) => {
        const partPath = selectedParts[category];
        if (!partPath) return null;

        return (
          <img
            key={category}
            src={`/src/assets/svg/${partPath}`}
            alt={category}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%' 
            }}
          />
        );
      })}
    </Box>
  );
};

export default AvatarPreview;