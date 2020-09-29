window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    
    //Resizing
    //canvas.height=window.innerHeight;
    //canvas.width=window.innerWidth;

    //Variables

    let painting=false;

    function startPosition(e){
        painting=true;   
        draw(e) ;
    }

    function finishedPosition(){
        painting=false;
        ctx.beginPath();
    }
    
    function draw(e){
        if(!painting) return;
        ctx.lineWidth=2;
        ctx.lineCap="round";

        ctx.strokeStyle="#ffffff"
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX,e.clientY);
    }

    //Event Listener
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',finishedPosition);
    canvas.addEventListener('mousemove',draw);

    
});

function saveImage(){
    let image=canvasToImage();
    //image.src=canvas.toDataURL();
    console.log(image);
    document.getElementById('img').src=image;
    predict();
}


function canvasToImage()
{
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
	var w = canvas.clientWidth;
	var h = canvas.clientHeight;
    var backgroundColor="#000000";
	var data;		

	if(backgroundColor)
	{
		data = ctx.getImageData(0, 0, w, h);		
		var compositeOperation = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "destination-over";
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0,0,w,h);
	}
	var imageData = canvas.toDataURL("image/png");
	if(backgroundColor)
	{
		ctx.clearRect (0,0,w,h);
		ctx.putImageData(data, 0,0);		
		ctx.globalCompositeOperation = compositeOperation;
	}
	return imageData;
}


function clearImage(){
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    let image=document.getElementById('img');
    image.src=canvas.toDataURL();   
}


async function predict() {
    const model = await tf.loadLayersModel('tfjs_mnist_model/model.json');
    //model.summary();
    let image = $("#img").get(0);
    console.log(image);
    let tensorImg = tf.browser.fromPixels(image)
                    .resizeNearestNeighbor([28,28])
                    .mean(2)
                    .expandDims(2)
                    .expandDims()
                    .toFloat()
                    
    //let normalizationOffset = tf.scalar(127.5);
    var normalized = tensorImg.toFloat().sub(tensorImg).div(127.5);
    let prediction = await model.predict(tensorImg).data();
    console.log(prediction.indexOf(Math.max(...prediction)));
    let preds=prediction.indexOf(Math.max(...prediction));   
    console.log(prediction);
}
