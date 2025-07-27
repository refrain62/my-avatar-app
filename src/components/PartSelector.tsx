import { Box, Tabs, Tab, ImageList, ImageListItem } from '@mui/material';
import { useState } from 'react';
import type { SelectedParts } from '../types';

interface PartSelectorProps {
  svgParts: { [key: string]: string[] };
  selectedParts: SelectedParts;
  setSelectedParts: (parts: SelectedParts) => void;
}

/**
 * アバターパーツのカテゴリと個々のパーツを選択するためのUIを提供するコンポーネント。
 * MUIのTabsとImageListを使用して、パーツの選択を可能にします。
 * @param {PartSelectorProps} props - コンポーネントのプロパティ。
 * @param {Object.<string, string[]>} props.svgParts - カテゴリごとのSVGパーツのリスト。
 * @param {SelectedParts} props.selectedParts - 現在選択されているアバターパーツのオブジェクト。
 * @param {(parts: SelectedParts) => void} props.setSelectedParts - 選択されたパーツを更新するためのコールバック関数。
 */
const PartSelector = ({ svgParts, selectedParts, setSelectedParts }: PartSelectorProps) => {
  // svgPartsオブジェクトのキーからカテゴリのリストを生成
  const categories = Object.keys(svgParts);
  // 現在選択されているタブ（カテゴリ）の状態を管理
  const [selectedTab, setSelectedTab] = useState(0);

  /**
   * タブが変更されたときに呼び出されるハンドラ。
   * @param {React.SyntheticEvent} _event - イベントオブジェクト。
   * @param {number} newValue - 新しく選択されたタブのインデックス。
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  /**
   * パーツが選択されたときに呼び出されるハンドラ。
   * 選択されたパーツを親コンポーネントに伝播します。
   * @param {string} category - 選択されたパーツのカテゴリ。
   * @param {string} part - 選択されたパーツのファイルパス。
   */
  const handlePartSelect = (category: string, part: string) => {
    setSelectedParts({ ...selectedParts, [category]: part });
  };

  // 現在選択されているカテゴリに対応するパーツのリストを取得
  const currentCategory = categories[selectedTab];

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {categories.map((category) => (
          <Tab key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} />
        ))}
      </Tabs>
      <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={120}>
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
    </Box>
  );
};

export default PartSelector;