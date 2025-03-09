import { Router } from "express";
import {
  healthcheck,
  allDBvideos,
} from "../controllers/healthcheck.controller.js";

const router = Router();

router.route("/").get(healthcheck);
router.route("/allDBvideos").get(allDBvideos);

export default router;
