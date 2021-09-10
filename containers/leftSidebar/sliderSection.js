import Slider from "react-slick";
const SliderSection = () => {

     const  settings = {
            infinite: true,
            speed: 200,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows:false,
            responsive: [
                {
                  breakpoint: 1366,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 7,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 5,
                  }
                },
                {
                  breakpoint: 700,
                  settings: {
                    slidesToShow: 3,
                  }
                }
              ]
        };

    return (
        <div className="recent-slider recent-chat">
            <Slider {...settings}>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-danger grow"></div>
                        <div className="recent-profile" style={{ backgroundImage: `url("/assets/images/avtar/1.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/1.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> John deo</h6>
                        </div>
                    </div>
                </div>         
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-success grow"></div>
                        <div className="recent-profile online" style={{ backgroundImage: `url("/assets/images/avtar/big/audiocall.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/big/audiocall.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> John </h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-warning grow"></div>
                        <div className="recent-profile" style={{ backgroundImage: `url("/assets/images/avtar/2.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/2.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> Jpny</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-danger grow"></div>
                        <div className="recent-profile" style={{ backgroundImage: `url("/assets/images/avtar/1.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/1.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> John deo</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-success grow"></div>
                        <div className="recent-profile online" style={{ backgroundImage: `url("/assets/images/avtar/big/audiocall.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/big/audiocall.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> John </h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-warning grow"></div>
                        <div className="recent-profile" style={{ backgroundImage: `url("/assets/images/avtar/2.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/2.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> Jpny</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-danger grow"></div>
                        <div className="recent-profile" style={{ backgroundImage: `url("/assets/images/avtar/1.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/1.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> John deo</h6>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="recent-box">
                        <div className="dot-btn dot-success grow"></div>
                        <div className="recent-profile online" style={{ backgroundImage: `url("/assets/images/avtar/big/audiocall.jpg")`,backgroundSize:"cover",backgroundPosition:"center",display:"block" }}>
                            <img className="bg-img" src="/assets/images/avtar/big/audiocall.jpg" alt="Avatar" style={{display:"none"}}/>
                        <h6> John </h6>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default SliderSection;