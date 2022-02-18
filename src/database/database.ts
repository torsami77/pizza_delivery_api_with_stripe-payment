import { Sequelize } from 'sequelize-typescript';
import users from './models/user.model';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
    process.env.DB_NAME ?? '',
    process.env.DB_USER ?? '',
    process.env.DB_PASSWORD ?? '',
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        models: [__dirname + '/models']
    }
)
sequelize.addModels([users]);

export default sequelize;