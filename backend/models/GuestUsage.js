import mongoose from "mongoose";

const guestUsageSchema = new mongoose.Schema({
  guestId: {type :String , required : true , index :true},
  ip: { type: String  },
  count: { type: Number, default: 0 },
  lastUsed: { type: Date, default: Date.now },
});

export default mongoose.model("GuestUsage", guestUsageSchema);