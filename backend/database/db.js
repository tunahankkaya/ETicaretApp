const mongoose = require('mongoose');

uri = "mongodb+srv://tKaya9101:iEHqQsyxuRunyeSt@eticaretdb.wciapxe.mongodb.net/?retryWrites=true&w=majority&appName=ETicaretDb"

const connection = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,     // DeprecationWarning: current URL string parser is deprecated
        useUnifiedTopology: true   // DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
    
    }).then(() => {
        console.log('Database connection is successful');
    }).catch((err) => {
        console.log('Database connection failed');
    });
}

module.exports = connection;
