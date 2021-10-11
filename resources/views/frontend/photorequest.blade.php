@section('photorequest')
    <style>
        #container {
            background-color: rgba(0, 0, 0, 0.1);
            border: 1px solid gray;
        }
        #back_canvas {
            width: 340px;
            height: 280px;
        }

        .input-file {
            display: none;
        }
        .input-btn {
            width: 50px;
            height: 40px;
            margin: 5px 15px;
            cursor: pointer;
        }

        

    </style>
    <script src="https://unpkg.com/konva@8.2.2/konva.min.js"></script>
    <script src="https://unpkg.com/fabric@latest/dist/fabric.js"></script>
    <div class="btn-group d-flex">
        <input class="input-file" type="file" id="input_file">
        <img class="input-btn" id="input_btn" src="/images/gallery.png"></button>
        <img class="input-btn" id="" src="/images/camera-icon.png"></button>
        <img class="input-btn" id="" src="/images/reset.png"></button>
    </div>
    <div class="d-flex">
        <div id="container">
            <canvas id="back_canvas">

            </canvas>
        </div>
        <div id="image-processing">
            <div class="blur">
                <label for="customRange1">Blur range</label>
                <input type="range" class="custom-range blur-range" id="customRange1">

            </div>
            <div id="drag-items">
                <img src="/images/emojis1.png" draggable="true" />
                <img src="/images/emojis2.png" draggable="true" />
            </div>
        </div>
    </div>
    <script>
        var canvas = new fabric.Canvas('back_canvas');
        fabric.Image.fromURL('/images/background.jpg', function(oImg) {
            let imgWidth = oImg.width;
            let imgHeight = oImg.height;
            let canvasWidth = canvas.getWidth();
            let canvasHeight = canvas.getHeight();

            let imgRatio = imgWidth / imgHeight;
            let canvasRatio = canvasWidth / canvasHeight;
            if(imgRatio <= canvasRatio){
                if(imgHeight> canvasHeight){
                oImg.scaleToHeight(canvasHeight);
                }
            }else{
                if(imgWidth> canvasWidth){
                oImg.scaleToWidth(canvasWidth);
                }
            }

            canvas.clear();
            canvas.add(oImg);
            canvas.centerObject(oImg);
        });
        // canvas.setDimensions({width: '480px', height:'280px'});
        // fabric.Image.fromURL('/images/background.jpg', function(img) {
        //     img.scale(0.5).set({
        //         left: 125,
        //         top: 50,
        //         width:50,
        //         height: 50  
        //     });
        //     canvas.add(img).setActiveObject(img);
        // });
    </script>
@endsection
