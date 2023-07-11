import {Sequelize} from "sequelize";
import {config} from "dotenv";
config();

export const connect = new Sequelize(process.env.DB_URL, {
    dialect: "postgres"
})