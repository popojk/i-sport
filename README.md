# i-sport專案簡介
* i-sport是一個整合運動場館課程預約平台，產品開發目的是協助運動場館販賣課程並協助使用者更便利的預約及購買運動課程，使用者身份分為商家與用戶，商家登入後可以在平台上公告旗下場館課程資訊供用戶預約以及販賣課程方案，用戶登入後可查看商家資訊、預約場館課程、購買場館方案、查看場館評論或留下評論。
* i-sport開發方式為前後端分離，而本專案是後端 API 伺服器，本專案是採用 RESTful 理念設計 的 API
* [前端 Repo](https://github.com/Beginneraboutlife116/isport)
<br />

## 功能介紹
用戶:
* 用戶可以註冊帳號後登入，登入時使用passport進行JWT驗證身份
* 用戶登入後，可以修改Email、暱稱、密碼、上傳大頭貼
* 用戶登入後可以看到所有場館


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
9. 建立檔案 .env 並設定環境變數，參考 .env.example
```
PORT=
JWT_SECRET=
IMGUR_CLIENT_ID=
NEWPAY_HASHKEY=
NEWPAY_HASHIV=
NEWPAY_MERCHANT_ID=
```
10. 啟動伺服器
```
npm run dev
```
顯示 ```i-sport API app listening on port 8080!```，表示啟動成功。

11. 輸入下列代碼於**網址列**即可使用
```
localhost:8080
```
12. 若要停止專案請在終端機按 Ctrl+C
<br />

## 測試帳號
```
商家
email: tmma@tmma.com
password: 12345678

使用者
email: user1@example.com
password: 12345678
```

## API 文件
[文件連結](https://isports.tw/api-doc)
<br />

## 網站連結
[網站連結](https://isport-omega.vercel.app/)
[API連結](https://isports.tw/)

## 專案開發人員
### 前端： [Oliver](https://github.com/Ollieeryo), [Kai](https://github.com/Beginneraboutlife116)
### 後端： [忠全](https://github.com/popojk)