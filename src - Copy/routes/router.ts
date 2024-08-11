import express from "express";
import router from "./apiRoutes";
const routers = express.Router();

routers.get("/users/", router);  
routers.get('/users/:userId', router);
routers.post("/users/", router);
routers.patch("/users/:userId", router);
routers.delete("/users/:userId", router);

export default routers;
