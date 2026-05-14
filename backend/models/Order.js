import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        quantity: {
          type: Number,
          required: true
        }
      }
    ],

    shippingAddress: {
      address: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      postalCode: {
        type: String,
        required: true
      },

      country: {
        type: String,
        required: true
      }
    },

    totalPrice: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      default: "Stripe"
    },

    isPaid: {
      type: Boolean,
      default: false
    },

    orderStatus: {
      type: String,
      default: "Processing"
    }

  },

  {
    timestamps: true
  }

);

export default mongoose.model("Order", orderSchema);