//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { conn, Videogame, Category } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({force:true}).then(() => {
  server.listen(3000, async () => {
    console.log('%s listening at 3000'); // eslint-disable-line no-console
  
    const data = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = data.data.results.map(genre => {return{id: genre.id, name: genre.name}});

    genres.forEach(genre => Category.create(genre));
  });
});
