# ReactとTypeScriptによるSVGアバター作成システムの構築ステップ

React.jsとTypeScriptを用いて、パーツ選択式のSVGアバターを生成するシステムの構築ステップと、各過程で考慮すべき点をシステム開発の専門家として、パフォーマンスや保守性も踏まえてリストアップします。

この要件（画像サイズが同じ、位置調整不要）は、システムを大幅にシンプルにするための最良の前提条件です。

---

### 構築の概要

このシステムは、クライアントサイド（ブラウザ）で完結させるのが最も効率的です。サーバーサイドでの画像合成処理は不要なため、システム負荷は主にユーザーのブラウザにかかりますが、SVGの特性上、非常に軽量で済みます。

---

## フェーズ1: プロジェクトのセットアップと素材の準備

最初のステップは、開発環境を整え、アバターパーツを整理することです。

#### やるべきこと

1.  **開発環境の構築**:
    * `create-react-app`や`Vite`を使い、TypeScriptテンプレートでReactプロジェクトを新規作成します。
        * **推奨**: `Vite`はビルドが高速なため、開発体験が向上します。
        * コマンド例: `npm create vite@latest my-avatar-app -- --template react-ts`

2.  **SVGパーツの整理とインポート設定**:
    * `public`フォルダまたは`src/assets`フォルダ内に、パーツごとのディレクトリを作成します。（例: `/public/svg/hair/`, `/public/svg/eyes/`）
    * 各ファイルに一意の命名規則を設けます（例: `hair_01.svg`, `eyes_01.svg`）。これにより、後工程で管理しやすくなります。
    * SVGファイルをReactコンポーネントとして直接インポートするのではなく、画像のURLとして扱うか、後述のエクスポート処理のためにテキストとして読み込めるようにします。`Vite`では `?raw` 接尾辞を使うと、アセットを素の文字列としてインポートできます。（例: `import hairSvg from './assets/hair.svg?raw';`）

3.  **パーツ情報のデータ構造定義**:
    * どのパーツがどのカテゴリに属するかを管理するためのデータ構造をTypeScriptの型と共に定義します。これはシステムの「設計図」になります。
    * **例 (`src/parts.ts`):**
        ```typescript
        export interface AvatarPart {
          id: string; // 'hair_01'
          name: string; // 'ショートヘア'
          category: 'hair' | 'eyes' | 'mouth';
          url: string; // '/svg/hair/hair_01.svg'
        }

        export const partsData: AvatarPart[] = [
          { id: 'hair_01', name: 'ショートヘア', category: 'hair', url: '/svg/hair/hair_01.svg' },
          { id: 'eyes_01', name: 'ぱっちり目', category: 'eyes', url: '/svg/eyes/eyes_01.svg' },
          // ... 他のパーツ
        ];
        ```
    * **重ね順の定義**: 重なり順（z-index）が重要なので、カテゴリの配列を定義して、その順序で描画するようにします。
        ```typescript
        export const layerOrder: ('hair' | 'eyes' | 'mouth')[] = ['mouth', 'eyes', 'hair']; // 例: 口が最下層、髪が最上層
        ```

---

## フェーズ2: 主要コンポーネントの実装

システムの核となる、アバターのプレビューとパーツ選択UIをコンポーネントとして作成します。

#### やるべきこと

1.  **`AvatarPreview` コンポーネントの作成**:
    * 選択された各パーツのSVG画像を重ねて表示するコンポーネントです。
    * 親コンポーネントから、選択されたパーツIDのオブジェクト（例: `{ hair: 'hair_01', eyes: 'eyes_02' }`）をpropsとして受け取ります。
    * CSSの`position: absolute`を使い、すべてのSVGをコンテナ内で重ね合わせます。重ね順はフェーズ1で定義した `layerOrder` に基づいて描画します。
    * **パフォーマンス考慮**: `React.memo` を使用して、propsが変更されない限り再レンダリングされないように最適化します。

    ```tsx
    // AvatarPreview.tsx (簡易版)
    import React from 'react';
    import { layerOrder, partsData } from './parts';

    interface SelectedParts {
      [key: string]: string | null; // { hair: 'hair_01', eyes: 'eyes_01' }
    }

    const AvatarPreview: React.FC<{ selectedParts: SelectedParts }> = ({ selectedParts }) => {
      // プレビュー用のコンテナ
      // 幅と高さはSVG画像のサイズに合わせる
      return (
        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
          {layerOrder.map((category) => {
            const partId = selectedParts[category];
            if (!partId) return null;

            const part = partsData.find(p => p.id === partId);
            if (!part) return null;

            return (
              <img
                key={part.id}
                src={part.url}
                alt={part.name}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            );
          })}
        </div>
      );
    };

    export default React.memo(AvatarPreview);
    ```

