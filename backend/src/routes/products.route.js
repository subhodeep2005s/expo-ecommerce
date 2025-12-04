import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts } from "../controller/admin.controller.js";
import { getProductsById } from "../controller/product.controller.js";

const router = Router();

router.use(protectRoute);

router.get("/", getAllProducts);
router.get("/:id", getProductsById);

export default router;
