module.exports = (sequelize, DataTypes) => {

    const bussinessIdea = sequelize.define("bussinessIdea", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        BussinessName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BussinessType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        InitialInvestment: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        Abstract: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        BussinessIdeaDes: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    })

    return bussinessIdea;
}