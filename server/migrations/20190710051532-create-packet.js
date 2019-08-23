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
      segmentId: {
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
      },
      connected: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      contain_anomaly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      total_score: {
        type: Sequelize.FLOAT
      },
      total_tcp_score: {
        type: Sequelize.FLOAT
      },
      total_http_score: {
        type: Sequelize.FLOAT
      },
      total_udp_score: {
        type: Sequelize.FLOAT
      },
      size_score: {
        type: Sequelize.FLOAT
      },
      size_tcp_score: {
        type: Sequelize.FLOAT
      },
      size_http_score: {
        type: Sequelize.FLOAT
      },
      size_udp_score: {
        type: Sequelize.FLOAT
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Packets');
  }
};