module.exports = (sequelize, DataTypes) => {

    const premiumSubcriptionType = sequelize.define("premiumSubcriptionType", {
        SubcriptionType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return premiumSubcriptionType;
}