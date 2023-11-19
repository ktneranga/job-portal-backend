"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commonResponse_1 = require("../utils/commonResponse");
const cr = new commonResponse_1.CommonResponse();
const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || 'Something went wrong';
};
