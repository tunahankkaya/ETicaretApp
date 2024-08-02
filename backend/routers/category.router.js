const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");
const response = require("./services/upload.service");

router.post("/add", async (req, res) => {
    response(res, async () => {
        const { name } = req.body;
        const checkName = await Category.findOne({ name: name });
        if (checkName != null) {
            res.status(403).json({ message: "This category already exists" });
            return;
        } else {
            const category = new Category({
                _id: uuidv4(),
                name: name,
            });
            await category.save();
            res.json({ message: "Category added successfully" });
        }
    });
});

router.post("/removeById", async (req, res) => {
    response(res, async () => {
        const { _id } = req.body;
        await Category.findOneAndDelete({ _id: _id });
        res.json({message:"Kategori başarıyla silindi"}); 
    });
});

router.post("/update", async (req, res) => {

    response(res, async () => {
        const { _id, name } = req.body;
        const category = await Category.findOne({ _id: _id });

        if (category.name != name) {
            const checkName = await Category.findOne({ name: name });
            if (checkName != null) {
                res.status(403).json({ message: "Bu kategori adı daha önce kullanılmış!" });
            } else {
                category.name = name;
                await Category.findByIdAndUpdate(_id, category);
                res.json({ message: "Kategori kaydı başarıyla güncellendi!" });
            }
        } else {
            res.json({ message: "Kategori adı değişmedi." });
        }
    });
});

router.get("/", async ( req,res) => {

    response(res, async () => {
        const categories = await Category.find().sort({ name: 1 });
        res.json(categories );
    });
});

module.exports = router;
