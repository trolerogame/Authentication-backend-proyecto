"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
(async () => {
    try {
        await (0, mongoose_1.connect)(process.env.SERVER);
        console.log('base de dato conectado');
    }
    catch (err) {
        console.error(err);
    }
})();
