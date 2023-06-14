const express = require('express');
const router = express.Router();
const { Bouquet } = require('../db/models');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cardOne = await Bouquet.findByPk(id);
    return res.json(cardOne);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
})


module.exports = router;
