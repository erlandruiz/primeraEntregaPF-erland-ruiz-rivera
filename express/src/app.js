//Se trabaja con ESC 6 utilizando import y export

import express, { urlencoded } from "express";


import { router as routerProducts } from "./routes/products.router.js";
import { router as routerCarts} from "./routes/carts.router.js";



//************************ //
//Limpiamos la consola
console.clear();
//************************ //

const PORT = 8080;

const app = express();



// Colocamos la siguiente linea para que el servidor pueda interpretar datos complejos
app.use(express.json());
app.use(urlencoded({ extended: true }));



//Uso del try catch para trabajar con datos asyncronos
const entorno2 = async () => {
  try {
    

    app.use("/api/products", routerProducts);// Lo que llega a api/products me lo atienda productsRouter//
    app.use("/api/carts", routerCarts); // Lo que llega a api/products me lo atienda cartsRouter//

   

    app.get("/", (req, res) => {
      res.setHeader("Content-Type", "text/html");
      res.status(200).send("Hola soy un servidor Express");
    });

    const server = app.listen(PORT, () => {
      console.log(`Server on line en puerto ${PORT}`);
    });
  } catch (error) {
    console.log("Se ha encontrado el siguiente error", error.message);
  }
};

entorno2();
