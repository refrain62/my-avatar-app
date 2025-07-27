import { Container, Typography, Box } from '@mui/material';
import AvatarGenerator from './components/AvatarGenerator';

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          SVG Avatar Generator
        </Typography>
        <AvatarGenerator />
      </Box>
    </Container>
  );
}

export default App;