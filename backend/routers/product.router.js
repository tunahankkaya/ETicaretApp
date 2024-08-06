const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");
const upload = require("./services/file.service");
const response = require("./services/upload.service");
const fs = require('fs');

//Ürün Ekleme
router.post("/add",upload.array("images"),async(req, res)=>{
  response(res, async ()=> {
      const {name, stock, price, categories} = req.body;

      const productId = uuidv4();
      let product = new Product({
          _id: productId,
          name: name.toUpperCase(),
          stock: stock,
          price: price,
          categories: categories,
          isActive: true,
          imageUrls: req.files,
          createdDate: new Date()
      });
      await product.save();

      res.json({message: "Ürün kaydı başarıyla tamamlandı!"});
  });  
});

//Ürün Silme
router.post("/removeById", async (req, res)=> {
  response(res, async()=> {
      const {_id}= req.body;

      const product = await Product.findById(_id);
      for(const image of product.imageUrls){
          fs.unlink(image.path, ()=> {});
      }

      await Product.findByIdAndDelete(_id);
      res.json({message: "Ürün kaydı başarıyla silindi!"});
  });
});

//Ürün Listesi Getir
router.post("/", async(req, res)=> {
    try {
        const { pageNumber = 1, pageSize = 10, search = "" } = req.body;

        // Parametre doğrulama
        if (isNaN(pageNumber) || isNaN(pageSize)) {
            return res.status(400).json({ message: "Geçersiz sayfa numarası veya sayfa boyutu." });
        }

        const productCount = await Product.find({
            name: { $regex: search, $options: 'i' }
        }).countDocuments();

        const products = await Product.find({
            name: { $regex: search, $options: 'i' }
        })
        .sort({ name: 1 })
        .populate("categories")
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

        const totalPageCount = Math.ceil(productCount / pageSize);
        const model = {
            datas: products,
            pageNumber: pageNumber,
            pageSize: pageSize,
            totalPageCount: totalPageCount,
            isFirstPage: pageNumber === 1,
            isLastPage: totalPageCount === pageNumber
        };

        res.json(model);
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu.", error: error.message });
    }
});


//Ürünün Aktif/Pasif Durumunu Değiştir
router.post("/changeActiveStatus", async(req, res)=> {
  response(res, async()=> {
      const {_id} = req.body;
      let product = await Product.findById(_id);
      product.isActive = !product.isActive;
      var result = await Product.findByIdAndUpdate(_id, product);
      console.log(result);
      res.json({message: "Ürünün durumu başarıyla değiştirildi!"});
  });
});

//Ürünü Id'ye Göre Getir
router.post("/getById", async(req, res)=> {
  response(res, async()=>{
      const {_id}= req.body;
      let product = await Product.findById(_id);
      res.json(product);
  });
});

//Ürünü Güncelleme
router.post("/update", upload.array("images"), async(req, res)=> {
  response(res, async()=>{
      const {_id, name, stock, price, categories} = req.body;

      let product = await Product.findById(_id);
      // for(const image of product.imageUrls){
      //     fs.unlink(image.path, ()=> {});
      // }

      let imageUrls;
      imageUrls = [...product.imageUrls,...req.files]
      product = {
          name: name.toUpperCase(),
          stock: stock,
          price: price,
          imageUrls: imageUrls,
          categories: categories,           
      };
      await Product.findByIdAndUpdate(_id, product);
      res.json({message: "Ürün kaydı başarıyla güncellendi!"});
  });
});

//Ürün Resmi Sil
router.post("/removeImageByProductIdAndIndex", async(req, res)=>{
  response(res, async()=>{
      const {_id, index}= req.body;

      let product = await Product.findById(_id);
      if(product.imageUrls.length == 1){
          res.status(500).json({message: "Son ürün resmini silemezsiniz! En az 1 ürün resmi bulunmak zorundadır!"});
      }else{
          let image = product.imageUrls[index];
          product.imageUrls.splice(index,1);
          await Product.findByIdAndUpdate(_id, product);
          fs.unlink(image.path, ()=>{});
          res.json({message: "Resim başarıyla kaldırıldı!"});
      }
  });
});


//Ana sayfa için ürün listesini getir
router.post("/getAllForHomePage", async(req, res)=> {
  response(res, async()=>{
      const {pageNumber, pageSize, search, categoryId, priceFilter} = req.body;
      let products;
      if(priceFilter == "1"){
           products = await Product
              .find({
                  isActive: true,
                  categories: { $regex: categoryId, $options: 'i'},
                  $or: [
                      {
                          name: { $regex: search, $options: 'i'}
                      }
                  ]
              })
              .sort({name: 1})
              .populate("categories");
      }else{
          products = await Product
              .find({
                  isActive: true,
                  categories: { $regex: categoryId, $options: 'i'},
                  $or: [
                      {
                          name: { $regex: search, $options: 'i'}
                      }
                  ]
              })
              .sort({price: priceFilter})
              .populate("categories");
      }

      res.json(products);
  });
});

module.exports = router;