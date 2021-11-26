const { DataTypes, Model } = require('sequelize');

module.exports = class Songs extends Model {
     static init(sequelize) {
         return super.init({
            soThuTu: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            requestID: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            authorId: {type: DataTypes.STRING},
            songName: {type: DataTypes.TEXT}
         }, {
             tableName: 'songs',
             timestamps: true,
             sequelize: sequelize
         });
     }
}