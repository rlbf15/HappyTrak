const { Pool } = require('pg');

const PG_URI =
  'postgres://xfhjvaaf:kaHfdj5HE54NhHzx8WIV6fv59Zp8_E8V@raja.db.elephantsql.com/xfhjvaaf';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};


// create employee table command

