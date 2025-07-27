import { Tabs, Tab, ImageList, ImageListItem } from '@mui/material';
import { useState } from 'react';
import type { SelectedParts } from '../App';

interface PartSelectorProps {
  svgParts: { [key: string]: string[] };
  selectedParts: SelectedParts;
  setSelectedParts: (parts: SelectedParts) => void;
}

const PartSelector = ({ svgParts, selectedParts, setSelectedParts }: PartSelectorProps) => {
  const categories = Object.keys(svgParts);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handlePartSelect = (category: string, part: string) => {
    setSelectedParts({ ...selectedParts, [category]: part });
  };

  const currentCategory = categories[selectedTab];

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {categories.map((category) => (
          <Tab key={category} label={category} />
        ))}
      </Tabs>
      <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
        {svgParts[currentCategory].map((part) => (
          <ImageListItem key={part} onClick={() => handlePartSelect(currentCategory, part)} sx={{ cursor: 'pointer' }}>
            <img
              src={`/src/assets/svg/${part}`}
              alt={part}
              loading="lazy"
              style={{ border: selectedParts[currentCategory] === part ? '2px solid blue' : 'none' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default PartSelector;