'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userIds = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE role = \'user\';',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const planIds = await queryInterface.sequelize.query(
      'SELECT id FROM Plans;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const storeIds = await queryInterface.sequelize.query(
      'SELECT store_id FROM Plans;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const data = []
    for (let i = 0; i < userIds.length; i++) {
      for (let j = 0; j < planIds.length; j += 2) {
        data.push({
          user_id: userIds[i].id,
          plan_id: planIds[j].id,
          store_id: storeIds[j].store_id,
          amount_left: 8,
          created_at: new Date(),
          updated_at: new Date()
        })
      }
    }
    data.push({
      user_id: userIds[0].id,
      plan_id: planIds[1].id,
      store_id: storeIds[0].store_id,
      expire_date: new Date('10/8/2023'),
      created_at: new Date(),
      updated_at: new Date()
    })
    queryInterface.bulkInsert('User_plans', data)
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_plans', {})
  }
}
