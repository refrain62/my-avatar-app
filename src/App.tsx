import { useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import AvatarPreview from './components/AvatarPreview';
import PartSelector from './components/PartSelector';
import ExportButton from './components/ExportButton'; // Import the new component

// 仮のSVGパーツリスト。後で動的に読み込むように変更します。
// IMPORTANT: ユーザーは src/assets/svg/** に実際のファイルを配置する必要があります。
const svgParts = {
  body: ['body/body1.svg', 'body/body2.svg'],
  hair: ['hair/hair1.svg', 'hair/hair2.svg'],
  face: ['face/face1.svg', 'face/face2.svg'],
  clothes: ['clothes/clothes1.svg', 'clothes/clothes2.svg'],
};

export type SelectedParts = {
  [key: string]: string;
};

function App() {
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({
    body: svgParts.body[0],
    hair: svgParts.hair[0],
    face: svgParts.face[0],
    clothes: svgParts.clothes[0],
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SVG Avatar Generator
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AvatarPreview selectedParts={selectedParts} />
            <ExportButton selectedParts={selectedParts} /> {/* Add the button here */}
          </Grid>
          <Grid item xs={12} md={6}>
            <PartSelector
              svgParts={svgParts}
              selectedParts={selectedParts}
              setSelectedParts={setSelectedParts}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
