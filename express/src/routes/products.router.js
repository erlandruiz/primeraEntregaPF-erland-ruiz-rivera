import { Router } from 'express';
export const router=Router()


import { join } from "path";//Utilizamos el path para poder trabajar con rutas absolutas
import __dirname from '../../../utils2.js'; //Importamos utils para poder trabvajar con rutas absolutas
import { ProductManager } from '../ProductManager.js';






let archivo = join(__dirname, "/archivos/products.json");

console.log(archivo)

const productManager = new ProductManager(archivo);


router.get('/',async (req,res)=>{ //Get que pide productos y limit

    let resultado = await productManager.getProductsAsyncFS();

    if (req.query.limit) {
      resultado = resultado.slice(0, req.query.limit);
    }
    res.setHeader("Content-type", "application/json");
    return res.status(200).json({ filtros: req.query, resultado });

    

})

router.get('/:pid',async (req,res)=>{ //Get que pide productos por id
let {pid} = req.params
pid = parseInt(pid)


if (isNaN(pid)) {
    res.setHeader("Content-Type", "application/json");
    return res
      .status(400)
      .send({ error: "Error, ingrese un argumento id numerico" });
  }
  let resultado = await productManager.getProductByIdAsyncFS(pid)

  if (!resultado) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).send({ error: `Error, No existe el id ${pid}` });
  }
  res.setHeader("Content-type", "application/json");
  return res.status(200).json({ filtros: req.params, resultado });
    

})



router.post('/',async (req,res)=>{//Post agrega datos
    let {
        title,
        description,
        price,
        thumbnail = [],
        code,
        stock,
        category,
        status,
      } = req.body;

      if (!title || !description || !price || !code || !stock || !category) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({
          error: `Los datos title, description, price, code, stock , category y status son obligatorios`,
        });
      }

     let resultado =  await productManager.addProductAsyncFS(title, description,price, thumbnail, code, stock, category, status)
    

     res.setHeader("Content-Type", "application/json");
     return res.status(200).json({ resultado });
})




router.put('/:pid',async (req,res)=>{

    let {pid} = req.params;
   
   
    pid = parseInt(pid)
    if (isNaN(pid)) {
        res.setHeader("Content-Type", "application/json");
        return res
          .status(400)
          .json({ error: `Debe de ingresar un id numerico` });
      }

      let propiedadesPermitidas = [
        "title",
        "description",
        "price",
        "thumbnail",
        "code",
        "stock",
        "category",
        "status",
      ];

      let propiedadesQueLlegan = Object.keys(req.body);

      //Comparando los campos que llegan con los permitidos
      let valido = propiedadesQueLlegan.every((propiedad) => {
        return propiedadesPermitidas.includes(propiedad);
      });

      if (!valido) {
        res.setHeader("Content-Type", "application/json");
        return res
          .status(400)
          .json({
            error: `No se aceptan algunas propiedades`,
            propiedadesPermitidas,
          });
      }

    let resultado = await productManager.updateProductAsyncFS(pid, req.body)

    

    res.setHeader("Content-Type", "application/json");
     return res.status(200).json({ resultado });
})



router.delete('/:pid',async (req,res)=>{
    let { pid } = req.params;
  
    pid = parseInt(pid);
  
    if (isNaN(pid)) {
      res.setHeader("Content-Type", "application/json");
       return res.status(400).json({ error:`Debe de ingresar un id numerico` });
  
    }

    let resultado = await productManager.delProductAsyncFS(pid)

    res.setHeader("Content-Type", "application/json");

    return res.status(200).json({message:'Producto Eliminado', resultado });
    

   
})