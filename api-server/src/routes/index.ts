import { Router, type IRouter } from "express";
import healthRouter from "./health";
import yunoraProxyRouter from "./yunora-proxy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(yunoraProxyRouter);

export default router;
