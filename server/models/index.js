const dbconfig = require("../config/dbconfig.js");
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log("connected...!");
    })
    .catch((err) => {
        console.log("ERROR" + err)
    })

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.products = require('./productModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)
db.premiumSubcriptionType = require('./premiumSubcriptionTypeModel.js')(sequelize, DataTypes);
db.bussinessIdeaDocumentType = require('./bussinessIdeaDocumentTypeModel.js')(sequelize, DataTypes);
db.premiumSubcription = require('./premiumSubcriptionModel.js')(sequelize, DataTypes);
db.bussinessIdeaDocument = require('./bussinessIdeaDocumentModel.js')(sequelize, DataTypes);
db.bussinessIdea = require('./bussinessIdeaModel.js')(sequelize, DataTypes);
db.followers = require('./followersModel.js')(sequelize, DataTypes);
db.messages = require('./messagesModel.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("yes re-sync done!")
    })


module.exports = db;