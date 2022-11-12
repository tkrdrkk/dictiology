## cdk initでyarnを使いたい
- cdk initはデフォでnpm installを実行する
- が、yarnの方が好き
- package-lock.json削除+node_modules削除+yarn で多分行けるけどめんどくさい
- helpから--generate-onlyオプションを発見
- これで解決↓
```
cdk init -l typescript --generate-only
yarn
```

## 一旦graphqlをあきらめapi gateway + lambda + dynamodbにする
- 公式のexamplesがあるが、ボイラープレート的に使えるわけじゃないっぽいのでコピペで頑張る
- 理解度を上げられるという前向きな理解
- これ→https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/api-cors-lambda-crud-dynamodb/
### sdkがv2記法なのが辛い
- v3に読み替える

## 複数環境想定の設定
### コンテキストファイルの作成
- いつもお世話になっております→https://maku.blog/p/vx5ta85/