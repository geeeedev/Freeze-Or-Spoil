//establish CRUD control methods using model
const Freezer = require("../models/freezer.model");

module.exports = {
  create(req, res) {
    Freezer.create(req.body)
      .then((newItem) => {
        res.json(newItem);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getAll(req, res) {
    Freezer.find()
      .then((AllItems) => {
        res.json(AllItems);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getOne(req, res) {
    Freezer.findById(req.params.id)
      .then((oneItem) => {
        res.json(oneItem);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  getCategories(req, res) {
    Freezer.find({},{"category":1,_id:0})
      .then((AllCategories) => {
        res.json(AllCategories);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  update(req, res) {
    Freezer.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    })
      .then((updatedItem) => {
        res.json(updatedItem);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  delete(req, res) {
    // Freezer.findOneAndDelete(req.params.id)    //Watch out for typo from syntax autofill: findOneAndDelete always delete the FIRST item in DB ignoring _id param passed
    Freezer.findByIdAndDelete(req.params.id)
      .then((deletedItem) => {
        res.json(deletedItem);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
};

// module.exports = {
//   create(req, res) {},
//   getAll(req, res) {},
//   getOne(req, res) {},
//   update(req, res) {},
//   delete(req, res) {},
// };
