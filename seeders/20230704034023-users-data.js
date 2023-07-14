'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      nickname: 'user1',
      avatar: 'https://i.imgur.com/EgMXcng.jpeg',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      nickname: 'user2',
      avatar: 'https://i.imgur.com/AD3MbBi.jpeg',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user3@example.com',
      password: await bcrypt.hash('12345678', 10),
      nickname: 'user3',
      avatar: 'https://i.imgur.com/Jvh1OQm.jpeg',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user4@example.com',
      password: await bcrypt.hash('12345678', 10),
      nickname: 'user4',
      avatar: 'https://i.imgur.com/jlFgGpe.jpeg',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'user5@example.com',
      password: await bcrypt.hash('12345678', 10),
      nickname: 'user5',
      avatar: 'https://i.imgur.com/TEMGYjY.jpeg',
      role: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'tmma@tmma.com',
      password: await bcrypt.hash('12345678', 10),
      store_name: 'TMMA格鬥館',
      role: 'owner',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'hrc@hrc.com',
      password: await bcrypt.hash('12345678', 10),
      store_name: 'HRC舞蹈教室',
      role: 'owner',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      email: 'goodtime@goodtime.com',
      password: await bcrypt.hash('12345678', 10),
      store_name: '好時光女生運動樂園',
      role: 'owner',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {})
  }
}
