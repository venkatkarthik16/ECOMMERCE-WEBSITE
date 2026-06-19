import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

import { CartItem } from "../models/CartItem.js";
import { Product } from "../models/Product.js";
import { DeliveryOption } from "../models/DeliveryOption.js";

const router = express.Router();



router.post("/create-order", async (req, res) => {

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  const cartItems = await CartItem.findAll();

  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = await Product.findByPk(item.productId);
    const deliveryOption = await DeliveryOption.findByPk(
      item.deliveryOptionId
    );

    productCostCents += product.priceCents * item.quantity;
    shippingCostCents += deliveryOption.priceCents;
  }

  const totalBeforeTax = productCostCents + shippingCostCents;
  const tax = Math.round(totalBeforeTax * 0.1);
  const totalCostCents = totalBeforeTax + tax;

  const order = await razorpay.orders.create({
    amount: totalCostCents,
    currency: "INR"
  });

  res.json(order);
});

router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body =
    razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(body.toString())
    .digest("hex");

  const isValid =
    expectedSignature === razorpay_signature;

  if (!isValid) {
    return res
      .status(400)
      .json({ success: false });
  }

  res.json({ success: true });
});

export default router;