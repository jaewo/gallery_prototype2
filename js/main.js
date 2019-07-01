window.addEventListener("load", function(){
	var count=0;
	var n=0;
	var id=0;
	var pos=0;
	var gallery=document.querySelector(".viewer");
	gallery.style.left="0px";
	var button=document.querySelector(".btn_group");
	var buttonList=null;
	var requestURL="../data/gallery.json";
	var request=new XMLHttpRequest();
	var appendHtml="";

	function init(){
		setTimeout(function(){
			request.open("GET", requestURL, true);
			request.responseType="json";
			request.send();
			request.addEventListener("load", function(){
				var data=request.response;
				// console.log(data);

				for(key in data){
					// console.log(key+" : "+data[key]);
					// <img class="image1" src="images/slide1.jpg">
					var img=document.createElement("img");
					img.setAttribute("class", key);
					img.setAttribute("src", data[key]);
					gallery.appendChild(img);

					// <li id="btn0"><a href="images/slide1.jpg">1</a></li>
					appendHtml+='<li id="btn'+count+'"><a href="'+data[key]+'">'+(count+1)+'</a></li>'+'\n';
					count++;
				}
				// console.log("appendHtml : "+appendHtml);
				button.innerHTML=appendHtml;
				buttonList=document.querySelectorAll(".btn_group li");

				for(var i=0; i<buttonList.length; i++){
					if(i == n){
						buttonList[i].children[0].classList.add("act");
					}

					buttonList[i].children[0].index=i;

					buttonList[i].children[0].addEventListener("click", function(e){
						e.preventDefault();
						// console.log("index : "+e.currentTarget.index);

						for(var j=0; j<buttonList.length; j++){
							if(e.currentTarget.index == j){
								buttonList[j].children[0].classList.add("act");
							}
							else{
								buttonList[j].children[0].classList.remove("act");
							}
						}

						n=e.currentTarget.index;
						pos=n*(-600)+"px";
						gallery.style.left=pos;
					});
					buttonList[i].children[0].addEventListener("mouseenter", function(){
						clearInterval(id);
					});
					buttonList[i].children[0].addEventListener("mouseleave", function(){
						id=setInterval(slideInterval, 6000);
					});
				}

				id=setInterval(slideInterval, 6000);
			});
		}, 10);
	}
	init();

	function slideInterval(){
		// n=(n+1)%4;
		if(n < 3){
			n=n+1;
		}else{
			n=0;
		}

		for(var i=0; i<buttonList.length; i++){
			if(i == n){
				buttonList[i].children[0].classList.add("act");
			}
			else{
				buttonList[i].children[0].classList.remove("act");
			}
		}

		pos=n*(-600)+"px";
		gallery.style.left=pos;
	}
});