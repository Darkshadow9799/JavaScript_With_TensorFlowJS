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
    let image=document.getElementById('img');
    image.src=canvas.toDataURL();
    
}