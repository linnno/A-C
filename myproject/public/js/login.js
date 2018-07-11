var code1 = '';
window.onload = function () {


    /**
     * 验证码
     * @param {Object} o 验证码长度
     */
    $.fn.code_Obj = function(o) {
        var _this = $(this);

        var options = {
            code_l: o.codeLength,//验证码长度
            codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ],
            codeColors: ['#f44336', '#009688', '#cddc39', '#03a9f4', '#9c27b0', '#5e4444', '#9ebf9f', '#ffc8c4', '#2b4754', '#b4ced9', '#835f53', '#aa677e'],
            code_Init: function() {
                var codeColor = "";
                var code = "";
                var checkCode = _this.find("#data_code");
                for(var i = 0; i < this.code_l; i++) {
                    var charNum = Math.floor(Math.random() * 52);
                    code += this.codeChars[charNum];
                }
                for(var i = 0; i < this.codeColors.length; i++) {
                    var charNum = Math.floor(Math.random() * 12);
                    codeColor = this.codeColors[charNum];
                }
                console.log(code);
                code1 = code;
                if(checkCode) {
                    checkCode.css('color', codeColor);
                    checkCode.className = "code";
                    checkCode.text(code);
                    checkCode.attr('data-value', code);
                }
            }
        };

        options.code_Init();//初始化验证码
        _this.find("#data_code").bind('click', function() {
            options.code_Init();
        });
    };
    /**
     * 验证码
     * codeLength:验证码长度
     */
    $('#check-code').code_Obj({
        codeLength: 4
    });
login();
register();
//点击切换登录
    $('#login-register').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
}


    //登陆

function login() {


    $('#login-btn').click(function () {
        var yanzheng = $('#yanzheng').val();
        if(code1.toLowerCase() == yanzheng.toLowerCase()){
            var param =$('#login-form').serialize();
            $.ajax({
                url:'/login.do',
                type:'post',
                data:param,
                success:function (data) {
                    if(data == '成功'){
                        window.location = './../index.html'
                    }
                    if(data=='输入有误'){
                        $('#yanzhenerr').html('用户名或密码出错').css({'text-align':'right','color':'red','font-size':'12px'});
                    }
                }
            })
        }else{
            $('#yanzhenerr').html('验证码出错').css({'text-align':'right','color':'red','font-size':'12px'});
        }
    })
}
//注册
function register() {
    $('#box').on('click','#btnCode',function () {
        $.ajax({
            url:'/sendSmsByLogin',
            data:'phone='+$('#phone').val(),
            type:'post',
            success:function (data) {
                console.log(data);
            }
        })
        var i = 60;

        var a = setInterval(function () {
            $('#box').html('<span class="yanzhen-time">'+i+'</span>');
            i = i-1;
            if(i==0){
                clearInterval(a);
            }
        },1000);
        setTimeout(function () {
            $('#btnCode').html('获取验证码');
            $('#box').html('<button type="button" class="yanzhen-btn" id = "btnCode">获取验证码</button>')
        },60000)
    })

    $('#register-btn').click(function () {
        if($('#registerpass1').val() == $('#registerpass2').val()){

            var txtcode = $('#txtCode').val();
            var param = $('#register-form').serialize();
            if($('#cbox').is(':checked')){
                $.ajax({
                    url:'/registered.do',
                    type:'post',
                    data:'phone='+$('#phone').val()+'&txtCode='+txtcode,
                    success:function (data) {
                        console.log(data);
                        if(data == '成功'){
                            $.ajax({
                                url:'/register.do',
                                type:'post',
                                data:param,
                                success:function (data) {
                                    if(data == '成功'){
                                        window.location.reload();
                                    }else {
                                        console.log(data);
                                    }
                                }
                            })
                        }else {
                            $('#register-err').html('两次密码输入不同').css({'text-align':'right','color':'red','font-size':'12px'});
                        }
                    }
                })



            }else{
                $('#register-err').html('请阅读并确认会员俱乐部协议').css({'text-align':'right','color':'red','font-size':'12px'})
            }
        }else {
            $('#register-err').html('两次密码输入不同').css({'text-align':'right','color':'red','font-size':'12px'});
        }
    })
}