2.  **`PartSelector` コンポーネントの作成**:
    * パーツカテゴリ（髪、目、口など）ごとに、選択肢（サムネイル画像など）を一覧表示するUIです。
    * ユーザーがパーツをクリックしたら、親コンポーネントの状態を更新するためのコールバック関数（例: `onPartSelect(category, partId)`）を呼び出します。
    * カテゴリごとにコンポーネントを分けるか、propsでカテゴリを渡して動的に表示を切り替える設計にします。

---

## フェーズ3: 状態管理とアプリケーションの統合

各コンポーネントを統合し、ユーザーの選択をアプリケーション全体で管理します。

#### やるべきこと

1.  **トップレベルコンポーネント (`App.tsx`) での状態管理**:
    * 選択されているパーツの状態を`useState`で管理します。
        ```tsx
        const [selectedParts, setSelectedParts] = useState<{ [key: string]: string | null }>({
          hair: 'hair_01', // 初期値
          eyes: 'eyes_01',
          mouth: 'mouth_01',
        });
        ```
    * `PartSelector`からの選択イベントを受け取り、この`selectedParts`を更新する関数を定義し、各コンポーネントに渡します。
    * `selectedParts`を`AvatarPreview`コンポーネントにpropsとして渡します。

2.  **コンポーネントのレイアウト**:
    * `App.tsx`内で、`AvatarPreview`と`PartSelector`を画面に配置します。一般的なレイアウトは、左にプレビュー、右にセレクターです。

---

## フェーズ4: SVGエクスポート機能の実装

プレビューされているアバターを、一枚の結合されたSVGファイルとしてダウンロードする機能を実装します。

#### やるべきこと

1.  **SVGコンテンツの結合ロジック作成**:
    * これは最も重要な部分です。サーバーを使わず、クライアントサイドで完結させます。
    * 選択された各パーツのSVGファイルの**中身（XMLコード）**を取得し、文字列として結合します。
    * まず、各SVGファイルの中身を非同期で取得する関数を用意します。
        ```typescript
        async function getSvgContent(url: string): Promise<string> {
          const response = await fetch(url);
          const text = await response.text();
          // SVGファイルから <svg> タグ自体は不要なので、内側の要素だけを抽出する
          const content = text.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
          return content ? content[1] : '';
        }
        ```
    * エクスポートボタンが押されたら、選択中のすべてのパーツに対して`getSvgContent`を呼び出し、結果を結合します。

2.  **ダウンロード処理の実装**:
    * 結合したSVGコンテンツを、新しい`<svg>`タグで囲み、完全なSVGファイル文字列を作成します。
    * 作成したSVG文字列を`Blob`オブジェクトに変換し、`URL.createObjectURL`を使ってダウンロード用のリンクを生成します。
    * 生成したリンクを`<a>`タグに設定し、プログラム的にクリックさせてダウンロードをトリガーします。

    ```tsx
    // エクスポートボタンのクリックハンドラ
    const handleExport = async () => {
      const { width, height } = { width: 300, height: 300 }; // SVGの基本サイズ

      let combinedSvgContent = '';
      for (const category of layerOrder) {
        const partId = selectedParts[category];
        if (partId) {
          const part = partsData.find(p => p.id === partId);
          if (part) {
            const content = await getSvgContent(part.url);
            combinedSvgContent += `<g id="${category}">${content}</g>`; // カテゴリごとにグループ化すると良い
          }
        }
      }

      // 1枚のSVGファイルとして整形
      const finalSvg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${combinedSvgContent}</svg>`;

      // ダウンロード処理
      const blob = new Blob([finalSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'avatar.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    ```

---

## フェーズ5: システム負荷と最適化

専門家として、パフォーマンスとユーザー体験を向上させるための最終調整を行います。

#### やるべきこと

1.  **画像の遅延読み込み (Lazy Loading)**:
    * パーツの数（特にサムネイル）が非常に多い場合、初期表示が遅くなる可能性があります。
    * 画面に表示されているサムネイルのみを読み込むように、`Intersection Observer API`を利用した遅延読み込みを実装することを検討します。

2.  **不要な再レンダリングの防止**:
    * `React.memo`や`useCallback`を適切に使用し、コンポーネントや関数の再生成を防ぎ、レンダリングパフォーマンスを最適化します。`AvatarPreview`は特に`React.memo`が効果的です。

3.  **SVG取得のキャッシュ**:
    * エクスポート時に毎回`fetch`でSVGコンテンツを取得するのは非効率です。一度取得したコンテンツは、メモリ（例: `Map`オブジェクト）にキャッシュしておき、次回以降はキャッシュから読み込むようにします。これにより、エクスポート処理が高速になります。

4.  **バンドルサイズの考慮**:
    * もしSVGファイルを`src`フォルダ内で直接`import`する場合、ビルド時にJavaScriptバンドルにSVGデータが含まれ、ファイルサイズが大きくなる可能性があります。
    * `public`フォルダに配置してURLとして参照する方法は、バンドルサイズを小さく保つ上で有効です。（今回の提案はこの方式です）

---

これらのステップに従うことで、要件を満たし、かつパフォーマンスと保守性に優れたSVGアバター作成システムを構築できます。
