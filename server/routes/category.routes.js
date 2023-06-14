const express = require('express');
const router = express.Router();
const { Bouquet, Category } = require('../db/models');

router.get('/', async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  });

router.get('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const bouquetCategory = await Bouquet.findAll({
  where: { category_id: id }
    });
    return res.json(bouquetCategory);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

module.exports = router;
