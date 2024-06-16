import axios from 'axios';

export const getOrders = (callback) => {
 axios
  .get('https://mock.apidog.com/m1/523540-0-default/api/orders?page=1&limit=10&customer_name&order_date=', {
   headers: {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
   },
  })
  .then((res) => {
   callback(true, res.data.list);
  })
  .catch((err) => {
   callback(false, err);
  });
};

export const getOrder = (OrderId, callback) => {
 axios
  .get(`https://mock.apidog.com/m1/523540-0-default/api/order/${OrderId}`, {
   headers: {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
   },
  })
  .then((res) => {
   callback(true, res.data);
  })
  .catch((err) => {
   callback(false, err);
  });
};

export const createOrder = (data, callback) => {
 axios
  .post(`https://mock.apidog.com/m1/523540-0-default/api/order`, data, {
   headers: {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json',
   },
  })
  .then((res) => {
   callback(true, res.data);
  })
  .catch((err) => {
   callback(false, err);
  });
};
