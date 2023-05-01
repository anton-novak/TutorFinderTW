"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // CLASS
const userSchema = new Schema({
    // DEFINE OUR DATA
    name: String,
    email: String,
    type: String,
    password: String,
    isComplete: Boolean
});
const Users = mongoose_1.default.model('users', userSchema); // MAKE A 'TABLE' BASED ON A SCHEMA
exports.default = Users;
