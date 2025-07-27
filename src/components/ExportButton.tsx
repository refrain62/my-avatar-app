import { Button } from '@mui/material';
import type { SelectedParts } from '../App';

interface ExportButtonProps {
  selectedParts: SelectedParts;
}

/**
 * 現在選択されているアバターパーツを結合し、単一のSVGファイルとしてエクスポートするボタンコンポーネント。
 * @param {ExportButtonProps} props - コンポーネントのプロパティ。
 * @param {SelectedParts} props.selectedParts - 現在選択されているアバターパーツのオブジェクト。
 */
const ExportButton = ({ selectedParts }: ExportButtonProps) => {

  /**
   * エクスポートボタンがクリックされたときに実行される非同期関数。
   * 各SVGパーツをフェッチし、その内容を結合して単一のSVGファイルを生成し、ダウンロードをトリガーします。
   */
  const handleExport = async () => {
    const svgElements: string[] = [];
    // アバターパーツの描画順序を定義。この順序でSVGが結合されます。
    const partOrder = ['body', 'clothes', 'face', 'hair'];

    for (const category of partOrder) {
      const partPath = selectedParts[category];
      if (partPath) {
        try {
          const response = await fetch(`/src/assets/svg/${partPath}`);
          const svgText = await response.text();
          // RegExpコンストラクタを使用して<svg>タグ内のコンテンツを抽出
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

    // すべてのSVGが同じ寸法とviewBoxを共有していると仮定して結合
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