"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var compression_1 = __importDefault(require("compression"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL
}));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send("For Testing Purpose");
});
app.use('/', require('./route/auth.route').authRouter);
app.use('/', require('./route/note.route').noteRouter);
app.use('/', require('./route/tag.route').tagRouter);
app.listen(process.env.PORT || 3000, function () {
    console.log('Server is running on port ' + process.env.PORT || 3000);
});
//# sourceMappingURL=index.js.map