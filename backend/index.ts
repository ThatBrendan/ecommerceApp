import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import basketRoutes from "./routes/basketRoutes";
import couponRoutes from "./routes/couponRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors(), express.json());

app.use("/products", productRoutes);
app.use("/basket", basketRoutes);
app.use("/coupon", couponRoutes);
app.use("/payment", paymentRoutes);

app.listen(process.env.PORT ?? PORT, () => {
  console.log(`Adventure has started on http://localhost:${PORT}`);
});
