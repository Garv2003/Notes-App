"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    }
});
async function testConnection() {
    client.on('connect', () => {
        console.log('Connected to Redis');
    });
    client.on('error', (err) => {
        console.error(err);
    });
}
testConnection();
if (!client.isOpen) {
    client.connect();
}
exports.default = client;
//# sourceMappingURL=redis.db.js.map