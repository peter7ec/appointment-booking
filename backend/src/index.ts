import express from "express";
import { JWT_SECRET, PORT } from "./constants/global";
import errorHandler from "./middlewares/errorHandle";

const app = express();

app.use(express.json());

app.use(errorHandler);

app.listen(PORT, () => {
    if (!JWT_SECRET) {
        /* if need JWT */ throw new Error("Missing JWT secret.");
    }

    console.log(`App listening on port ${PORT}`);
});
