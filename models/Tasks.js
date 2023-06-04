'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.Users);
      this.belongsTo(models.Priorities);
      this.belongsTo(models.Categories);
    }
  }
  Tasks.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    completed_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    priority_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tasks',
    tableName: 'Tasks',
    underscored: true
  });
  return Tasks;
};
