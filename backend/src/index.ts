import express from "express";
import { JWT_SECRET, PORT } from "./constants/global";
import errorHandler from "./middlewares/errorHandle";
import authRouter from "./auth/authRoutes";
import apiRouter from "./api/apiRouters";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    if (!JWT_SECRET) {
        /* if need JWT */ throw new Error("Missing JWT secret.");
    }

    console.log(`App listening on port ${PORT}`);
});
