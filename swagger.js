const swaggerAutogen = require('swagger-autogen')()

const doc = {
  tags: [ // by default: empty Array
    {
      name: 'Index',
      description: '首頁 router'
    },
    {
      name: 'Users',
      description: '用戶 router'
    }
  ]
}

const outputFile = './swagger_output.json' // 輸出的文件名稱
const endpointsFiles = ['./app.js'] // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

swaggerAutogen(outputFile, endpointsFiles, doc) // swaggerAutogen 的方法
