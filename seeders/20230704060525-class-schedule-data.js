'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const storeIds = await queryInterface.sequelize.query(
      'SELECT id FROM Stores;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Class_schedules', [{
      week_day: 0,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '拳擊-進階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '泰拳-初階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '拳擊-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '格鬥體驗班',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '踢拳撃-初階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '菲律賓武術專攻班',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '女子專班',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '拳擊-進階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '泰拳-初階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '拳擊-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '格鬥體驗班',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '踢拳撃-初階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '菲律賓武術專攻班',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '女子專班',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '拳擊-進階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[1].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '泰拳-初階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '拳擊-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '格鬥體驗班',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '踢拳撃-初階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '菲律賓武術專攻班',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '女子專班',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '拳擊-初階',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '踢拳撃-進階',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[2].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: 'Hip-hop',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: 'Locking初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '舞感養成',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: 'Jazz Funk',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: 'Choreography',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: 'House 初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: 'Sexy Jazz',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: 'HIPHOP初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: 'Popping初級',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: 'Lyrical Jazz',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: 'Soul&Lock 初級',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: 'choreography 初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: 'Waacking初級',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '舞感養成',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[3].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: 'Hip-hop',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: 'Locking初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '舞感養成',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: 'Jazz Funk',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: 'Choreography',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: 'House 初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: 'Sexy Jazz',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: 'HIPHOP初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: 'Popping初級',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: 'Lyrical Jazz',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: 'Soul&Lock 初級',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: 'choreography 初級',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: 'Waacking初級',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '舞感養成',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[4].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '空中瑜伽',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 0,
      class_name: '基礎重訓',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: '皮拉提斯',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 1,
      class_name: 'Zumba',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '瑜珈輪',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 2,
      class_name: '泰拳',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: '核心瑜伽',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 3,
      class_name: 'TRX',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '柔軟度開發',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 4,
      class_name: '皮拉提斯',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '香氛瑜珈',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 5,
      class_name: '拳擊有氧',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '進階重訓',
      start_time: '18:00',
      end_time: '19:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      week_day: 6,
      class_name: '空中舞蹈',
      start_time: '19:00',
      end_time: '20:00',
      headcount: 20,
      store_id: storeIds[5].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Class_schedules', {})
  }
}
