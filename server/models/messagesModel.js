module.exports = (sequelize, DataTypes) => {

    const messages = sequelize.define("messages", {
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        bussinessDocumentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    })

    return messages;
}