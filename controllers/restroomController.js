const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Restroom
      .find({})
      .then(dbModel => res.send(dbModel))
      .catch(err => res.json(err));
  },
  create: (req, res) => {
    let newLoo = {
      name: req.body.name,
      location: req.body.location,
      category: req.body.category,
      lat: req.body.lat,
      lng: req.body.lng
    };
    db.Restroom
      .findOneAndUpdate(
        newLoo,
        {$push: {'comments': {'comment': req.body.comment}}},
        {upsert: true}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  },
  updateComments: (req, res) => {
    let newComment = {
      'comment': req.body.comment
    };
    db.Restroom
      .findOneAndUpdate(
        {_id: req.params.id},
        {$push: {'comments': newComment}}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.json(err));
  }
};
