import { Container, Grid, Typography, Box } from '@mui/material';

import AvatarPreview from './components/AvatarPreview';
import PartSelector from './components/PartSelector';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SVG Avatar Generator
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AvatarPreview />
          </Grid>
          <Grid item xs={12} md={6}>
            <PartSelector />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;