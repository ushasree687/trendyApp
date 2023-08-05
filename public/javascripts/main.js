var singleProductTemplate;

var mainPageLoaderFunction = () => {    
    // Load template for one individual product;
    $.ajax({
        url: 'templates/productTemplate.htm',
        method: 'GET',
        data: {},
        success: (response) => {            
            singleProductTemplate = Handlebars.compile(response);  
        }
    });
};
mainPageLoaderFunction();

var loadSelectedPage = (pageType) => {
    var pageTemplateUrl = '';
    switch(pageType){
        case 'login':
            $(".main-header-part").show();
            pageTemplateUrl = 'templates/login.htm'
            break;
        case 'signup':
            $(".main-header-part").show();
            pageTemplateUrl = 'templates/newSignup.htm'
            break;
        case 'frgtPwd':
            pageTemplateUrl = 'templates/forgotPwd.htm'
            break;
        case 'pdetails':
            pageTemplateUrl = 'templates/productDetails.htm'
            break;
        case 'admin':
            pageTemplateUrl = 'templates/admin/addNewProduct.htm'
            break;
    }
    loadPageTemplate(pageTemplateUrl, pageType);
}

var loadPageTemplate = (templateUrl, pageType) => {
    $.ajax({        
        url: templateUrl,
        method: 'GET',
        data: {},
        success: (response) => {         
            $(".welcomePage").html('');   
            $(".pageMainBlock").html('');
            $(".pageMainBlock").append(response);
            if (pageType == 'login') {
                getCaptcha();
                getPassword();
            } else if (pageType == 'pdetails') {
                loadProductDetailsOnPage();
            }
        }
    })
}
// var getId = (event) =>{
// console.log(`id is ${event.target.id}`)
// }
var loadProductDetailsOnPage = () => {
    $.ajax({
        url: '/get/productdetails',
        method: 'GET',
        dataType: 'JSON',
        data: {},
        success: (productDetails) => {
            console.log(productDetails)
            productDetails.forEach(productItem => {                
                $("#productDetailsContainer").append(singleProductTemplate(productItem));
                var id = '#rating_' + productItem.id;
                $(id).append(getRatingImage(productItem.rating.rate));
                
            });
        },
        error: (err) => {
            console.log(err);
        }
    });
}

var loadWelcomePage = () => {
    $.ajax({                
        url: 'templates/welcomePage.htm',
        method: 'GET',
        data: {},
        success: (response) => {  
            $(".main-header-part").hide();            
            $(".welcomePage").append(response);
            document.querySelector(".chatLink").addEventListener("click", (event) => {
                $(".chatContainer").show();
                connectToSocket();
            });
        },
        error : (error) => {
            console.log(error);
        }
    })
};

loadWelcomePage();

var checkUserLogin = () => {
    $.ajax({                
        url: '/check/userlogin',
        method: 'GET',
        dataType: 'JSON',
        data: {},
        success: (response) => {  
            if (response.isUserLoggedin) {
                loadSelectedPage('login');

                //async and await
                setTimeout(() => {
                    loadSelectedPage('pdetails')
                }, 200);
            }
        },
        error : (error) => {
            console.log(error);
        }
    })
};

var logoutSession = () => {
    $.ajax({              
        url: '/user/logout',
        method: 'GET',
        dataType: 'JSON',
        data: {},
        success: (response) => {              
                loadSelectedPage('login');
                $("#userValue").val('');
        },
        error: (error) => {
            console.log(error);
        }
    });
}

checkUserLogin();


var footerLoader = () => {
    $.ajax({                
        url: 'templates/footerTemplate.htm',
        method: 'GET',
        data: {},
        success: (response) => {              
            $(".footer-container").append(response);
        },
        error : (error) => {
            console.log(error);
        }
    })
};
footerLoader();

