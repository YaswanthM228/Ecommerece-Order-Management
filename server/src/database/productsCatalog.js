// =============================================================================
// SHOPSPHERE COMPLETE 275-PRODUCT MASTER CATALOG
// 11 Categories x 25 Products = Exactly 275 Curated Products
// All with realistic INR pricing, authentic brands, unique SKUs, and photography
// =============================================================================

const { productsData: cat1 } = require('./productsCatalogPart1');
const { cat2to4 } = require('./productsCatalogCat2to4');
const { cat5to7 } = require('./productsCatalogCat5to7');
const { cat8to11 } = require('./productsCatalogCat8to11');

const allProducts = [
  ...cat1,
  ...cat2to4,
  ...cat5to7,
  ...cat8to11
];

module.exports = {
  allProducts
};
