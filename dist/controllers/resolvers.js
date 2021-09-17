"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./Query");
const mutations_1 = require("./mutations");
exports.default = {
    Query: {
        getUser: Query_1.getUser
    },
    Mutation: {
        createUser: mutations_1.createUser,
        editUser: mutations_1.editUser,
        loginUser: mutations_1.loginUser
    }
};
