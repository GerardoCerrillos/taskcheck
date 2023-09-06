import { DataTypes } from "sequelize";
import db from "../Utils/database.js";

const Task = db.define("tasks", {
  id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
  },
  tasktitle:{
      type: DataTypes.STRING(30),
      allowNull:true
  },
  taskdescription:{
    type: DataTypes.STRING(150),
    allowNull: true
  },
  complete:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull:false
  }

});

export default Task;



