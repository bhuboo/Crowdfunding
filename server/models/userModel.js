module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        FullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        AccessToken: {
            type: DataTypes.STRING
        },
        UserType: {
            type: DataTypes.INTEGER
        },
        Otp: {
            type: DataTypes.TEXT
        },
        OtpExpiry: {
            type: DataTypes.DATE
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            default: true,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            default: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            default: false,
        }
    })

    return User;
}