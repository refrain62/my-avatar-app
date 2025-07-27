import { Box } from '@mui/material';
import type { SelectedParts } from '../App';

interface AvatarPreviewProps {
  selectedParts: SelectedParts;
}

/**
 * 選択されたSVGパーツを重ねて表示し、アバターのプレビューを行うコンポーネント。
 * @param {AvatarPreviewProps} props - コンポーネントのプロパティ。
 * @param {SelectedParts} props.selectedParts - 現在選択されているアバターパーツのオブジェクト。
 */
const AvatarPreview = ({ selectedParts }: AvatarPreviewProps) => {
  // パーツの重ね順を定義。この順序でSVGが描画されます。
  const partOrder = ['body', 'clothes', 'face', 'hair'];

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