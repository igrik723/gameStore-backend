const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Game = sequelize.define('game',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: { type: DataTypes.STRING, allowNull: false}
})


const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})


const Publisher = sequelize.define('publisher', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const GameInfo = sequelize.define('game_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypePublisher = sequelize.define('type_publisher', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


Type.hasMany(Game)
Game.belongsTo(Type)

Publisher.hasMany(Game)
Game.belongsTo(Publisher)

Game.hasOne(GameInfo)
GameInfo.belongsTo(Game)

Type.belongsToMany(Publisher, {through: TypePublisher})
Publisher.belongsToMany(Type, { through: TypePublisher })

module.exports = {
    User,
    Game,
    Type,
    Publisher,
    GameInfo,
    TypePublisher     
}