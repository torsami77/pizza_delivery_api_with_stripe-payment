"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//import router from './routes';
const database_1 = require("./database/database");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const PORT = +(process.env.PORT || 3000);
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.text());
app.use(body_parser_1.default.json({ type: 'application/json' }));
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Super-Piza API',
    });
});
//app.use('/api/v1/', router);
app.use((req, res, next) => {
    const err = new Error('Not Found');
    next(err);
});
app.listen(PORT, () => {
    console.log(`Local server would be running on ${PORT}`);
    database_1.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("database connected");
        try {
            yield database_1.sequelize.sync({ force: true });
        }
        catch (error) {
            console.log(error.message);
        }
    })).catch((e) => {
        console.log(e.message);
    });
});
