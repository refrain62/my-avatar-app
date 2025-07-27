import { Container, Grid, Typography, Box } from '@mui/material';

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
            <Box sx={{ border: '1px dashed grey', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography>Avatar Preview</Typography>
            </Box>
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