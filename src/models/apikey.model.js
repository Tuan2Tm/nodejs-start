const { Schema, default: mongoose } = require('mongoose');

const apiKeySchema = new Schema(
  {
    key: { type: String, required: true, unique: true, maxlength: 1024, trim: true },
    version: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: Array, default: ['GENERAL'] },
    status: { type: Boolean, default: false },
  },
  { collection: 'apikeys', timestamps: true }
);

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;
