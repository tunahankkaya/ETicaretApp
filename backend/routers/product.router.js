const express = require("express");
const router = express.Router(); 
const product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const upload = require("./services/file.service");
const response = require("./services/upload.service");
const { findById, findByIdAndDelete } = require("../models/user");

//Ürün Ekleme
router.post("/add",upload.array("images"), async (req, res) => {
    response(res,() => {
        const { name, stock, price, isActive, categories } = req.body;
        const productId = uuidv4();
        let product = new product({
            _id: productId,
            name: name.toUpperCase(),
            stock: stock,
            price: price,
            createdDate: new Date(),
            imageurls: req.files,
            isActive: isActive,
            categories: categories,
        });
        product.save();
        res.json({ message: "Ürün kaydı başarılı şekilde tamamlandı." });
    });
});

//Ürün Silme
router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        const product = await Product.findById(_id);

        for(const image of product.imageurls){
            fs.unlink(image.path, () => {});
        }

        await findByIdAndRemove(_id);
        res.json({ message: "Ürün kaydı başarıyla silindi." });
    });
});

