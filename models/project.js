'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projects.belongsTo(models.Users, {foreignKey: 'authorId'});
    }
  };
  Projects.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {

    sequelize,
    modelName: 'Projects',
  });
  return Projects;
};