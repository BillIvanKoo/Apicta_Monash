module.exports = (sequelize, type) => {
    return sequelize.define('packet', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: type.INTEGER,
        total_tcp: type.INTEGER,
        total_http: type.INTEGER,
        total_udp: type.INTEGER,
        timestamp: type.DATE,
        size: type.INTEGER,
        size_tcp: type.INTEGER,
        size_http: type.INTEGER,
        size_udp: type.INTEGER,
        ip_src: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_src'));
            },
            set: function(val) {
                return this.setDataValue('ip_src', JSON.stringify(val));
            }
        },
        ip_src_tcp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_src_tcp'));
            },
            set: function(val) {
                return this.setDataValue('ip_src_tcp', JSON.stringify(val));
            }
        },
        ip_src_http: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_src_http'));
            },
            set: function(val) {
                return this.setDataValue('ip_src_http', JSON.stringify(val));
            }
        },
        ip_src_udp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_src_udp'));
            },
            set: function(val) {
                return this.setDataValue('ip_src_udp', JSON.stringify(val));
            }
        },
        ip_dst: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_dst'));
            },
            set: function(val) {
                return this.setDataValue('ip_dst', JSON.stringify(val));
            }
        },
        ip_dst_tcp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_dst_tcp'));
            },
            set: function(val) {
                return this.setDataValue('ip_dst_tcp', JSON.stringify(val));
            }
        },
        ip_dst_http: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_dst_http'));
            },
            set: function(val) {
                return this.setDataValue('ip_dst_http', JSON.stringify(val));
            }
        },
        ip_dst_udp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('ip_dst_udp'));
            },
            set: function(val) {
                return this.setDataValue('ip_dst_udp', JSON.stringify(val));
            }
        },
        segment_id: type.INTEGER,
        port_src: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_src'));
            },
            set: function(val) {
                return this.setDataValue('port_src', JSON.stringify(val));
            }
        },
        port_src_tcp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_src_tcp'));
            },
            set: function(val) {
                return this.setDataValue('port_src_tcp', JSON.stringify(val));
            }
        },
        port_src_http: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_src_http'));
            },
            set: function(val) {
                return this.setDataValue('port_src_http', JSON.stringify(val));
            }
        },
        port_src_udp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_src_udp'));
            },
            set: function(val) {
                return this.setDataValue('port_src_udp', JSON.stringify(val));
            }
        },
        port_dst: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_dst'));
            },
            set: function(val) {
                return this.setDataValue('port_dst', JSON.stringify(val));
            }
        },
        port_dst_tcp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_dst_tcp'));
            },
            set: function(val) {
                return this.setDataValue('port_dst_tcp', JSON.stringify(val));
            }
        },
        port_dst_http: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_dst_http'));
            },
            set: function(val) {
                return this.setDataValue('port_dst_http', JSON.stringify(val));
            }
        },
        port_dst_udp: {
            type: DataTypes.STRING,
            get: function() {
                return JSON.parse(this.getDataValue('port_dst_udp'));
            },
            set: function(val) {
                return this.setDataValue('port_dst_udp', JSON.stringify(val));
            }
        }
    })
}