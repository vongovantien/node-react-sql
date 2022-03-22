const dbConfig = require('../configs/dbConfig');

const {
    Sequelize,
    DataTypes
} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.BD,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            require: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)
sequelize.authenticate().then(() => {
    console.log('Connected.....')
}).catch(err => {
    console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./productModel.js")(sequelize, DataTypes)
db.reviews = require("./reviewModel.js")(sequelize, DataTypes)
db.users = require("./userModel")(sequelize, DataTypes)

db.sequelize.sync({
    force: false
}).then(() => {
    console.log("yes re-sync done !")
})

//One to many relationship
db.products.hasMany(db.reviews, {
    foreignKey: "product_id",
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: "product"
})

module.exports = db