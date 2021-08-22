import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

//Allows us to ge a vital id

categorySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

categorySchema.set("toJSON", {
  virtuals: true,
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
