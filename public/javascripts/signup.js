var registerNewUser = () => {
    var userData = {};
    userData.accountId = $("#uId").val();
    userData.password = $("#upassword").val();
    userData.mailId = $("#umailId").val();
    $.ajax({
        url: '/add/newUser/details',
        method: 'POST',
        data: userData,
        dataType: 'JSON',
        success: (response) => {
            console.log("Successfly inserte")
            $("#rblock").text("Successfly got registerd");
            clearFields();
        },
        error: (err) => {
            $("#rblock").text("Error while registering")
        }
    })
}


/*toggle password logic on eye icon */
const togglePWD =(passwordfield, iconField)=>{
    //console.log(`#${iconField.getAttribute("id")}`)  
    //console.log(passwordfield.getAttribute("id"))  
    const togglePassword = document.querySelector(`#${iconField.getAttribute("id")}`);
    const password = document.querySelector(`#${passwordfield.getAttribute("id")}`);
    
    const type = password.getAttribute('type');
    if(type == 'password'){
        togglePassword.classList.remove('fa-eye-slash');
        togglePassword.classList.add('fa-eye');
        password.setAttribute('type', 'text');
    }
    else{
        togglePassword.classList.add('fa-eye-slash');
        togglePassword.classList.remove('fa-eye');
        password.setAttribute('type', 'password');
    }        
};
/*toggle password logic end on eye icon */



var checkPasswordInput = (event) =>{
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var pwd = event.target.value;
    if(strongRegex.test(pwd)){
        return true;
    }
    else
    return false;
}

let checkUserIdField = ()=>{
    let uId = $("#uId");
    let reg= /^[A-Za-z][A-Za-z0-9_]{6,29}$/;
    if(uId.val().trim()==""){
        $("#uId").addClass("alertBorder");
        $(".userNameMsg").css("display", "block");
        return false;
    }
    else if(!reg.test(uId.val())){        
        $("#uId").addClass("alertBorder");
        $(".userNameMsg").css("display", "block");
        $(".userNameMsg").text("User name must start with alphabets. Minimum 7 characters required")
        return false;
    }
    else{
        $("#uId").removeClass("alertBorder");
        $(".userNameMsg").css("display", "none");
        return true;
    }
}

/*Method to check password inside input control onmouseout event*/
let checkPasswordField = ()=>{
    let pwd = $("#upassword");
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");    
    
    if(pwd.val().trim()==""){
        pwd.addClass("alertBorder");
        $(".passwordMsg").text("Password is required")
        $(".passwordMsg").css("display", "block");
        return false;
    }
    else if(!strongRegex.test(pwd.val())){
        pwd.addClass("alertBorder");
        $(".passwordMsg").text("Password length Should Be minimum 8 characters. Neeed combination of uppercase lowercase, numbers and special characters.")
        $(".passwordMsg").css("display", "block");      
        return false;
    }
    else{
        pwd.removeClass("alertBorder");
        $(".passwordMsg").css("display", "none");
        return true;
    }
}

/*Method to check confirm password inside input control onmouseout event*/
let checkConfirmPassword = ()=>{    
    let confirmPwd = $("#confirmPWD");    
    let pwd = $("#upassword");   

    if(confirmPwd.val().trim()==""){        
        $(".confirmPasswordMsg").text("Confirm Password is required")
        $(".confirmPasswordMsg").css("display", "block");
        confirmPwd.addClass("alertBorder");
        return false;
    }
    else if(confirmPwd.val().trim()!==pwd.val().trim()){
        console.log(pwd.val().trim());
        console.log(confirmPwd.val().trim());
        $(".confirmPasswordMsg").text("Confirm Password should match with Actual password")
        $(".confirmPasswordMsg").css("display", "block");        
        confirmPwd.addClass("alertBorder");      
        return false;
    }
    else{
        confirmPwd.removeClass("alertBorder");
        $(".confirmPasswordMsg").css("display", "none");
        return true;
    }
}

let validateMailId = () =>{
    const mailIdRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = $("#umailId");
    if(email.val().trim()==""){
        $(".mailMsg").text("Mail Id is required")
        $(".mailMsg").css("display", "block");        
        email.addClass("alertBorder");
        return false;
    }
    else if(!mailIdRegx.test(email.val())){
        $(".mailMsg").text("Enter Valid Mail Id")
        $(".mailMsg").css("display", "block");        
        email.addClass("alertBorder");
        return false;
    }
    else{
        email.removeClass("alertBorder");
        $(".mailMsg").css("display", "none");
        return true;
    }
}

/*enable register button */
let validateInputFields = ()=>{ 
    if($("#checkboxId").is(":checked"))
    {
        $('#singUpBtn').prop('disabled', false);
        $('#singUpBtn').removeClass("disableBtn");
    } 
    else
    {
        $('#singUpBtn').prop('disabled', true);
        $('#singUpBtn').addClass("disableBtn");
    }   
}

var clearFields =()=>{
    $('#singUpBtn').prop('disabled', true);
    $("#checkboxId").prop("checked", false);
    $("#confirmPWD").val('');    
    $("#upassword").val('');
    $("#uId").val('');
    $("#umailId").val('');
}