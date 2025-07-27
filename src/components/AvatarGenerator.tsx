import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid v2をインポート
import Box from '@mui/material/Box'; // Boxをインポート
import Typography from '@mui/material/Typography'; // Typographyをインポート
import AvatarPreview from './AvatarPreview';
import PartSelector from './PartSelector';
import ExportButton from './ExportButton';

// アバターの各カテゴリに対応するSVGパーツのリスト。
// 現状は仮のデータですが、将来的には動的に読み込むことを想定しています。
// ユーザーは src/assets/svg/** 以下に実際のSVGファイルを配置する必要があります。
const svgParts = {
  body: Array.from({ length: 20 }, (_, i) => `body/body${i + 1}.svg`),
  hair: Array.from({ length: 20 }, (_, i) => `hair/hair${i + 1}.svg`),
  face: Array.from({ length: 20 }, (_, i) => `face/face${i + 1}.svg`),
  clothes: Array.from({ length: 20 }, (_, i) => `clothes/clothes${i + 1}.svg`),
};

import type { SelectedParts } from '../types';

const AvatarGenerator = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({
    body: svgParts.body[0],
    hair: svgParts.hair[0],
    face: svgParts.face[0],
    clothes: svgParts.clothes[0],
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 400, aspectRatio: '1 / 1', mb: 2 }}>
            <AvatarPreview selectedParts={selectedParts} />
          </Box>
          <ExportButton selectedParts={selectedParts} />
        </Grid>
        <Grid xs={12} md={6}>
          <PartSelector
            svgParts={svgParts}
            selectedParts={selectedParts}
            setSelectedParts={setSelectedParts}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, p: 2, border: '1px dashed grey' }}>
        <Typography variant="h6" gutterBottom>
          Debug Info: Selected Parts
        </Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(selectedParts, null, 2)}
        </pre>
      </Box>
    </>
  );
};

export default AvatarGenerator;
