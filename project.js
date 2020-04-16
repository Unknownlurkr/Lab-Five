/*
Brittany Samuels
200404362
Clipboard API and YOUTUBE PLAY API.
*/

/*browser Api: clipboard api 
chose this since it is simple and uses a more morden async appraoch
*/

//token variable that referneces the html code element which stores the information we would like to copy
//in this case I am pretending it is a 205 ioff discount
const token = document.querySelector("code");

//click eventlistener to check if the clipboard api is availabe in the browser
// it waits for a response.
//when the response is sucessful the user is able to copy the copy the copon code.
//this is by clicking the text within the code element that will triger the eventlistener
token.addEventListener("click", async (event) => {
  if (!navigator.clipboard) {
    return;
  }  
  
  try {
    const text = event.target.innerText;
    await navigator.clipboard.writeText(text);
    
    event.target.dataset.clipboard = text;
    setTimeout(() =>{
      delete event.target.dataset.clipboard;
    }, 1500);    
  } catch (error) {
    console.error("Copy failed", error);
  }
});

//Third-Party API:Youtube play API
//Why not have a bit of relaxing music while you browse?

//Loads the IFRAME API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";//api reference link where the api is downlaoded
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Once the API is downloaded it will create an IFRAME element
//this function onYouTubeIframeAPIReadyis what the API is referencing when called you can then construct a YT.Player object
var player;
function onYouTubeIframeAPIReady() { 
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'ICcFMBzOnYs',//the id at the end of the youtube link so the player identifies the video you want to play
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}//once the player is ready this function is then called
function onPlayerReady(event) {
    event.target.playVideo();
  }//stop playing after 6 seconds depending on the player sate 
  //will stop after 6 seconds
  var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

//XHR req from the 3rd lab to make it easy
//so our products and json desc will be displayed 
var requestUrl = "https://unknownlurkr.github.io/funky-products/strange-products.json";

var req = new XMLHttpRequest();

req.open('GET', requestUrl);

req.responseType = 'json';

req.send();

req.onload = function(){
    var products = req.response;
    console.log(products);
    strangeProducts(products);
};

function strangeProducts(jsonObj){
    let strangeProd = jsonObj.strangeProducts;
    for(let i = 0; i < strangeProd.length; i++){
        let info = document.createElement('article');
        let h2 = document.createElement('h2');
        let img = document.createElement('img');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let section = document.querySelector('section');
        img.setAttribute('src', 'https://unknownlurkr.github.io/funky-products/img/' + strangeProd[i].imageLocation);
        img.setAttribute('alt', strangeProd[i].name);
        h2.textContent = strangeProd[i].name;
        p1.textContent = 'details' + strangeProd[i].details;
        p2.textContent = 'price' + strangeProd[i].price;
        info.appendChild(img);
        info.appendChild(h2);
        info.appendChild(p1);
        info.appendChild(p2);
        section.appendChild(info);

    }
}