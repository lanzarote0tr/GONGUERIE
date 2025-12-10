import mysql from 'mysql2/promise';

const db_info = {
  host:process.env.DB_HOST,
  post:process.env.DB_POST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
}

const mysqlClient = {
  init:function() {
    return mysql.createConnection(db_info);
  },
  connect:function(conn) {
    conn.connect(function(err) {
      if(err) console.error("mysql connection error: " + err);
      else console.log("mysql is connected successfully");
    });
  },
};

export default mysqlClient;
