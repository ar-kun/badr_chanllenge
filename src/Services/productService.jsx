import axios from 'axios';

export const getProducts = (callback) => {
 axios
  .get('https://mock.apidog.com/m1/523540-0-default/api/products', {
   headers: {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
   },
  })
  .then((res) => {
   callback(true, res.data.data);
  })
  .catch((err) => {
   callback(false, err);
  });
};
