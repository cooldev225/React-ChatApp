@section('photoCreation')

    {{-- <script src="https://unpkg.com/konva@8.2.2/konva.min.js"></script> --}}
    {{-- <script src="/frontend/js/pages/fabric.js"></script> --}}

    <div class="photo-container">
        <div class="text-tool">
            <input type="text" class="text form-control" placeholder="">
            <select class="form-select form-select-sm font-family" id="font-family" aria-label=".form-select-sm example">
                
            </select>
            <div class="font-style">
                <span class="bold">B</span>
                <span class="italic">I</span>
                <span class="underline">U</span>
            </div>
            <button type="button" class="btn btn-primary btn-sm">Add</button>
        </div>
        <canvas id="back_canvas">
        </canvas>
        <div class="blur-tool">
            <img src="/images/blur.png" alt="">
            <input type="range" class="form-range" id="blurRange" min="0" max="1.5" step="0.1" value="0">
        </div>
    </div>
    <div class="tool-box">
        <div class="extra-tool">
            <div class="emojis-tool">
                <ul class="switch-list">
                    <li>
                        <input class="sticky-switch" type="checkbox" />
                        <h5>Sticky</h5>
                    </li>
                </ul>
                <select class="form-select form-select-sm emojis-price d-none" aria-label="Default select example">
                    <option value="-1" selected>Sticky</option>
                    <option value="0" selected>Free</option>
                    <option value="1">$1</option>
                    <option value="2">$2</option>
                    <option value="5">$5</option>
                    <option value="10">$10</option>
                    <option value="15">$15</option>
                    <option value="20">$20</option>
                    <option value="25">$25</option>
                </select>
                <div class="emojis">
                    <img src="/images/emojis/1 (1).svg" draggable="true" />
                    <img src="/images/emojis/1 (2).svg" draggable="true" />
                    <img src="/images/emojis/1 (3).svg" draggable="true" />
                    <img src="/images/emojis/1 (4).svg" draggable="true" />
                    <img src="/images/emojis/1 (5).svg" draggable="true" />
                    <img src="/images/emojis/1 (6).svg" draggable="true" />
                    <img src="/images/emojis/1 (1).png" draggable="true" />
                    <img src="/images/emojis/1 (2).png" draggable="true" />
                    <img src="/images/emojis/1 (3).png" draggable="true" />
                    <img src="/images/emojis/1 (4).png" draggable="true" />
                    <img src="/images/emojis/1 (5).png" draggable="true" />
                    <img src="/images/emojis/1 (6).png" draggable="true" />
                    <img src="/images/emojis/1 (7).png" draggable="true" />
                    <img src="/images/emojis/1 (9).png" draggable="true" />
                    <img src="/images/emojis/1 (10).png" draggable="true" />
                    <img src="/images/emojis/1 (11).png" draggable="true" />
                    <img src="/images/emojis/1 (12).png" draggable="true" />
                    <img src="/images/emojis/1 (13).png" draggable="true" />
                    <img src="/images/emojis/1 (14).png" draggable="true" />
                    <img src="/images/emojis/1 (15).png" draggable="true" />
                    <img src="/images/emojis/1 (16).png" draggable="true" />
                    <img src="/images/emojis/1 (17).png" draggable="true" />
                    <img src="/images/emojis/1 (18).png" draggable="true" />
                    <img src="/images/emojis/1 (19).png" draggable="true" />
                    <img src="/images/emojis/1 (20).png" draggable="true" />
                    <img src="/images/emojis/1 (31).png" draggable="true" />
                    <img src="/images/emojis/1 (32).png" draggable="true" />
                    <img src="/images/emojis/1 (33).png" draggable="true" />
                    <img src="/images/emojis/1 (34).png" draggable="true" />
                    <img src="/images/emojis/1 (35).png" draggable="true" />
                    <img src="/images/emojis/1 (36).png" draggable="true" />
                    <img src="/images/emojis/1 (37).png" draggable="true" />
                    <img src="/images/emojis/1 (38).png" draggable="true" />
                    <img src="/images/emojis/1 (39).png" draggable="true" />
                    <img src="/images/emojis/1 (40).png" draggable="true" />
                    <img src="/images/emojis/1 (41).png" draggable="true" />
                    <img src="/images/emojis/1 (42).png" draggable="true" />
                    <img src="/images/emojis/1 (43).png" draggable="true" />
                    <img src="/images/emojis/1 (44).png" draggable="true" />
                    <img src="/images/emojis/1 (45).png" draggable="true" />
                    <img src="/images/emojis/1 (46).png" draggable="true" />
                    <img src="/images/emojis/1 (47).png" draggable="true" />
                    <img src="/images/emojis/1 (48).png" draggable="true" />
                    <img src="/images/emojis/1 (49).png" draggable="true" />
                    <img src="/images/emojis/1 (50).png" draggable="true" />
                    <img src="/images/emojis/1 (51).png" draggable="true" />
                    <img src="/images/emojis/1 (52).png" draggable="true" />
                    <img src="/images/emojis/1 (53).png" draggable="true" />
                    <img src="/images/emojis/1 (54).png" draggable="true" />
                    <img src="/images/emojis/1 (55).png" draggable="true" />
                    <img src="/images/emojis/1 (56).png" draggable="true" />
                    <img src="/images/emojis/1 (57).png" draggable="true" />
                    <img src="/images/emojis/1 (58).png" draggable="true" />
                    <img src="/images/emojis/1 (59).png" draggable="true" />
                    <img src="/images/emojis/1 (60).png" draggable="true" />
                </div>
            </div>
        </div>

        <div class="save-send">
            <button class="submit icon-btn btn-primary" data-bs-dismiss="modal" id="save-photo">
                <i data-feather="save"></i>
            </button>
            <button class="submit icon-btn btn-primary" data-bs-dismiss="modal" id="send-photo">
                <i data-feather="send"></i>
            </button>
        </div>
    </div>
@endsection
