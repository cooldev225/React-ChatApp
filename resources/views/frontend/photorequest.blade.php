@section('photorequest')

    {{-- <script src="https://unpkg.com/konva@8.2.2/konva.min.js"></script> --}}
    <script src="/frontend/js/pages/fabric.js"></script>

    <div class="request-container">
        <canvas id="back_canvas" width="350" height="350">

        </canvas>
        <div id="image-processing">
            <ul class="switch-list">
                <li>
                    <input class="js-switch5 emojis-price" type="checkbox" />
                    <h5>Infinite</h5>
                </li>
            </ul>
            <select class="form-select-sm emojis-price" aria-label="Default select example">
                <option value="0" selected>$0</option>
                <option value="1">$1</option>
                <option value="2">$2</option>
                <option value="3">$5</option>
            </select>
            <div class="emojis">
                <img src="/images/emojis/emojis1.png" draggable="true" />
                <img src="/images/emojis/emojis2.png" draggable="true" />
                <img src="/images/emojis/emojis1.png" draggable="true" />
                <img src="/images/emojis/emojis2.png" draggable="true" />
                <img src="/images/emojis/emojis1.png" draggable="true" />
                <img src="/images/emojis/emojis2.png" draggable="true" />
                <img src="/images/emojis/emojis1.png" draggable="true" />
                <img src="/images/emojis/emojis2.png" draggable="true" />
                <img src="/images/emojis/emojis1.png" draggable="true" />
                <img src="/images/emojis/emojis2.png" draggable="true" />
            </div>
            <div class="blur">
                <img src="/images/blur.png" alt="Blur">
                <input type="range" orient="vertical" class="custom-range blur-range" step="0.1" value="0" min="0" max="1">
            </div>
            <button class="submit icon-btn btn-primary" data-bs-dismiss="modal" id="send-photo">
                <i data-feather="send"></i>
            </button>
        </div>
    </div>
@endsection
