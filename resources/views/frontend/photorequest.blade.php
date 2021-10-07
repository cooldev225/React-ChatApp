@section('photorequest')
    <style>
        #container {
            background-color: rgba(0, 0, 0, 0.1);
            border: 1px solid gray;
        }

    </style>
    <script src="https://unpkg.com/konva@8.2.2/konva.min.js"></script>
    <div id="drag-items">
        <img src="/images/emojis1.png" draggable="true" />
        <img src="/images/emojis2.png" draggable="true" />
    </div>
    <div id="container"></div>
    <script>
        var width = 468;
        var height = 400;

        var stage = new Konva.Stage({
            container: 'container',
            width: 468,
            height: 400,
        });
        var layer = new Konva.Layer();
        stage.add(layer);

        // what is url of dragging element?
        var itemURL = '';
        document
            .getElementById('drag-items')
            .addEventListener('dragstart', function(e) {
                itemURL = e.target.src;
            });

        var con = stage.container();
        con.addEventListener('dragover', function(e) {
            e.preventDefault(); // !important
        });

        con.addEventListener('drop', function(e) {
            e.preventDefault();
            // now we need to find pointer position
            // we can't use stage.getPointerPosition() here, because that event
            // is not registered by Konva.Stage
            // we can register it manually:
            stage.setPointersPositions(e);

            Konva.Image.fromURL(itemURL, function(image) {
                layer.add(image);

                image.position(stage.getPointerPosition());
                image.draggable(true);
            });
        });
    </script>
@endsection
