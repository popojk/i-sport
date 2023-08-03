# i-sport專案簡介
* i-sport是一個整合運動場館課程預約平台，產品訴求是協助運動場館販賣課程並協助使用者更便利的預約及購買運動課程，使用者身份分為商家與用戶，商家登入後可以在平台上公告旗下場館課程資訊供用戶預約以及販賣課程方案，用戶登入後可查看商家資訊、預約場館課程、購買場館方案、查看場館評論或留下評論。
* i-sport開發方式為前後端分離，而本repo是採用 RESTful 理念設計的後端 API 伺服器。
&emsp;
## 網站連結
[網站連結](https://isport-omega.vercel.app/)
[API連結](https://isports.tw/)
[前端 Repo](https://github.com/Beginneraboutlife116/isport)
<br />
&emsp;
## 使用者介面
登入畫面
![image](https://github.com/popojk/i-sport/blob/main/%E6%88%AA%E5%9C%96%202023-07-25%20%E4%B8%8B%E5%8D%8810.27.05.png?raw=true)
找場館畫面
![image](https://github.com/popojk/i-sport/blob/main/%E6%88%AA%E5%9C%96%202023-07-25%20%E4%B8%8B%E5%8D%8810.30.04.png?raw=true)
場館頁課程頁籤
![image](https://github.com/popojk/i-sport/blob/main/%E6%88%AA%E5%9C%96%202023-07-25%20%E4%B8%8B%E5%8D%8810.37.13.png?raw=true)
場館頁方案頁籤
![image](https://github.com/popojk/i-sport/blob/main/%E6%88%AA%E5%9C%96%202023-07-25%20%E4%B8%8B%E5%8D%8810.37.57.png?raw=true)
場館頁評價頁籤
![image](https://github.com/popojk/i-sport/blob/main/%E6%88%AA%E5%9C%96%202023-07-25%20%E4%B8%8B%E5%8D%8810.37.45.png?raw=true)
藍新金流付款頁面
![image](https://github.com/popojk/i-sport/blob/main/%E6%88%AA%E5%9C%96%202023-07-25%20%E4%B8%8B%E5%8D%8810.38.50.png?raw=true)


&emsp;
## 功能介紹
用戶功能:
<br />
* 用戶可以註冊帳號後登入，登入時使用passport進行JWT驗證身份
* 用戶進入我的帳戶頁，可以修改Email、暱稱、密碼、上傳大頭貼
* 用戶登入後在找場館頁可以看到所有場館，可以收藏場館，按下Map圖示將串接Google Map API顯示小地圖
* 進入我的場館頁面可以看到目前收藏場館，我的預約頁面可查看目前所有已預約課程
* 用戶點擊場館後可進入場館頁面，課程頁籤將顯示該場館七天內之課程，選擇已購買之課程方案後即可完成預約
* 場館頁方案頁籤將顯示該場館可購買的方案，點擊購買後進入藍新金流付款頁，輸入卡號完成付款後按下返回商店按鍵即可返回i-sport頁面
* 場館頁評價頁籤將顯示場館所有評價，用戶也可以留下評價

商家功能:
<br />
* 商家可以註冊帳號後登入，登入時使用passport進行JWT驗證身份
* 商家進入我的帳戶頁，可以修改Email、名稱、密碼
* 商家登入後在所有場館頁可以看到所有旗下，也可以建立、編輯場館
* 商家點擊場館後可進入場館頁面，每週課表頁籤將列出星期日至星期六之課表，系統將據此自動生成未來七天之課程供用戶預約，商家也可以新增、編輯、刪除課程
* 場館頁方案頁籤將顯示該場館可購買的方案，商家可以新增、編輯、刪除方案
* 場館頁評價頁籤將顯示場館所有用戶留下的評價


<br />

## 使用技術

| 技術                | 用途                |
| ------------------ | ------------------- |
|Node.js + Express   |後端框架              |
|Passport            |JWT用戶身份驗證        |
|Sequelize           |資料庫ORM             |
|MySql               |後端RDBS資料庫         |
|Swagger             |撰寫API文件             |
|藍新金流API          |信用卡付款功能             |
|AWS Elastic Beantalk|後端API部署     |
&emsp;
## 安裝與使用
1.  打開 terminal，本專案 clone 至本地
```
git clone https://github.com/popojk/i-sport.git
```

2. 進入專案資料夾，請在終端機輸入：
```
cd i-sport
```

3. 安裝所需套件
```
npm install
```
4. 用 Visual Studio Code 打開本專案
```
code .
```

5. 將本地資料庫的 username、password 與 /config/config.json 中的 development 的參數設定一致。
```
"development": {
  "username": "root", // 設定此項
  "password": "password", // 設定此項
  "database": "i_sport_workspace",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```

6. 建立資料庫 [ 在 MySQL Workbench 的 Query 介面輸入 ]
```
create database i_sport_workspace;
```
7. 建立資料表 
```
npx sequelize db:migrate
```
8. 建立種子資料
```
npx sequelize db:seed:all
```
9. 至imgur網站申請帳號，至藍新金流API測試網站申請帳號並申請商家

10. 建立檔案 .env 並設定環境變數，參考 .env.example
```
PORT=
JWT_SECRET=
IMGUR_CLIENT_ID=
NEWPAY_HASHKEY=
NEWPAY_HASHIV=
NEWPAY_MERCHANT_ID=
```
11. 啟動伺服器
```
npm run dev
```
顯示 ```i-sport API app listening on port 8080!```，表示啟動成功。

12. 輸入下列代碼於**網址列**即可使用
```
localhost:8080
```
13. 若要停止專案請在終端機按 Ctrl+C
<br />

## 測試帳號
```
商家
email: tmma@tmma.com
password: 12345678

使用者
email: user1@example.com
password: 12345678

金流
測試信用卡號: 4000-2211-1111-1111
日期: 大於今日即可
```

## API 文件
https://isports.tw/api-doc
<br />



## 專案開發人員
### 前端： [Oliver](https://github.com/Ollieeryo), [Kai](https://github.com/Beginneraboutlife116)
### 後端： [忠全](https://github.com/popojk)