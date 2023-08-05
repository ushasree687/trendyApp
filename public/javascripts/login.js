var validateCapchaText = () => {
    var value = $(".userCapchaText").val();
    // console.log(value);
    if (value.length) {
        $("#loginBtn").removeAttr('disabled');
        $('#loginBtn').removeClass("disableBtn");
    } else {
        $("#loginBtn").attr('disabled', true);
        $('#loginBtn').addClass("disableBtn");
    }
}

/*generate captcha code */
var getCaptcha = ()=>{
    $("#loginBtn").attr('disabled', true);
    $(".userCapchaText").val('');
    var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     var captcha = '';
     for(var i=0;i<5;i++){
         captcha = captcha + a.charAt(Math.random() * a.length);
     }
    document.querySelector(".captchBox").innerHTML = captcha;
 }
 /*generate captcha code */

var loggedInUser = '';
 var validateUserDetails = () => {
    var uData = {};
    uData.accountId = $("#uid").val();
    loggedInUser = uData.accountId;
    uData.password =  $("#accountPwd").val();
    console.log(uData);
    console.log(uData.accountId)
    $('#userValue').html(uData.accountId);
    document.querySelector("#userValue").innerHTML = uData.accountId;
    // var a = validateCaptcha();
    // console.log(typeof(a))
    if(validateCaptcha() == true) {    
        $.ajax({
            url: '/validate/userCredentials',
            method: 'POST',
            data: uData,
            dataType: 'JSON',
            success: (response) => {
                if (response.msg == 'Valid') {
                    remeberPassword();
                    if (response.userType == 'admin') {
                        loadSelectedPage('admin');
                    } else {
                        loadSelectedPage('pdetails');
                    }
                } else {
                    $(".invalidCredential").css({'visibility': 'visible'});
                    $("#errorMsg").html('Invalid Credentials');
                }
            },
            error: (error) => {
                console.log(error);
            }
        });
        /*var apiObj = {
            mode: 'no-cors',
            method: 'POST',
            body: JSON.stringify(uData)
        }
        fetch('/validate/userCredentials', apiObj)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }); */
    }
 } 

 /*Checking user enter id or password or not and also checking for correct captcha */
 let validateCaptcha=()=>{   
    let captchText = $("#captchInputBox").val();
    let originalCaptch = $(".captchBox").text();
    let username = $("#uid").val();
    let pwd = $("#accountPwd").val();    

    if(username=="" || pwd==""){
        $("#errorMsg").html('* Fields are mandatory');
        $(".invalidCredential").css({'visibility': 'visible'});
        return false;
    }
    else if(captchText!=originalCaptch){
        $("#errorMsg").html('Captcha is not correct');
        $(".invalidCredential").css({'visibility': 'visible'});
        return false;
    }
    else if((username!="" && pwd!="")&& (captchText==originalCaptch)){
        $("#errorMsg").html('');
        $(".invalidCredential").css({'visibility': 'hidden'});
        return true;
    }
 }

 /*code to remember the password while login */
//  window.addEventListener("DOMContentLoaded", () => {
//     document.querySelector("#loginBtn").addEventListener("click",remeberPassword);
//     });

    var getPassword = ()=>{
    if(sessionStorage.getItem("userData")!=null){
        if (sessionStorage.getItem("userData").mailId != null && sessionStorage.getItem("userData").password != null) {
            console.log(sessionStorage.getItem("userData").length)
            var userData = JSON.parse(sessionStorage.getItem("userData"));
            document.querySelector("#uid").value = userData.mailId;
            document.querySelector("#accountPwd").value = userData.password;
            //making checkbox selected by default
            document.querySelector("#userDecision").checked = true;
        }
     }
    }

 
var remeberPassword = () => {
    var userData = {};
    userData.mailId = document.querySelector("#uid").value;
    userData.password = document.querySelector("#accountPwd").value;

    if(document.querySelector("#userDecision:checked")) {
        sessionStorage.setItem("userData", JSON.stringify(userData)); 
    } else {
        sessionStorage.removeItem("userData"); 
    }
}



