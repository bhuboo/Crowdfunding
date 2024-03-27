const { users, premiumSubcriptionType, bussinessIdeaDocumentType } = require(".");

module.exports = (sequelize, DataTypes) => {

    const premiumSubcription = sequelize.define("premiumSubcription", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        SubcriptionType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ExpiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        DocumentType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    })

    return premiumSubcription;
}