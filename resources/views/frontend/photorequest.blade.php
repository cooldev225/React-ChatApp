@section('photorequest')

    {{-- <script src="https://unpkg.com/konva@8.2.2/konva.min.js"></script> --}}
    <script src="/frontend/js/pages/fabric.js"></script>

    <div class="request-container">
        <canvas id="back_canvas" width="350" height="350">

        </canvas>
        <div id="image-processing">
            <ul class="switch-list">
                <li>
                    <input class="infinite-switch" type="checkbox" />
                    <h5>Infinite</h5>
                </li>
            </ul>
            <select class="form-select-sm emojis-price d-none" aria-label="Default select example">
                <option value="-1" selected>Infinite</option>
                <option value="0" selected>Free</option>
                <option value="1">$1</option>
                <option value="2">$2</option>
                <option value="3">$5</option>
            </select>
            <div class="emojis">
                <img src="/images/emojis/1 (1).png" draggable="true" />
                <img src="/images/emojis/1 (2).png" draggable="true" />
                <img src="/images/emojis/1 (3).png" draggable="true" />
                <img src="/images/emojis/1 (4).png" draggable="true" />
                <img src="/images/emojis/1 (5).png" draggable="true" />
                <img src="/images/emojis/1 (6).png" draggable="true" />
                <img src="/images/emojis/1 (7).png" draggable="true" />
                <img src="/images/emojis/1 (8).png" draggable="true" />
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
