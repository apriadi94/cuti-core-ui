import axios from "axios";

export const API = (method, url, data = null, Token) => {
  return new Promise((resolve, reject) => {
    if(method === 'get'){
      axios({
        method : method,
        url : `${process.env.REACT_APP_BASE_URL}/${url}`,
        params : data,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      }).then(res => {
          resolve(res)
      }).catch(err => {
          reject(err)
      });
    }else{
      axios({
        method : method,
        url : `${process.env.REACT_APP_BASE_URL}/${url}`,
        data : data,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      }).then(res => {
          resolve(res)
      }).catch(err => {
          reject(err)
      });
    }
  })
}
