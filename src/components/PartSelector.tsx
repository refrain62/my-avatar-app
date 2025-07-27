import { Tabs, Tab, ImageList, ImageListItem } from '@mui/material';
import { useState } from 'react';

const categories = ['body', 'hair', 'face', 'clothes'];

const PartSelector = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange}>
        {categories.map((category) => (
          <Tab key={category} label={category} />
        ))}
      </Tabs>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {/* This will be populated with SVG parts later */}
        <ImageListItem>
          <img
            src={`https://via.placeholder.com/150?text=Part1`}
            alt="Part 1"
            loading="lazy"
          />
        </ImageListItem>
        <ImageListItem>
          <img
            src={`https://via.placeholder.com/150?text=Part2`}
            alt="Part 2"
            loading="lazy"
          />
        </ImageListItem>
      </ImageList>
    </div>
  );
};

export default PartSelector;
