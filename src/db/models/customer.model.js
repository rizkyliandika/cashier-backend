module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING(200),
      },
      barcode: {
        type: DataTypes.STRING(50),
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
  return Customer;
};
