const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
    location: 'mongodb://localhost/cw-13',
  mongoOptions: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
};