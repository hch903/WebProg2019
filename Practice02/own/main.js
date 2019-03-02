
var url_array = ["https://y1.yooho.com.tw/images/201708/goods_img/2869_G_1502758521597.jpg",
                 "https://farm5.staticflickr.com/4466/38035133672_5a7a29c8e1_b.jpg",
                 "https://img.chinatimes.com/newsphoto/2018-03-18/656/20180318002941.jpg",
                 "https://b.blog.xuite.net/b/2/d/e/12584724/blog_32120/txt/378310470/0.jpg",
                 "https://b.blog.xuite.net/b/2/d/e/12584724/blog_32120/txt/204750173/61.jpg",
                 "https://www.walkerland.com.tw/image/poi/p10784/m13024/088d524249ab47ded2246f68456c4bada122b2a5.jpg",
                 "http://cdn.walkerland.com.tw/images/upload/poi/p10784/m28908/f099340fc6790c707fd887f8f5a41c31bb024a98.jpg"];

url_index = 3;
window.onload = first_picture;

function first_picture() {
    // 取得父節點
    var target = document.getElementsByClassName("image-viewer__display");

    // 新增img節點
    var first_image = document.createElement('img');

    // 設定img位址
    first_image.src = url_array[url_index];

    // 取得loading節點
    var loading = target[0].firstElementChild;

    // 將img節點加入html
    target[0].insertBefore(first_image, loading);

    // 新增source節點
    var first_source = document.createElement('div');
    first_source.className = "image-viewer__display-source-wrapper";

    // 新增text節點
    var textNode = document.createTextNode("Source: " + url_array[url_index]);
    first_source.appendChild(textNode);

    // 將source節點加入html
    target[0].appendChild(first_source);
}

function previous_picture() {
    // 取得父節點
    var target = document.getElementsByClassName("image-viewer__display");

    // 取得圖片
    var org_image = target[0].firstElementChild;

    // 新增img節點
    var new_image = document.createElement('img');

    // 設定img位址
    if(url_index > 0){
        url_index--;
        new_image.src = url_array[url_index];
        // 讓按鈕失效
        if(url_index === 0)
            reject(0);
        // 讓按鈕恢復功能
        if(url_index === 5)
            recover(1);
    }
    else
        return;
    
    // 替換照片
    target[0].replaceChild(new_image, org_image);

    // 取得source
    var org_source = target[0].lastElementChild;

    // 新增source節點
    var new_source = document.createElement('div');
    new_source.className = "image-viewer__display-source-wrapper";

    // 新增text節點
    var textNode = document.createTextNode("Source: " + url_array[url_index]);
    new_source.appendChild(textNode);

    // 替換文字
    target[0].replaceChild(new_source, org_source);
}

function next_picture() {
    // 取得父節點
    var target = document.getElementsByClassName("image-viewer__display");

    // 取得圖片
    var org_image = target[0].firstElementChild;

    // 新增img節點
    var new_image = document.createElement('img');

    // 設定img位址
    if(url_index < 6){
        url_index++;
        new_image.src = url_array[url_index];
        // 讓按鈕失效
        if(url_index === 6)
            reject(1);
        // 讓按鈕恢復功能
        if(url_index === 1)
            recover(0);
    }
    else
        return;
    
    // 替換照片
    target[0].replaceChild(new_image, org_image);

    // 取得source
    var org_source = target[0].lastElementChild;

    // 新增source節點
    var new_source = document.createElement('div');
    new_source.className = "image-viewer__display-source-wrapper";

    // 新增text節點 
    var textNode = document.createTextNode("Source: " + url_array[url_index]);
    new_source.appendChild(textNode);

    // 替換文字
    target[0].replaceChild(new_source, org_source);
}

function reject(flag) {
    // 取得父節點
    var target = document.getElementsByClassName("image-viewer__main");

    // 取得button
    if(flag === 0)
        var button = target[0].firstElementChild;
    else if(flag === 1)
        var button = target[0].lastElementChild;

    // 改變class name
    button.className = "disabled";

    // 移除onclick function
    button.removeAttribute("onclick");
}

function recover(flag) {
    // 取得父節點
    var target = document.getElementsByClassName("image-viewer__main");

    // 取得button
    if(flag === 0)
        var button = target[0].firstElementChild;
    else if(flag === 1)
        var button = target[0].lastElementChild;

    button.className = "image-viewer__button";

    // 恢復onclick function
    if(flag === 0)
        button.onclick = previous_picture;
    else if(flag === 1)
        button.onclick = next_picture;
}