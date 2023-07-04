'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const storeIds = await queryInterface.sequelize.query(
      'SELECT id FROM Stores;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    queryInterface.bulkInsert('Reviews', [{
      content: '教練課程生動有趣',
      rating: 4.5,
      user_id: userIds[0].id,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '教練很讚',
      rating: 4,
      user_id: userIds[1].id,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '還是覺得這一年多像掉進兔子洞',
      rating: 2,
      user_id: userIds[2].id,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '教練超可愛',
      rating: 5,
      user_id: userIds[3].id,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '靶排得很好 讚',
      rating: 4.5,
      user_id: userIds[4].id,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '能夠激發學生的潛力，並且在技術和戰術方面給予深入的指導',
      rating: 4.5,
      user_id: userIds[0].id,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '出色的拳擊教練，具有卓越的教學能力和豐富的經驗',
      rating: 4,
      user_id: userIds[1].id,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '課程扎實且教學靈活，收穫滿滿',
      rating: 4,
      user_id: userIds[2].id,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '教學仔細，清楚好懂',
      rating: 5,
      user_id: userIds[3].id,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '今天也學到很多喔喔喔，謝謝教練',
      rating: 4.5,
      user_id: userIds[4].id,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '超實用閃避補追擊閃躲再攻擊',
      rating: 4.5,
      user_id: userIds[0].id,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '教練很專業馬上能看出學員需加強的地方，很感謝',
      rating: 4,
      user_id: userIds[1].id,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '上次體驗課教練教的很紮實，所以就入坑報名了',
      rating: 4.5,
      user_id: userIds[2].id,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '穩紮穩打的課程！推薦！',
      rating: 5,
      user_id: userIds[3].id,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '細心教導並能即時修正學員姿勢，很感謝',
      rating: 4,
      user_id: userIds[4].id,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '今天的課程是暴力辣妹',
      rating: 4.5,
      user_id: userIds[0].id,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '走道跟教室空間都太小很擁擠',
      rating: 1,
      user_id: userIds[1].id,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師的排舞很好看很喜歡 上課很輕鬆有趣',
      rating: 4.5,
      user_id: userIds[2].id,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '課超好玩！！！！！ 編舞很厲害',
      rating: 5,
      user_id: userIds[3].id,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '教室冷氣的方向會對著學員都頭吹 流汗的話會頭痛',
      rating: 2,
      user_id: userIds[4].id,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '排舞部分太長了, 一直記舞步沒辦法練習動作到位',
      rating: 3,
      user_id: userIds[0].id,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師教學非常仔細 很喜歡老師的課程 希望老師也能有成發班',
      rating: 4.5,
      user_id: userIds[1].id,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師很有魅力舞蹈也很棒，也很耐心的教導大家',
      rating: 4.5,
      user_id: userIds[2].id,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師教的好 學生爆滿',
      rating: 5,
      user_id: userIds[3].id,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師好漂亮!',
      rating: 5,
      user_id: userIds[4].id,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '很充實的一堂課',
      rating: 4,
      user_id: userIds[0].id,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '緩緩的、舒舒服服的伸展，好適合blue Monday',
      rating: 4.5,
      user_id: userIds[1].id,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師很棒很有活力～～喜歡',
      rating: 4.5,
      user_id: userIds[2].id,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '老師教學口氣不耐煩⋯',
      rating: 2,
      user_id: userIds[3].id,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      content: '每次上課都有學到新的東西跟技巧，喜歡~!',
      rating: 5,
      user_id: userIds[4].id,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', {})
  }
}
