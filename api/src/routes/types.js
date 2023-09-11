const express = require("express")
const typesRoute = express.Router()
const {getTypes}= require("../handlres/typeHandler")

typesRoute.get("/", getTypes)

module.exports = { typesRoute }