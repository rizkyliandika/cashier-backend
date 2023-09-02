const { db } = require("../db/connection");
const Transaction = db.transaction;

exports.findAllTransaction = () => {
  return Transaction.findAll()
    .then((transaction) => {
      console.log(
        "Success find transactions: ",
        JSON.stringify(transaction, null, 4)
      );
      return transaction;
    })
    .catch((err) => {
      console.error(">> Error while finding transactions: ", err);
    });
};

exports.findTransactionById = (id) => {
  return Transaction.findByPk(id)
    .then((transaction) => {
      console.log(
        "Success find transaction: ",
        JSON.stringify(transaction, null, 4)
      );
      return transaction;
    })
    .catch((err) => {
      console.error(">> Error while finding transaction: ", err);
    });
};

exports.createTransaction = (transaction) => {
  return Transaction.create({
    table_number: transaction.tableNumber,
    total: transaction.total,
  })
    .then((transaction) => {
      console.log(
        ">> Created transaction: ",
        JSON.stringify(transaction, null, 4)
      );
      return transaction;
    })
    .catch((err) => {
      console.error(">> Error while creating transaction: ", err);
    });
};

exports.updateTransaction = (id, transaction) => {
  return Transaction.update(
    {
      table_number: transaction.tableNumber,
      total: transaction.total,
    },
    {
      where: { id },
    }
  )
    .then((transaction) => {
      console.log(
        " >> Updated transaction: ",
        JSON.stringify(transaction, null, 4)
      );
      return transaction;
    })
    .catch((err) => {
      console.error(" >> Error while updating transaction: ", err);
    });
};

exports.deleteTransaction = (id) => {
  return Transaction.destroy({ where: { id } })
    .then((transaction) => {
      console.log(
        ">> Deleted transaction: ",
        JSON.stringify(transaction, null, 4)
      );
      return transaction;
    })
    .catch((err) => {
      console.error(">> Error while deleting transaction: ", err);
    });
};
