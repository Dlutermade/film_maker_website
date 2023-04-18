
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

## 實作過程

#### Header change UI with the scrolling direction

1. 先創建 src/components/Header 資料夾
   原因: 應為會有 單一Logic 可以抽出來 做成獨立hook 所以選擇用資料夾 而不是 Header.tsx
2. 在該 資料夾 下創建 index.tsx  刻出頁面上的樣子
   即 置中 與 文字上的樣式設定
3. 創建 local custom hook 即 src/components/Header/hooks/useScrollHidden.tsx
   原因: 先 local 其他地方用到 在拉到 global (即 src/hooks) 
4. 撰寫 useScrollHidden
   1. 這個 custom hook 
   2. 有一個參數為 hiddenPx, type為number
   3. 回傳一個物件裡面有一個屬性 hidden, type為boolean
   4. 當 scroll往下 且 scroll > hiddenPx 時 hidden為true，否則 hidden為false
   5. 實作細節 
      1. 先用 useState(false) 建立 是否隱藏狀態 ( 預設false )
      2. 使用 useEffect 來進行 document.addEventListener
         原因: 直接操作真實DOM 是 component sideEffect的一種 
      3. 先建立一個變數 lastScrollTop = 0 代表 這是上次的 ScrollTop
      4. 撰寫Scroll eventHandler 
         1. 先算出當下的scrollTop
         2. 當 scroll > lastScrollTop 且 scroll > hiddenPx 時 hidden設為true，否則 hidden設為false
      5. 在 useEffect 中 增加scroll監聽事件 document.addEventListener
      6. 在 useEffect 中 回傳 cleanup effect function
         即回傳 移除scroll監聽事件 document.removeEventListener
      7. useEffect 的 dependent array 中帶入 hiddenPx 以確保Scroll eventHandler中的hiddenPx是最新的
5. 回到 src/components/Header/index.tsx
6. 引入 useScrollHidden(300)
7. 使用 framer-motion 的 AnimatePresence component, 確保元素消失時動畫能流暢運行
8. 透過 流程控制 即 !hidden && element 來取消元素顯示
9. 撰寫動畫 
   1. 初始狀態與離開狀態: translateY: -96px, opacity: 0
   2. 進入狀態: translateY: 0px, opacity: 1

#### Cards Shuffle Block

1. 先分析一下 特效參考 
   1. hover 單一 card 放大 1.1倍左右
   2. 左上角先在上層 ( figma是右下角在上層 )
   3. 卡片先打開，在收和 translateX + skew + z-index
      1. 重點1. 打開比較慢，收和比較快，打開來時要停頓一下
      2. 重點2. skew 看起來是X軸  爾且只有當下在上面那張卡片需要執行skew
2. 創建檔案 src/components/CardsShuffleBlock/index.tsx
3. 開始實作
   1. const [lastOnTop, setLastOnTop] = useState(true); 設定變數 表示那張在上面的狀態
   2. 最外面容器加上 { transformStyle: "preserve-3d" }(如下說明)  以及 relative 給 子元素使用absolute
      因為會用到 translateZ ( Z-Index 無法作為關鍵影格使用)
   3. 裡面兩張圖片皆使用 absolute 且 Hover 時候 放大1.1倍
   4. 先設定關鍵影格 右下圖在上 切換到 左上圖在上
      1. 左上圖
      {
         translateX: ["0px", "-250px", "-250px", "-160px", "0px"],
         translateZ: ["0px", "0px", "0px", "250px", "250px"],
      }
      2. 右下圖
      {
         translateX: ["0px", "250px", "250px", "160px", "0px"],
         translateZ: ["30px", "30px", "30px", "0px", "0px"],
         skewX: ["0deg", "0deg", "-15deg", "-15deg", "0deg"],
      }
      3. 即先打開 停留一下切skew持續這個skew狀態直到收和到某個程度 再 歸位
   5. 再設定關鍵影格 左上圖在上 切換到 右下圖在上
      1. 左上圖
      {
         translateX: ["0px", "-250px", "-250px", "-180px", "0px"],
         translateZ: ["30px", "30px", "30px", "0px", "0px"],
         skewX: ["0deg", "0deg", "10deg", "10deg", "0deg"],
      }
      2. 右上圖
      {
         translateX: ["0px", "250px", "250px", "180px", "0px"],
         translateZ: ["0px", "0px", "0px", "30px", "30px"],
      }
      3. 同 3.4.3
