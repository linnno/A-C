const mysql = require('mysql');
let db = {
    connect:function (sql,arr,callback) {
        let conn = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'project',
            port:3306
        });
        conn.connect();
        conn.query(sql,arr,callback);
        conn.end();
    }
}
module.exports = db;