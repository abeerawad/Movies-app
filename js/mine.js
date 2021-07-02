
let navContainerWidth= $('.navContainer').outerWidth();
let navBarLeft = $('#navBar').css('left');
let httpReq = new XMLHttpRequest();
let AllLinks = document.querySelectorAll("#alink");
let category = "now_playing";
let nameRegex= /^[a-zA-z0-9]+(?:[ _-][a-zA-Z0-9]+)$/
let phoneRegex=/^(002)?(01)(1|2|0|5)[0-9]{8}$/;
let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
let passRegex= /^[a-zA-z0-9]{8,}$/ 

$("#myBtn").click(function(){
  let uNameValue = document.getElementById("userName").value;
  let uEmailValue = document.getElementById("userEmail").value;
  let uPhoneValue = document.getElementById("userPhone").value;
  let uAgeValue = document.getElementById("userAge").value;
  let uPasswordValue = document.getElementById("userPassword").value;
  let uRePasswordValue = document.getElementById("userRePassword").value;

  if(uNameValue ==""||uEmailValue ==""||uPhoneValue ==""||
    uAgeValue ==""||uPasswordValue ==""||uRePasswordValue ==""){
    alert("Please fill data");
  }else if (!phoneRegex.test(uPhoneValue)){
    alert("Please Correct Your Phone")
  }else if (!emailRegex.test(uEmailValue)){
    alert("Please Correct Your email")
  }else if(!nameRegex.test(uNameValue)){
    alert("Please Correct Your Name")
  }else if (!passRegex.test(uPasswordValue)) {
    alert("Please Correct Your Password")
  }else if(uPasswordValue !== uRePasswordValue){
    alert("Password dosen't Match,Please Correct Your Password")
  }
});


myAjax(category)
  for(var i=0;i<AllLinks.length ;i++){
      AllLinks[i].addEventListener("click",function(e){
        category = e.target.className    
        myAjax(category);
  })
}

function myAjax(category){
  var Movies ="https://api.themoviedb.org/3/movie/"+category+"?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2MqkcdXsdIul6uRGcVNvFIvRAqEVczmIj602ZYMEvQLzqG0s4GcSraKcI"
  httpReq.open("GET",Movies) 
  httpReq.send(); 
  httpReq.onreadystatechange = function(){
    if(httpReq.status ==200 && httpReq.readyState ==4){
      var allData = JSON.parse(httpReq.response).results  ;
      displayData(allData)
      }
  }

  document.getElementById("search").addEventListener("keyup",function(){
    let searchValue =document.getElementById("search").value;
    var Movies = `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2MqkcdXsdIul6uRGcVNvFIvRAqEVczmIj602ZYMEvQLzqG0s4GcSraKcI&query=${searchValue}`
      httpReq.open("GET",Movies) 
      httpReq.send(); 
      httpReq.onreadystatechange = function(){
        if(httpReq.status ==200 && httpReq.readyState ==4){
          var allData = JSON.parse(httpReq.response).results  ;
          displayData(allData)
          }
      }
  })
}

function displayData(allData){
  temp = "";
  for(var i =0 ;i<allData.length ; i++)
  {

    temp+= ` <div class="col-md-4 mb-5">
    <div class="item">
      <div class="item-overlay py-5">
        <h4>${allData[i].title}</h4>
        <p>${allData[i].overview}</p>
        <p>${allData[i].vote_average}</p>
        <p>${allData[i].release_date}</p>
      </div>
      <img src="`+`https://image.tmdb.org/t/p/w500`+allData[i].poster_path+`" class="img-fluid">
    </div>
    </div>`
}
document.getElementById("rowData").innerHTML = temp;
}

$('#navBar').css({left:`-=${navContainerWidth}`},500)

$(".tab-bar").click(function(){
  $(".tab-bar").toggleClass("active");
  if($(this).hasClass("active")){
    $('#navBar').animate({left:'0px'},500)
    $('#navBar li:nth-child(2) a').delay(300)
    $('#navBar li:nth-child(3) a').delay(600)
    $('#navBar li:nth-child(4) a').delay(900)
    $('#navBar li:nth-child(5) a').delay(1200)
    $('#navBar li:nth-child(6) a').delay(1500)
    $('#navBar a').animate({opacity:"1",top:"-30px"},1000)
  }else{
    $('#navBar').animate({left:`-=${navContainerWidth}`},500)
    $('#navBar a').animate({opacity:"0",top:"50px"},1000)
  }
})
