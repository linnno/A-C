const db = require('./sqlConfig.js');
let mydb = {
    login:function (user,pass,callback) {
        let sql = 'select * from user where (phone=? or userName = ?) and password=?';
        db.connect(sql,[user,user,pass],callback);
    },
    register:function (user,password,phone,callback) {
        var date = new Date;
        let sql = 'insert into user(userID,phone,userName,password,addDate,isdelete,administrator) values(null,?,?,?,?,0,0)';
        db.connect(sql,[phone,user,password,date],callback);
    }

}
module.exports = mydb;