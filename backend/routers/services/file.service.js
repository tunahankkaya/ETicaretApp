const multer = require('multer');

const storage = multer.diskStorage({destinotion: (req, file, cb) => {
    cb(null, 'uploads/');
},
fileName: function(req, file, cb) {
    cb(null, Date.now() + "-" +file.originalname);
}
});

const upload = multer({storage: storage});
module.exports = upload;