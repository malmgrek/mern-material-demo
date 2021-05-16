const Item = require("../models/Item");


const create = (req, res) => {

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Must proved an item",
    })
  }

  const item = new Item(body);

  if (!item) {
    return res.status(400).json({ success: false, error: err })
  }

  item
    .save()
    .then(() => res.status(201).json({
      success: true,
      id: item._id,
      message: "Item created!"
    }))
    .catch(error => res.status(400).json({
      error,
      message: "Item not created."
    }));

}


const read = async (req, res) => {

  console.log(req)

  await Item.find({}, (err, items) => {

    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      })
    }

    if (!items.length) {
      return res.status(404).json({
        success: false,
        error: "Did not find items."
      })
    }

    return res.status(200).json({
      success: true,
      data: items
    }).catch(err => console.log(err))

  })

}


const update = async (req, res) => {

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "Unknown request body."
    })
  }

  Item.findOne({ _id: req.params.id }, (err, item) => {

    if (err) {
      return res.status(404).json({
        err,
        message: "Item not found."
      })
    }

    // Changing identifier forbidden
    const { _id, ...allowedAttrs } = body;

    Object.assign(item, allowedAttrs);

    item
      .save()
      .then(() => res.status(200).json({
          success: true,
          id: item._id,
          message: "Item updated."
      }))
      .catch(error => res.status(404).json({
          error,
          message: "Item not updated."
      }));

  })

}


const del = async (req, res) => {

    await Item.findOneAndDelete({ _id: req.params.id }, (err, item) => {

        if (err) {
            return res.status(400).json({
              success: false,
              error: err
            })
        }

        if (!item) {
            return res .status(404) .json({
              success: false, error: "Item not found."
            })
        }

        return res.status(200).json({
          success: true,
          data: item
        })

    }).catch(console.log)
}


module.exports = {
  create,
  read,
  update,
  del
};
