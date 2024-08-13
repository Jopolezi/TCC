const multer = require('multer');
const path = require('path');

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const destPath = path.join(__dirname, '../Icons-Users/');
            console.log(`Saving file to ${destPath}`); // Log do caminho
            cb(null, destPath);
        },
        filename: function(req, file, cb) {
            const username = req.body.username;

            const filename = `${username}${path.extname(file.originalname)}`;
            console.log(`Saving file as ${filename}`); // Log do nome do arquivo
            cb(null, filename);
          }
    }),
    fileFilter: (req, file, cb) => {
        const extesaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito === file.mimetype);
        if (extesaoImg) {
            return cb(null, true);
        }
        console.log('Invalid file type'); // Log de tipo de arquivo inválido
        return cb(new Error('Tipo de arquivo não suportado'), false);
    }
});
