/**
 * 選択されたアバターパーツの状態を管理するための型定義。
 * キーはパーツのカテゴリ（例: 'body', 'hair'）、値は選択されたSVGファイルのパス。
 */
export type SelectedParts = {
  [key: string]: string;
};
