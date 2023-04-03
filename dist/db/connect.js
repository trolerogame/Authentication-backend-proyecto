"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = require("../config");
;
(async () => {
    try {
        await (0, mongoose_1.connect)(config_1.config.serverDb);
        console.log('base de dato conectado');
    }
    catch (err) {
        console.error(err);
    }
})();
