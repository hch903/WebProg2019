var img_source = document.getElementById("display");
var back_control = document.getElementById("back_butt");
var next_control = document.getElementById("next_butt");
var source = document.getElementById("source");
var spinner = './loading.gif';
var photo_source = [
    { url: 'https://s.newtalk.tw/album/news/86/59092bad70f8e.jpg', source: '這是白柴' },
    { url: 'http://www.supervr.net/webstore/catbbs/user/upload/attachments/2010/4/3/1d6367214ba9a8cdc43fd1e1d1387569.jpg_thumb', source: '這是美國捲耳貓' },
    { url: 'http://www.xinhuanet.com//science/2017-12/05/136802330_15124615570441n.png', source: '這是狐狸' },
    { url: 'https://c1.staticflickr.com/5/4719/24904659817_5e716327fb_b.jpg', source: '這是綠繡眼' },
    { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549865328100&di=34d31e274b8cded55fd91b0f25dea978&imgtype=0&src=http%3A%2F%2Fwww.zmdtvw.cn%2Fd%2Ffile%2Fp%2F2016%2F01%2F20%2F18ebcc2ceb177673a48930c8db583a6c.jpg', source: '這是北極熊' }
];
var photo_cnt = 0;
back_control.classList.add("disabled");
img_source.src = photo_source[photo_cnt].url;
source.href = photo_source[photo_cnt].url;
source.innerHTML = photo_source[photo_cnt].source;

function back_photo() {
    if(photo_cnt == 0) {
        back_control.classList.add("disabled");
    }
    else {
        if(photo_cnt == 1) {
            back_control.classList.add("disabled");
            photo_cnt -= 1;
        }
        else {
            photo_cnt -= 1;
            next_control.classList.remove("disabled");
        }

        img_source.src = spinner;
        source.href = photo_source[photo_cnt].url;
        source.innerHTML = photo_source[photo_cnt].source;
        img_source.src = photo_source[photo_cnt].url;
    }
};

function next_photo() {
    if(photo_cnt == photo_source.length-1) {
        next_control.classList.add("disabled");
    }
    else {
        if(photo_cnt == photo_source.length-2) {
            next_control.classList.add("disabled");
            photo_cnt += 1;
        }
        else {
            photo_cnt += 1;
            back_control.classList.remove("disabled");
        }

        img_source.src = spinner;
        source.href = photo_source[photo_cnt].url;
        source.innerHTML = photo_source[photo_cnt].source;
        img_source.src = photo_source[photo_cnt].url;
    }
};

