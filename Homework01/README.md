# Homework01

### input.addEventLister: 接收todo thing的輸入
設定一個addEventListener，如果使用者輸入完畢後按下"Enter"鍵後，就會呼叫create_todo() function增加li element，並改變計數器，若原本沒有todo，則會先呼叫create_ul() function，提供一個容器裝li element。

### create_todo(): 建立li element
整個li element的container取名為itemNode，其中有checkbox、todo項目的名字以及刪除todo thing的按鈕，
並且分別賦予刪除按鈕以及checkbox各自的onclick，delete_node()以及change_status()。建立完li element後，會將整個itemNode以及紀錄是否完成的布林值(isComplete)存入todo_list_array中。

### delete_node(): 刪除li element
先抓到要刪除的li element，並且在todo_list_array中找到相同的li element，並用splice()將之從array中刪除，同時將計數器減一。

### change_status(): 改變todo thing的狀態(Active, Completed)
先取得改變狀態的li element，若該element目前的狀態為active，便將checkbox的checked值assign為true，若該element的狀態為completed，則將checkbox的checked值assign為false，並改變text的style以及計數器。

### select_all(), select_active(), select_completed(): buttons的function
都先將ul中的所有li element刪除，再將todo_list_array中的all/active/completed的項目加入ul中。

### clean_completed(): 清除所有completed項目
與select_active()相似，只是多了從todo_list_array中刪除completed項目的功能。