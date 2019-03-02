//切换到注册
$('#switchReg').click(function () {
    $('#formReg').removeClass('hide');
    $('#formLogin').addClass('hide');
})

//切换到注册
$('#switchLogin').click(function () {
    $('#formReg').addClass('hide');
    $('#formLogin').removeClass('hide');
})

//点击获取验证码
$('#codeBtn').click(function () {
    clickCodeBtn({
        phoneId: "phoneReg",
        codeBtnId: "codeBtn"
    }, countDown)
})

//注册
$("#register").click(function () {
    goRegister({
        phoneId: "phoneReg",
        codeId: "codeReg",
        pwdId: "pwdReg",
        submitBtnId: "register"
    })
});

//登录
$("#login").click(function () {
    goLogin({
        phoneId: "phone",
        pwdId: "pwd",
        submitBtnId: "login"
    });
})

//封装登录函数  参数是{phoneId:'',pwdId:'',submitBtnId:''} sucCallback=>登录成功回调 failCallback=>登录失败回调
function goLogin(obj, sucCallback, failCallback) {
    if (!obj.phoneId || !obj.pwdId||!obj.submitBtnId) {
        alert('数据有误');
        return false;
    }
    var phone = $.trim($("#" + obj.phoneId).val()),
        pwd = $.trim($("#" + obj.pwdId).val()),
        isValidate = validatePhone({
            "phoneId": obj.phoneId
        });
    if (!isValidate) {
        return false;
    }
    if (!pwd || pwd.length == 0) {
        alert("请输入密码");
        return false;
    }
    if (pwd.length < 6 || pwd.length > 16) {
        alert("请输入6-16位密码");
        return false;
    }
    //发送请求 
    //参数
    var params = {
        phone: phone,
        pwd: pwd
    };
    //此处模拟返回数据
    var res = { "code": 1 };
    $("#" + obj.submitBtnId).attr("disabled", true);
    if (res.code == 1) {
        alert('登录成功');
        if (sucCallback) {
            sucCallback(res);
        }
    } else {
        alert('登录失败');
        if (failCallback) {
            failCallback(res);
        }
    }
    $("#" + obj.submitBtnId).attr("disabled", false);
}

// 封装注册函数  参数是{phoneId:'',pwdId:'',codeId:'',submitBtnId:''}  sucCallback=>注册成功回调 failCallback=>注册失败回调
function goRegister(obj, sucCallback, failCallback) {
    if (!obj.phoneId || !obj.pwdId || !obj.codeId||!obj.submitBtnId) {
        alert('数据有误');
        return false;
    }
    var phone = $.trim($("#" + obj.phoneId).val()),
        pwd = $.trim($("#" + obj.pwdId).val()),
        code = $.trim($("#" + obj.codeId).val()),
        isValidate = validatePhone({
            "phoneId": obj.phoneId
        });
    if (!isValidate) {
        return false;
    }
    if (code.length < 1) {
        alert("请输入手机验证码");
        return false;
    }
    if (code.length != 6) {
        alert("请输入6位数验证码");
        return false;
    }
    if (pwd.length < 1) {
        alert("请输入密码");
        return false;
    }
    if (pwd.length < 6 || pwd.length > 16) {
        alert("请输入6-16位密码");
        return false;
    }
    //请求发送手机验证码接口 
    //参数
    var params = {
        phone: phone,
        pwd: pwd,
        code: code
    };
    //此处是模拟返回数据
    var res = { "code": 1 };
    $("#" + obj.submitBtnId).attr("disabled", true);
    if (res.code == '1') {
        alert('注册成功');
        if (sucCallback) {
            sucCallback();
        }
    } else {
        alert('注册失败');
        if (failCallback) {
            failCallback(res.errorMsg);
        }
    }
    $("#" + obj.submitBtnId).attr("disabled", false);
}

//点击获取验证码倒计时 参数是obj(phoneId codeBtnId) sucCallback=>发送验证码成功回调 failCallback=>发送验证码失败回调
function clickCodeBtn(obj, sucCallback, failCallback) {
    var isValidate = validatePhone({
        "phoneId": obj.phoneId
    }),
        phone = validatePhone({
            "phoneId": obj.phoneId
        });

    if (!isValidate) {
        return false;
    }
    //请求发送验证码接口
    //参数
    var params = {
        phone: phone
    };
    //此处是模拟返回数据
    var res = { "code": 1 };
    if (res.code == '1') {
        if (sucCallback) {
            sucCallback(obj);
        }
    } else {
        alert('发送验证码失败');
        if (failCallback) {
            failCallback();
        }
    }
}

//点击获取验证码倒计时 参数是{codeBtnId:''}
function countDown(obj) {
    var countDown = 60;
    $('#' + obj.codeBtnId).attr('disabled', true).html(countDown + 's');
    var countInterval = setInterval(function () {
        countDown--;
        $('#' + obj.codeBtnId).html(countDown + 's');
        if (countDown == 0) {
            $('#' + obj.codeBtnId).attr('disabled', false).html('重新获取');
            clearInterval(countInterval);
        };
    }, 1000);
}

//验证手机号码是否正确 参数是{phoneId:''} 
function validatePhone(obj) {
    var phone = $.trim($("#" + obj.phoneId).val());
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    if (!phone || phone.length == 0) {
        alert("请输入手机号码");
        return false;
    } else {
        if (!phoneReg.test(phone)) {
            alert("请输入有效的手机号码");
            return false;
        }
    }
    return true;
}

