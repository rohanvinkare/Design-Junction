const mongoose = require("mongoose");

const routerPermissionSchema = new mongoose.Schema({
    router_endpoint: {
        type: String,
        required: true,
    },
    role: {
        type: Number, // 0,1,2,3
        required: true
    },
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Permission" // This should match the model name "Permission"
    },
    permissions: {
        type: Array, // 0,1,2,3
        required: true
        // 0->create ,1->read ,2->update, 3->delete
    }
});

module.exports = mongoose.model("RouterPermission", routerPermissionSchema);
