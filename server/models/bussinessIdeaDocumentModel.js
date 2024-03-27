module.exports = (sequelize, DataTypes) => {

    const bussinessIdeaDocument = sequelize.define("bussinessIdeaDocument", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        BussinessIdeaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Documentfield: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DocumentType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ContentBase64: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    })

    return bussinessIdeaDocument;
}