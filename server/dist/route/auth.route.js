"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var express_1 = __importDefault(require("express"));
var prisma_db_1 = __importDefault(require("../db/prisma.db"));
var router = express_1.default.Router();
exports.authRouter = router;
router.post('/new_user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, fullName, primaryEmailAddress, imageUrl, username, existuser, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, fullName = _a.fullName, primaryEmailAddress = _a.primaryEmailAddress, imageUrl = _a.imageUrl, username = _a.username;
                if (!id || !username || !fullName) {
                    return [2 /*return*/, res.status(301).send('Id, firstName and email are required')];
                }
                return [4 /*yield*/, prisma_db_1.default.user.findUnique({
                        where: {
                            clerkId: id
                        }
                    })];
            case 1:
                existuser = _b.sent();
                if (existuser) {
                    return [2 /*return*/, res.status(201).send('User already exists')];
                }
                return [4 /*yield*/, prisma_db_1.default.user.create({
                        data: {
                            clerkId: id,
                            name: fullName,
                            email: primaryEmailAddress.emailAddress,
                            profileImg: imageUrl,
                            username: username
                        }
                    })];
            case 2:
                user = _b.sent();
                res.json({ success: true, message: 'User created successfully' });
                return [2 /*return*/];
        }
    });
}); });
router.post('/update_user', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, username, name, clerkId, profileImg, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, username = _a.username, name = _a.name, clerkId = _a.clerkId, profileImg = _a.profileImg;
                if (!email || !username || !name || !clerkId) {
                    return [2 /*return*/, res.status(400).send('Email, username, name, and clerkId are required')];
                }
                return [4 /*yield*/, prisma_db_1.default.user.update({
                        where: {
                            clerkId: clerkId
                        },
                        data: {
                            username: username,
                            name: name,
                            email: email,
                            profileImg: profileImg
                        }
                    })];
            case 1:
                user = _b.sent();
                res.json({ success: true, message: 'User updated successfully' });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=auth.route.js.map