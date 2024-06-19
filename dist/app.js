"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const order_route_1 = require("./modules/orders/order.route");
const app = (0, express_1.default)();
///its a parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
///application routes
app.use('/', product_route_1.ProductRoutes);
app.use('/', order_route_1.OrderRoutes);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
console.log(process.cwd());
exports.default = app;
