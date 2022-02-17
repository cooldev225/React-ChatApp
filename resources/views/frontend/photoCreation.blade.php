@section('photoCreation')
    <div class="text-tool">
        <div>
            <input type="text" class="text form-control" placeholder="Text Here">
            <select class="form-select form-select-sm font-family" id="font-family" aria-label=".form-select-sm example">

            </select>
            <div class="font-style">
                <span class="bold">B</span>
                <span class="italic">I</span>
            </div>
            <div class="colorPicker" id="fontColorPicker" value="#4700B3"></div>
            <div class="colorPicker" id="backColorPicker" value="#4700B3"></div>

            <button type="button" class="btn btn-primary btn-sm addText">Add</button>
        </div>
    </div>
    <div class="blur-tool">
        <div>
            <img src="/images/blur.png" alt="">
            <input type="range" class="form-range" id="blurRange" min="0" max="1.5" step="0.1" value="0">
        </div>
    </div>
    <div class="photo-container">
        <canvas id="back_canvas">
        </canvas>
        <div class="emojis-tool">
            <select class="form-select form-select-sm price-list preview-paid" aria-label="Default select example">
                <option value="0" selected>Preview</option>
                <option value="-2">Paid</option>
            </select>
            <select class="form-select form-select-sm pirce-list emojis-price d-none" aria-label="Default select example">
                <option value="0" selected>Mode</option>
                <option value="-1">Sticky</option>
                <option value="0">Free</option>
                <option value="1">$1</option>
                <option value="2">$2</option>
                <option value="5">$5</option>
                <option value="10">$10</option>
                <option value="15">$15</option>
                <option value="20">$20</option>
                <option value="25">$25</option>
            </select>
            <div class="btn background_btn">
                <input id="input_file" class="input-file" type="file">
                <img id="input_btn" class="" src="/images/gallery.png"></button>
            </div>
            <div class="btn emoji_btn">
                <div id="emoji-button"></div>
            </div>
            <div id="input_emoji_btn" class="btn add_photo_btn">
                <input class="input-file" type="file" id="input_emoji_select">
                <img class="" src="/images/add_photo.png"></button>
            </div>
            <div class="btn text_btn">
                <img src="/images/text.png" alt="Text">
            </div>
            <div class="btn blur_btn">
                <img src="/images/blur.png" alt="Blur">
            </div>
            <div class="btn lock-tool unlock lock_btn">
                <a class="icon-btn btn-outline-success outside" href="#">
                    <i class="fa fa-lock"></i>
                    <i class="fa fa-unlock-alt"></i>
                </a>
            </div>
            <div class="btn reset_btn">
                <img class="" id="input_reset" src="/images/reset.png"></button>
            </div>
            {{-- <div class="emojis">
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
            </div> --}}
        </div>
    </div>
    <div class="tool-box">
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

@section('media')
    <input type="file" accept="image/*" capture="camera" />
    <video id="player" autoplay width=400></video>
    <button id="capture">Capture</button>
    <canvas id="mediaCanvas" width=320 height=240></canvas>
    <script>
        const player = document.getElementById('player');
        const mediaCanvas = document.getElementById('mediaCanvas');
        const context = mediaCanvas.getContext('2d');
        const captureButton = document.getElementById('capture');

        const constraints = {
            video: true,
        };

        captureButton.addEventListener('click', () => {
            // Draw the video frame to the canvas.
            context.drawImage(player, 0, 0, mediaCanvas.width, mediaCanvas.height);
        });

        // Attach the video stream to the video element and autoplay.
        $('#mediaPhoto').on('shown.bs.modal', function(e) {
            if (navigator.getUserMedia) {
                // navigator.mediaDevices.getUserMedia(constraints)
                //     .then((stream) => {
                //         player.srcObject = stream;
                //     }).catch(function(error) {
                //         player.src = '/videos/2.mp4';
                //         console.log("Something went wrong!");
                //     });

                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator
                    .mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

                if (navigator.getUserMedia) {
                    navigator.getUserMedia({
                        video: true
                    }, handleVideo, videoError);
                }

                function handleVideo(stream) {
                    player.srcObject = stream;
                    player.play();
                }

                function videoError(e) {

                }
            }
        });
    </script>
@endsection
