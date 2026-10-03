require('dotenv').config();
const serve = require('./app');
const db = require('./src/config/database'); 
db(); 
const port = process.env.PORT || 5001;

serve.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});
