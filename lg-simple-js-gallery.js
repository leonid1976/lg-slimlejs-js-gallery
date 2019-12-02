
var thumbnails;
var bodyElement = document.body;  
var thumbLength;
var pointerItems;
var galleryPointer;
var fullPicture;
var overlayElement;
var crossElement;
var arrowLeft;
var arrowRight;
var index; 
var outer;

function startMyGallery(thumbName) {
  thumbnails = Array.prototype.slice.call(document.querySelectorAll(thumbName));

  thumbLength = thumbnails.length;
  

    for (var i = 0; i < thumbLength; i++) {
      thumbnails[i].addEventListener('click', clickOnThumbnail);
    }
}

function clickOnThumbnail(event) { 

    createFullGallery();
      
    pointerItems = Array.prototype.slice.call(document.querySelectorAll('.pointer__item '));
    
    galleryPointer = document.querySelector(".gallery__pointer");   
    fullPicture = document.querySelector('.gallery__full_picture');
    overlayElement = document.getElementById('gallery-overlay');   
    crossElement = document.querySelector(".cross");
    arrowLeft = document.querySelector(".gallery__arrow-left");
    arrowRight = document.querySelector(".gallery__arrow-right");
  
    index = Number(this.dataset.index) - 1;
    fullPicture.style.backgroundImage = "url('" +  thumbnails[index].dataset.fullUrl; 
    overlayElement.style.display = "block";
    crossElement.style.display = "block";
    arrowLeft.style.display = "block";  
    arrowRight.style.display = "block";      
    overlayElement.addEventListener("click", handleOverlay);
    crossElement.addEventListener("click", handleOverlay);
    crossElement.classList.remove("clossed"); 
    arrowLeft.addEventListener("click", handleArrowLeft);
    arrowRight.addEventListener("click", handleArrowRight);
    bodyElement.classList.add("stop-scrolling");
    galleryPointer.style.display = "flex";
    pointerItems[index].classList.add("current");
  
    for (var i = 0; i < thumbLength; i++) {
      pointerItems[i].addEventListener('click', clickOnPointer);
  }  
}

function clickOffThumbnail(event) {
    overlayElement.removeEventListener("click", handleOverlay);
    crossElement.removeEventListener("click", handleOverlay); 
    crossElement.classList.add("clossed");
    setTimeout(function(){
      crossElement.style.display = "none"; 
      fullPicture.src = ""; 
      arrowLeft.style.display = "none";  
      arrowRight.style.display = "none";  
      overlayElement.style.display = "none";     
      bodyElement.classList.remove("stop-scrolling");
      arrowLeft.removeEventListener("click", handleArrowLeft);
      arrowRight.removeEventListener("click", handleArrowRight);
      galleryPointer.style.display = "none";        
      pointerItems[index].classList.remove("current");
      bodyElement.removeChild(outer);        
    },600);        
  }
  
function createFullGallery() {

  var fragment = document.createDocumentFragment();

  outer = document.createElement("div");
  outer.classList.add("gallery__wrap__full");

  var galleryOverlay = document.createElement("div");
  galleryOverlay.id = "gallery-overlay";

  outer.appendChild(galleryOverlay);

  var galleryWrap = document.createElement("div");
  galleryWrap.classList.add("gallery__full_wrap");

  var galleryButton = document.createElement("button");
  galleryButton.classList.add("cross");
  galleryButton.classList.add("gallery__full_cross");
  galleryButton.classList.add("cross__htx");
  galleryButton.innerHTML = "<span></span>";

  galleryWrap.appendChild(galleryButton);

  var galleryInner = document.createElement("div");
  galleryInner.classList.add("gallery__wrap_inner");
  galleryInner.innerHTML = '<div class="gallery__arrow gallery__arrow-left"></div><div class="gallery__full_picture"></div><div class="gallery__arrow gallery__arrow-right"></div>';

  var galleryUl = document.createElement("ul");
  galleryUl.classList.add("gallery__pointer");

  for (var i = 1; i <= thumbLength; i++) {
    var galleryLi = document.createElement("li");
    galleryLi.classList.add("pointer__item");
    galleryLi.dataset.index = i;
    galleryUl.appendChild(galleryLi);
  }


  galleryInner.appendChild(galleryUl);
  galleryWrap.appendChild(galleryInner);


  outer.appendChild(galleryWrap);
  fragment.appendChild(outer); 
  bodyElement.appendChild(fragment);
}
  
function clickOnPointer(event) {
      pointerItems[index].classList.remove("current");         
      index = +this.dataset.index - 1;
      pointerItems[index].classList.add("current");        
      slideShow(index);
}    
    

function handleOverlay() {
    clickOffThumbnail(); 
}


function handleArrowLeft() {
  pointerItems[index].classList.remove("current");        
  index--;    
  if(index < 0) index = 0;  
  pointerItems[index].classList.add("current");        
  slideShow(index);
}   


function handleArrowRight() {
  pointerItems[index].classList.remove("current");         
  index++;    
  if(index >= thumbLength) index--;
  pointerItems[index].classList.add("current");        
  slideShow(index);      
}   


function slideShow(index) {
  fullPicture.classList.add("fadeOut");
  setTimeout(function() {
    fullPicture.style.backgroundImage = "url('" +  thumbnails[index].dataset.fullUrl; 
    fullPicture.classList.remove("fadeOut");                
    },1000);
}

  
 // document.addEventListener('DOMContentLoaded', function() {   });



    


   
    


    

  
    

    
    
    

    
    
