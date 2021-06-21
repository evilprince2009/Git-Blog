"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippets: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var Blog = mongoose_1.default.model("Blog", blogSchema);
module.exports = Blog;
