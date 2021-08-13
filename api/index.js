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
const { conn, Videogame, Category, Platform } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({force:true}).then(() => {
  server.listen(3001, async () => {
    try{
      console.log('%s listening at 3001'); // eslint-disable-line no-console

      const dataGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const genres = dataGenres.data.results.map(genre => {return{id: genre.id, name: genre.name}});

      const dataPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${API_KEY}`);
      var platforms = [];
      dataPlatforms.data.results.forEach(result => {
        if(result.platforms.length > 0){
          result.platforms.forEach(plat => platforms.push({id: plat.id, name: plat.name}));
        }
      });

      genres.forEach(genre => Category.create(genre));
      platforms.forEach(plat => Platform.create(plat));
    }
    catch(error){
      console.error(error);
    }
  });
});
