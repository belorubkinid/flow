const { Event } = require('../db/models');


const eventPost = async (req, res) => {
  try {
    const { date, title, user_id } = req.body;
    const event = await Event.create({ date, title, user_id });
    return res.json(event);
    
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

const eventInit = async (req, res) => {
  try {
    const { id } = req.params;
    const events = await Event.findAll({
      where: {
        user_id: id,
      }
    });
    return res.json(events);
    
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

module.exports = { eventPost, eventInit }
