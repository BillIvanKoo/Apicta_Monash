'use strict';
module.exports = (sequelize, type) => {
  const Packet = sequelize.define('Packet', {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: type.INTEGER,
    total_tcp: type.INTEGER,
    total_http: type.INTEGER,
    total_udp: type.INTEGER,
    timestamp: type.INTEGER,
    size: type.INTEGER,
    size_tcp: type.INTEGER,
    size_http: type.INTEGER,
    size_udp: type.INTEGER,
    segment_id: type.INTEGER,
    port_src: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('port_src')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('port_src', JSON.stringify(val));
        }
    },
    port_src_tcp: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('port_src_tcp')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('port_src_tcp', JSON.stringify(val));
        }
    },
    port_src_udp: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('port_src_udp')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('port_src_udp', JSON.stringify(val));
        }
    },
    port_dst: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('port_dst')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('port_dst', JSON.stringify(val));
        }
    },
    port_dst_tcp: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('port_dst_tcp')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('port_dst_tcp', JSON.stringify(val));
        }
    },
    port_dst_udp: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('port_dst_udp')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('port_dst_udp', JSON.stringify(val));
        }
    },
    mac_src: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('mac_src')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('mac_src', JSON.stringify(val));
        }
    },
    mac_dst: {
        type: type.TEXT,
        get: function() {
            let val = this.getDataValue('mac_dst')
            if (val){
                return JSON.parse(val);
            } 
            return
        },
        set: function(val) {
            return this.setDataValue('mac_dst', JSON.stringify(val));
        }
    }
  }, {});
  Packet.associate = function(models) {
    // associations can be defined here
  };
  return Packet;
};