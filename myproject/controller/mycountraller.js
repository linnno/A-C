const sqlconfig = require('./../modoule/sqlmodule');
const AV = require('leanengine');
AV.initialize("eC0LQiKebF6yMYonUc27hYku-gzGzoHsz","UDouRuKDzVx53KrnjIkI2nFD");
var userFun = {
    login:function (req,res) {
        var user = req.body.loginname;
        var pass = req.body.loginpass;
        sqlconfig.login(user,pass,function (err,data) {
            if(!err){
                if(data.length>0){
                    req.session.user = data[0];
                    console.log(data);
                    res.send('成功');
                }else{
                    res.send('输入有误');
                }
            }else {
                console.log(err);
                res.send('失败');
            }
            })
    },
    sendSmsByreqister :function (req,res) {
        var phone = req.body.phone;
        console.log(phone);
        AV.Cloud.requestSmsCode({
            mobilePhoneNumber: phone,
            name: 'A&C冒险中国',
            op: '注册验证',
            ttl: 1}).
        then(function(data){
            console.log(data);
            res.send('发送成功');
        }, function(err){
            console.log(err);
            res.send('发送失败');
        });
    },
    registered:function (req,res) {
        var phone = req.body.phone;
        var code = req.body.txtCode;
        console.log(code);
        console.log(phone);
        //判断验证码是否正确
        AV.Cloud.verifySmsCode(code,phone).then((data)=>{
            console.log(data);
        console.log("验证码验证成功");
        res.send('成功');
    },(err)=>{
            console.log(err);
            res.send('失败');
        })
    },
    register:function (req,res) {
        var user = req.body.registername;
        var password = req.body.registerpass;
        var phone = req.body.phone;
        sqlconfig.register(user,password,phone,function (err,data) {
            if(!err){
                console.log(data);
                res.send('成功');
            }else {
                console.log(err);
                res.send('失败');
            }
        })
    }
    }
    module.exports = userFun;
