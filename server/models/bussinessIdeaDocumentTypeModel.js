module.exports = (sequelize, DataTypes) => {

    const bussinessIdeaDocumentType = sequelize.define("bussinessIdeaDocumentType", {
        DocumentType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return bussinessIdeaDocumentType;
}