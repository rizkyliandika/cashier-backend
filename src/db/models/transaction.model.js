module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      table_number: {
        type: DataTypes.INTEGER
      },
      total: {
        type: DataTypes.BIGINT
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Transaction;
}