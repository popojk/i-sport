'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE role = \'owner\';',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Stores', [{
      store_name: 'TMMA 台北格鬥運動館 忠孝館',
      photo: 'https://imgur.com/2RNrrJd.jpeg',
      address: '台北市大安區仁愛路四段27巷22號B1',
      introduction: 'TMMA致力將格鬥運動帶入生活，授課風格特別採用活潑生動的方式，讓學員們能夠循序漸進的增強自信及實力。最終達到健身、塑身、防身的效果。藉此開創大眾對於格鬥運動全新的感受與經驗。',
      lat: 25.040223036929913,
      lng: 121.54505509629759,
      email: 'tmma@tmma.com',
      phone: '(02)8771-9195',
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      store_name: 'TMMA 台北格鬥運動館 天母館',
      photo: 'https://imgur.com/nCDXUv7.jpeg',
      address: '台北市士林區中山北路六段340號',
      introduction: 'TMMA致力將格鬥運動帶入生活，授課風格特別採用活潑生動的方式，讓學員們能夠循序漸進的增強自信及實力。最終達到健身、塑身、防身的效果。藉此開創大眾對於格鬥運動全新的感受與經驗。',
      lat: 25.111500934815343,
      lng: 121.52601818690319,
      email: 'tmma@tmma.com',
      phone: '(02)2834-0000',
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      store_name: 'TMMA 台北格鬥運動館 雙和館',
      photo: 'https://imgur.com/cEdcZPl.jpeg',
      address: '新北市中和區中和路356號11樓',
      introduction: 'TMMA致力將格鬥運動帶入生活，授課風格特別採用活潑生動的方式，讓學員們能夠循序漸進的增強自信及實力。最終達到健身、塑身、防身的效果。藉此開創大眾對於格鬥運動全新的感受與經驗。',
      lat: 25.00155203627247,
      lng: 121.51022851355397,
      email: 'tmma@tmma.com',
      phone: '(02)8923-7799',
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      store_name: 'HRC 舞蹈工作室【忠孝館】/【KiDS忠孝館】',
      photo: 'https://imgur.com/38vwfoR.jpeg',
      address: '台北市大安區忠孝東路四段299號B1',
      introduction: 'HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！',
      lat: 25.041597748046385,
      lng: 121.55534155353345,
      email: 'hrc@hrc.com',
      phone: '(02)2711-3104',
      user_id: users[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      store_name: 'HRC 舞蹈工作室【板橋民生旗艦館】',
      photo: 'https://imgur.com/8CqO1xS.jpeg',
      address: '新北市板橋區民生路三段248號1樓',
      introduction: 'HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！',
      lat: 25.030865061522064,
      lng: 121.46450031327628,
      email: 'hrc@hrc.com',
      phone: '(02)2257-8128',
      user_id: users[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      store_name: '好時光女生運動樂園',
      photo: 'https://imgur.com/vPbPUgG.jpeg',
      address: '台北市中山區龍江路96號4樓',
      introduction: '女性友善的優良運動場所',
      lat: 25.052407071213707,
      lng: 121.54037421761544,
      email: 'goodtime@goodtime.com',
      phone: '(02)2413-4548',
      user_id: users[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stores', {})
  }
}
