'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const storeIds = await queryInterface.sequelize.query(
      'SELECT id FROM Stores;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const planData = []
    for (let i = 0; i < storeIds.length; i++) {
      planData.push({
        plan_name: '8堂方案',
        plan_amount: 8,
        price: 3000,
        plan_type: '次數',
        store_id: storeIds[i].id,
        created_at: new Date(),
        updated_at: new Date()
      })
      planData.push({
        plan_name: '30天方案',
        plan_amount: 30,
        price: 6000,
        plan_type: '天數',
        store_id: storeIds[i].id,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('Plans', planData, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Plans', {})
  }
}
