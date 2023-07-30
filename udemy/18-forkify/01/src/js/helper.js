import { TIMEOUT_SEC } from '../js/config'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function(url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        // const response = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bce32?key=5b66d08e-6215-4435-972b-ae69787571ca'); // ../item'sID?key=MyId
      
      if(!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    } catch(err) {
        throw err;
    }
}