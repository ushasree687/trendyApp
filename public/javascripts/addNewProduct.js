var productDetails = {};
var addNewProductDetails = () => {
    productDetails.id = $("#pid").val();
    productDetails.title = $("#ptitle").val();
    productDetails.price = $("#pprice").val();
    productDetails.description = $("#pdesc").val(); 
    productDetails.category = $("#pcategory").val();
    productDetails.rating = $("#prating").val();

    $.ajax({
        url: '/add/newProductDetails',
        method: 'POST',
        data: productDetails,
        dataType: 'JSON',
        success: (data) => {
            console.log("Success");
            $("#pdetailsSuccmsg").text("Details got added successfly");
        },
        error: (error) => {
            $("#pdetailsSuccmsg").text("Error while addedproduct details");
        }
    });
}

var uploadResource = () => {    
    let uploadfile = $("input[name=prodImage]")[0].files[0] // file from input
    let formData = new FormData();
    formData.append("prodImage", uploadfile);
    $.ajax({
        url: '/resource/fileUpload',
        method: 'POST',
        dataType: 'JSON',
        data: formData,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        success: (response) => {
            productDetails.image = response.file_path;
        },
        error: (error) => {
            console.log(error);
        }
    })
}