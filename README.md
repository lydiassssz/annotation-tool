# 重要
 このプロジェクトは2024年夏に滋賀大学市川ゼミで行われた、ラベリングアルバイトに使用できるツールとして作成しました。
 他の用途での利用は想定していませんし、利用しないでもらえると助かります。

 ## 必要な環境・利用方法
ブラウザが動作する環境で、デプロイ先の下記URLにアクセスしてください。
### Vercel
https://annotation-tool-ivory.vercel.app/

※基本的にはPC上での作業を想定していますが、スマホやタブレットでも不可能ではありません。

※やる必要はないと思いますが、最新版のnode.js、npmの利用できる環境であれば、リポジトリをcloneして「npm run dev」を実行することでローカルでも利用できます。

# 利用マニュアル

## クイックスタート

①URLを開いて、採点に必要なcsvファイルを左上からアップロードしてください。
②ラベルは対応したい発話をクリックしたり、数字を入力することで設定します。
③ラベリングが終わったら、右上のダウンロードボタンから編集したcsvファイルをダウンロードすることができます。

※システム内で「0」と空欄を同列に扱っています。ラベル先が無い、つまり0を入力するラベルでは、何も書かずに次に進んでください。

## 機能詳細

### csvのアップロード・ダウンロード
　これらの2つはcsvのダウンロード、アップロードのボタンとして機能します。アップロード、ダウンロードと言いますがブラウザ上に上げられローカルで処理されるので、サーバにはアップロードされません。(データの外部公開にはあたりません)


※ラベリングに使用されるテキストデータのみがアップロードされることを想定しているので、関係ないcsvファイルをアップロードするとバグります。意図せず間違えたファイルを送信してバグった時はページをリロードすれば解決します。
※アップロードされる、ダウンロードするcsvの文字コードはどちらもshift-jisのみ対応しています。まずないと思いますが文字化けしたらファイルの文字コードを確認してみてください。(一応データ作成者本人に確認しましたが、すべてshift-jisで設定されているはずです。)
※アップロードの際にはnew-labelに記載された値が0の物は消去され、ダウンロード時には記載のない箇所には0が付与されます。

### ラベリング操作
　入力したいnew_labelの位置のinputをクリックしてみてください。その列の色が濃くなり、input欄には薄い灰色か、赤色で数字が表示されると思います。このマニュアルではこの状態を以後「入力待ち」と表現します。入力待ちであれば、その場所に数字を入力することが可能です。このツールでは、ラベリング入力を補助するため、主に3つの機能が追加されています。

①ラベルの簡単入力
　テキストをクリックすることで、そのテキストのラベルが自動的に入力されます。例えば「テキスト3」が「テキスト1」に対しての発話であれば、テキスト3のラベル入力待ち状態で(つまりテキスト3の列の色が濃い状態)「テキスト1」をクリックすれば、inputに「1」が入力され、次のinputに進みます。なお、自分自身の発話をクリックした場合は、何も入力されず次のinputに進みます。

②入力された数字のエラーチェック
　ラベル入力のミスを防ぐため、0以外の数字のみが入力できるようになっています。全角の入力もできません。また、入力された値がその発話より未来の発話を指定した場合、input欄が赤くなるようになっています。ラベリング作業後、赤いinput欄がある場合はその箇所のラベルをミスしています。

③入力予測
　入力待ち状態では、input欄に灰色か赤色で数字が表示されています。この数字はtabキーを押すことでその値を入力するか、別の数字を入力することで消失します。
　この入力予測は、以下のロジックで計算されています。
１発話者コードが1の時は、-1が予測入力に設定されます。
２現在の入力待ちの列の発話者コードと同じ発話者が、直前に発言した際のラベルと同じラベルが予測入力に設定されます。
３現在の予想入力が旧ラベルと一致してたら灰色、一致していない場合赤色で表示されます。

※入力補助と言えるほどの機能ではないですが、いくつかのキーボード操作に対応しています。上下の矢印、enterは入力待ちの対象を動かします。
※また、各列は発話者コードによって識別され、色分けされて表示されています。
　

# リリースノート・アップデート予定


## リリースノート
2024/8/7　リリース

## 今後の機能改修予定
・tabキーの操作でのみ0が入力できる問題の解決
・UIの改善
・入力待ちの移動に伴って画面をスクロールする機能の追加
・ブラウザ上で音声の再生も可能にする機能の追加


## バグ報告、改善案の提案
　バグが見つかったり、改善案がある場合はラベリングバイトのslackチャンネルで連絡をください。