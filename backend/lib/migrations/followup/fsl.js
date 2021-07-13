var mongoose = require("mongoose")
var config = require("../../../config")
require("../../../config/mongoose")(mongoose, config)
var Followup = mongoose.model("Followup")

Followup.updateMany(
  {
    "benefits.id": {
      $regex: "fonds_solidarite_logement_aide_maintien_eligibilite$",
    },
  },
  {
    $set: {
      "benefits.$.id": "fsl_eligibilite",
    },
  },
  function (err) {
    console.log(err)
    process.exit()
  }
)
