import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid v2をインポート
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

/**
 * 選択されたアバターパーツの状態を管理するための型定義。
 * キーはパーツのカテゴリ（例: 'body', 'hair'）、値は選択されたSVGファイルのパス。
 */
export type SelectedParts = {
  [key: string]: string;
};

const AvatarGenerator = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({
    body: svgParts.body[0],
    hair: svgParts.hair[0],
    face: svgParts.face[0],
    clothes: svgParts.clothes[0],
  });

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6}>
        <AvatarPreview selectedParts={selectedParts} />
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
  );
};

export default AvatarGenerator;
