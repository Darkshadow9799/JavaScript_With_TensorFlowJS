async function predict() {
    const model = await tf.loadLayersModel('tfjs_models/model.json');
    //model.summary();
    let image = $("#pred_img").get(0);
    let tensorImg = tf.browser.fromPixels(image,3)
                    .resizeNearestNeighbor([224,224])
                    .toFloat()
                    .expandDims()
                    .reverse(-1);

    let normalizationOffset = tf.scalar(127.5);
    var normalized = tensorImg.toFloat().sub(normalizationOffset).div(normalizationOffset);
    let prediction = await model.predict(normalized).data();
    console.log(Math.max(...prediction));   
    document.getElementById('result').innerHTML='Results: ['+prediction+']';
}


function changeImage(){
    var imageDisplay=document.getElementById('pred_img');
    var selectImage=document.getElementById('select-img').files[0];
    imageDisplay.src=URL.createObjectURL(selectImage);
    predict();
}

/* 
if preds==0:
    preds="The leaf is diseased cotton leaf"
elif preds==1:
    preds="The leaf is diseased cotton plant"
elif preds==2:
    preds="The leaf is fresh cotton leaf"
else:
    preds="The leaf is fresh cotton plant"
*/
