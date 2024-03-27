

module.exports = (sequelize, DataTypes) => {

    const followers = sequelize.define("followers", {
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        FollowedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return followers;
}