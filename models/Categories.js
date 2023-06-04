'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.hasMany(models.Tasks, { onDelete: 'SET NULL' });
      this.belongsTo(models.Users);
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'Categories',
    underscored: true
  });
  return Categories;
};
