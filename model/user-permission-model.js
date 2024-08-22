const mongoose = require("mongoose");

const userPermissionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  permissions: [
    {
      permission_name: String,
      permission_value: [Number], //[string] if not dealing with numbers
      // 0->create ,1->read ,2->update, 3->delete
    },
  ],
});

module.exports = mongoose.model("userPermission", userPermissionSchema);

