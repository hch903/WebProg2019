Web Programming practice 02 comment 
============
###完成度
直接打開來看的話沒有圖片，貌似是被註解掉了。
將其取消註解後有一張大圖，但是按鈕沒有切換圖片的功能。
開啟javascript檔案後應該是已經完成的，但是DOM抓取的部分看起來是沒有抓到想要的物件導致按鈕失靈。

總而言之，整體完成度大約**85%**吧！

###coding quality
使用function方法清晰明確，並且配合註解可以輕鬆閱讀程式碼。
當按鈕按到最後一張的時候，這一份code將onclick的function從按鈕上移除，我認為可以直接從function本身去限制按鈕的運行，不用特地將其移除，不過整體來說影響不大，沒差！

總而言之，是一份**好code**！

###正確性
在DOM抓取上使用getElementsByClassName抓取，我自己也不是很會用class name抓取(常常抓不到哈哈)，所以我都用id去抓，然後有成功。然後連接javascript的標籤script建議是寫在body的下方，可以避免瀏覽器讀取時間差導致小bug	發生的情況。

總而言之，除了上述其他沒什麼問題！

###值得學習的地方
拿我的javascript code比較起來，有**註解**跟**良好function使用**的code真的比較優！

###建議改進的地方
上面好像都講光了哈哈，那就建議寫完基本要求可以試試美化一下或是增加一些課程網站寫的那些optional功能！

###心得
感覺要評價別人的code很難，因為我自己也寫得不好。希望能夠透過觀摩別人的code來加強自己的觀念和程式品質，如果走上工程師這條路，把自己的code給別人看和看別人的code一定很常遇到。
