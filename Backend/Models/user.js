const { DataTypes } = require("sequelize");
const sequelize = require("../Database/connection");

// define user model
const User = sequelize.define("User", {
  // Model attributes are defined here
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
  }
});
module.exports = User;
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
