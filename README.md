
## Framework and Library

#### Next.js
1. 問題: 使用 Next.js 不使用 Remix
   原因: 不考慮發送 Sending form
2. 問題: 使用 pages dir 不使用 app dir
   原因: 不考慮 fetch data ( server side components )

#### Chakra-UI
1. 問題: 使用 Chakra-UI 不使用 MUI
   原因: Chakra-UI 上手快，且方便客製化

#### Font 
1. 在 _document.tsx 中 Head組件包裹 從 cdnfonts 引入的 apercu 字體
2. 在 src/theme 中 指定 body and heading 字體

> 基本上完成專案初始化設定