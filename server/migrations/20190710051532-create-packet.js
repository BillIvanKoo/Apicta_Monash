'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Packets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER
      },
      total_tcp: {
        type: Sequelize.INTEGER
      },
      total_http: {
        type: Sequelize.INTEGER
      },
      total_udp: {
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      size_tcp: {
        type: Sequelize.INTEGER
      },
      size_http: {
        type: Sequelize.INTEGER
      },
      size_udp: {
        type: Sequelize.INTEGER
      },
      segment_id: {
        type: Sequelize.INTEGER
      },
      port_src: {
        type: Sequelize.TEXT
      },
      port_src_tcp: {
        type: Sequelize.TEXT
      },
      port_src_udp: {
        type: Sequelize.TEXT
      },
      port_dst: {
        type: Sequelize.TEXT
      },
      port_dst_tcp: {
        type: Sequelize.TEXT
      },
      port_dst_udp: {
        type: Sequelize.TEXT
      },
      mac_src: {
        type: Sequelize.TEXT
      },
      mac_dst: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Packets');
  }
};