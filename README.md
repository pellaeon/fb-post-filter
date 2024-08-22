# 介紹

這是一個簡單暴力的瀏覽器插件，幫你移除 Facebook 上面不相干的貼文：

- 贊助貼文
- 煩人的互動式問題
- 推薦的粉專和社團

目前有如下限制：

- 不能自訂關鍵字，以後有時間再增加這個功能
- 只有你的 Facebook 顯示語言設為正體中文才會有效

## 安裝方法

https://addons.mozilla.org/zh-TW/firefox/addon/facebook-postfilter-tw/

## 開發版安裝方法

1. 點選右邊 Clone or download -> Download ZIP
2. 下載完 ZIP 檔之後解壓縮
3. 遵循 [Firefox 說明文件](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) 的指示，載入此附加元件，在文中「打开附加组件的目录」的步驟，使用剛剛解壓縮的資料夾（選取資料夾裡面的任一個檔案）
4. 重新整理所有 Facebook 分頁
5. 完成

## 原理

Facebook 會經常修改他們的頁面結構，所以一般常見的利用 class name 和 aria-label 等屬性去抓出貼文元素的方式很容易就會失效。

本專案採用貼文元素的結構和元素的大小作為判斷，應該比較不容易受改版影響。

抓取了貼文的元素之後，檢查每一篇貼文的文字內容（使用 `Element.textContent` ），只要包含「贊助」等字串，則刪除該貼文的 DOM 元素。

因為追求簡單暴力，沒打算做多國語言支援。

## 參考

如果你需要更進階的自訂功能，可以使用 [SocialFixer](https://addons.mozilla.org/zh-TW/firefox/addon/socialfixer/)。但他的貼文過濾功能似乎不是很可靠，贊助過濾功能也是。
