const { db } = require("../db/connection");
const { Op } = require("sequelize");
const Product = db.product;

exports.createProduct = (customerId, product) => {
  return Product.create({
    brand: product.brand,
    price: product.price,
    active: product.active,
    customerId: customerId,
  })
    .then((product) => {
      console.log(">> Created product: ", JSON.stringify(product, null, 4));
      return product;
    })
    .catch((err) => {
      console.error(">> Error while creating product: ", err);
    });
};

exports.updateProduct = (id, product) => {
  return Product.update(
    {
      brand: product.brand,
      price: product.price,
      active: product.active,
    },
    {
      where: { id },
    }
  )
    .then((product) => {
      console.log(">> Updated product: ", JSON.stringify(product, null, 4));
      return product;
    })
    .catch((err) => {
      console.error(">> Error while updating product: ", err);
    });
};

exports.deleteProduct = (id) => {
  return Product.destroy({ where: { id } })
    .then((product) => {
      console.log(">> Deleted product: ", JSON.stringify(product, null, 4));
      return product;
    })
    .catch((err) => {
      console.error(">> Error while deleting product: ", err);
    });
};

exports.findAll = () => {
  return Product.findAll({ include: ["customer"] }).then((product) => {
    return product;
  });
};

exports.findProductById = (id) => {
  return Product.findByPk(id, { include: ["customer"] })
    .then((product) => {
      return product;
    })
    .catch((err) => {
      console.error(">> Error while finding product: ", err);
    });
};

exports.findProductByBrand = (brand) => {
  return Product.findAll({
    where: {
      brand: {
        [Op.like]: `%${brand}%`,
      },
    },
  })
    .then((brand) => {
      return brand;
    })
    .catch((err) => {
      console.error(">> Error while finding product by brand: ", err);
    });
};
