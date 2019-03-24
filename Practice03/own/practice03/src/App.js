import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className = "section_content">
                <div className = "section-inner">
                    <div className = "title">
                        <h1>初學者學演算法｜從時間複雜度認識常見演算法（一）</h1>
                        <h2>程式麻瓜的程式知識課（四）</h2>
                    </div>
                    <div className = "editor_information">
                        <img src = "https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg" width = "50px" height = "50px"></img>
                        <div className = "editor_info_text">
                            <b>謝昊辰 | Winston H.C.Hsieh</b>
                            <h6>Mar. 22, 2019．1 min read</h6>
                        </div>
                    </div>
                </div>
                <div className = "img_container">
                    <img src = "https://cdn-images-1.medium.com/max/2600/1*_tGMoELrpSdBRZWNH_6Y8A.jpeg"></img>
                </div>
                <div className = "inner-content">
                    <h2><b>目錄：常見的六種時間複雜度與演算法</b></h2>
                    <ol>
                        <li>O(1)：陣列讀取</li>
                        <li>O(n)：簡易搜尋</li>
                        <li>O(log n)：二分搜尋</li>
                        <li>O(nlogn)：合併排序</li>
                        <li>O(n²)：選擇排序</li>
                        <li>O(2^n)：費波那契數列</li>
                    </ol>
                    
                </div>
            </div>
        );
    }
}

export default App;
