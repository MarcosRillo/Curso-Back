import express from "express";
import routes from "./routes/index.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./direname.js";
import productManager from "./productManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebar configuration
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api", routes);

// Routes of views
app.use("/", viewsRoutes);

const httpServer = app.listen(8080, () => {
  console.log("Server listen on port 8080");
});

export const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("New user connected");
  const products = await productManager.getProducts();
  socket.emit("products", { products });
});
