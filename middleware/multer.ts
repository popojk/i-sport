import multer from 'multer';
const upload = multer({ dest: 'temp/' });
module.exports = upload;
