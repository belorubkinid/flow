const express = require('express');
const router = express.Router();
const { Cart, Bouquet } = require('../db/models')

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const carts = await Cart.findAll({ where: { 
      user_id: id, 
      isActive: true,
    }});
    return res.json(carts);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
})

router.post('/bouquet', async (req, res) => {
  try {
    const { id } = req.body;
    const bouquet = await Bouquet.findOne({ where : { id }});
    return res.json({ bouquet });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
})

router.post('/', async (req, res) => {
  try {
    const { item, id, uuid } = req.body;
    const recordCartItem = await Cart.create({ bouquet_id: item.bouquet.id, count: item.count, uuid, user_id: id,  })
    return res.json({recordCartItem});
  } catch (error) {
    console.error(error);
    return res.json(error); 
  }
})

module.exports = router;
