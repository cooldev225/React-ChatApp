@section('photorequest')

    <script src="https://unpkg.com/konva@8.2.2/konva.min.js"></script>
    <script src="https://unpkg.com/fabric@latest/dist/fabric.js"></script>

    <div class="request-container">
        <canvas id="back_canvas" width="350" height="350">

        </canvas>
        <div id="image-processing">
            <div class="emojis">
                <img src="/images/emojis1.png" draggable="true" />
                <img src="/images/emojis2.png" draggable="true" />
                <img src="/images/emojis1.png" draggable="true" />
                <img src="/images/emojis2.png" draggable="true" />
                <img src="/images/emojis1.png" draggable="true" />
                <img src="/images/emojis2.png" draggable="true" />
                <img src="/images/emojis1.png" draggable="true" />
                <img src="/images/emojis2.png" draggable="true" />
                <img src="/images/emojis1.png" draggable="true" />
                <img src="/images/emojis2.png" draggable="true" />
            </div>
            <div class="blur">
                <img src="/images/blur.png" alt="Blur">
                <input type="range" orient="vertical" class="custom-range blur-range" step="0.1" value="0" min="0" max="0.5">
            </div>
            <button class="submit icon-btn btn-primary" data-bs-dismiss="modal" id="send-photo">
                <i data-feather="send"></i>
            </button>
        </div>
    </div>
@endsection
