var getRatingImage = (rating) => {
    var ratingImage = '';
    if(rating <= 1.4) {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating1.png');       
        
    } 
    else if(rating>=1.5 && rating<1.9)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating1.5.png');
        
    }
    else if(rating>=1.9 && rating<2.4)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating2.png');
        
    } 
    else if(rating>=2.4 && rating<=2.8)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating2.5.png');
        
    } 
    else if(rating>=2.9 && rating<3.4)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating3.png');        
    }
    else if(rating>=3.4 && rating<=3.8)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating3.5.png');        
    }
    else if(rating>=3.9 && rating<4.4)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating4.png');        
    } 
    else if(rating>=4.4 && rating<=4.8)  {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating4.5.png');        
    }
    else {
        var imgTag = $("<img class='ratingImg'/>").attr('src', 'images/ratingImages/rating5.png');       
    }
    return imgTag;
};

var readMore = () =>{
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }

  let showUserIcon =()=>{
    document.querySelector("#showUserIconDiv").classList.toggle("showUserIconDiv");
  }