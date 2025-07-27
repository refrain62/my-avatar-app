import { Button } from '@mui/material';
import type { SelectedParts } from '../App';

interface ExportButtonProps {
  selectedParts: SelectedParts;
}

const ExportButton = ({ selectedParts }: ExportButtonProps) => {

  const handleExport = async () => {
    const svgElements: string[] = [];
    const partOrder = ['body', 'clothes', 'face', 'hair'];

    for (const category of partOrder) {
      const partPath = selectedParts[category];
      if (partPath) {
        try {
          const response = await fetch(`/src/assets/svg/${partPath}`);
          const svgText = await response.text();
          // Extract content within <svg> tag using RegExp constructor
          const svgRegex = new RegExp('<svg[^>]*>([\\s\\S]*)<\\/svg>', 'i');
          const content = svgText.match(svgRegex);
          if (content && content[1]) {
            svgElements.push(content[1]);
          }
        } catch (error) {
          console.error(`Failed to fetch SVG part: ${partPath}`, error);
        }
      }
    }

    // Assuming all SVGs share the same dimensions and viewBox
    const combinedSvg = `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">${svgElements.join('\n')}</svg>`;

    const blob = new Blob([combinedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avatar.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="contained" onClick={handleExport} sx={{ mt: 2 }}>
      Export as SVG
    </Button>
  );
};

export default ExportButton;