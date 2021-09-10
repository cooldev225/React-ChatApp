import React from 'react';
import Slider from 'react-slick';
import { Col, Container, Row } from 'reactstrap';

const PricePlan = () => {
  const settings = {
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div>
      <section className='section-py-space' id='price'>
        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <div className='landing-title'>
                <div>
                  <h1>pricing plan</h1>
                </div>
                <div className='sub-title'>
                  <div>
                    <h4>Choose Your Pricing Plan</h4>
                    <h2>Affordable for everyone!</h2>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className='custom-container'>
          <Row>
            <Col sm='12'>
              <Slider {...settings}>
                <div className='item'>
                  <div className='pricing-box'>
                    <div>
                      <div className='pricing-icon'>
                        <img
                          className='img-fluid'
                          src='/assets/images/landing/pricing-plan/1.png'
                          alt='pricing-plan'
                        />
                      </div>
                      <div className='pricing-content'>
                        <h2>Free Plan</h2>
                        <h4>$0 | Totally Free Plan</h4>
                        <a className='btn pricing-btn' href='/bonus/price'>
                          get started
                        </a>
                      </div>
                      <ul className='avb-price'>
                        <li>
                          <i className='fa fa-check'></i>Common Feature is
                          Avalible
                        </li>
                        <li>
                          <i className='fa fa-check'></i>High Definition
                          Full-screen
                        </li>
                        <li>
                          <i className='fa fa-check'></i>Try for free, Forever!
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pricing-box'>
                    <div>
                      <div className='pricing-icon'>
                        <img
                          className='img-fluid'
                          src='/assets/images/landing/pricing-plan/2.png'
                          alt='pricing-plan'
                        />
                      </div>
                      <div className='pricing-content'>
                        <h2>Professional</h2>
                        <h4>$59 | Professional Plan</h4>
                        <a className='btn pricing-btn' href='/bonus/price'>
                          {' '}
                          get started
                        </a>
                      </div>
                      <ul className='avb-price'>
                        <li>
                          <i className='fa fa-check'></i>All Features is
                          Avalible
                        </li>
                        <li>
                          <i className='fa fa-check'></i>High Definition
                          Full-screen
                        </li>
                        <li>
                          <i className='fa fa-check'></i>24/7 phone and email
                          support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pricing-box'>
                    <div>
                      <div className='pricing-icon'>
                        <img
                          className='img-fluid'
                          src='/assets/images/landing/pricing-plan/3.png'
                          alt='pricing-plan'
                        />
                      </div>
                      <div className='pricing-content'>
                        <h2>Advanced</h2>
                        <h4>$99 | Advance Plan</h4>
                        <a className='btn pricing-btn' href='/bonus/price'>
                          get started
                        </a>
                      </div>
                      <ul className='avb-price'>
                        <li>
                          <i className='fa fa-check'></i>All Features is
                          Avalible
                        </li>
                        <li>
                          <i className='fa fa-check'></i>High Definition
                          Full-screen
                        </li>
                        <li>
                          <i className='fa fa-check'></i>24/7 phone and email
                          support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='item'>
                  <div className='pricing-box'>
                    <div>
                      <div className='pricing-icon'>
                        <img
                          className='img-fluid'
                          src='/assets/images/landing/pricing-plan/2.png'
                          alt='pricing-plan'
                        />
                      </div>
                      <div className='pricing-content'>
                        <h2>Professional</h2>
                        <h4>$59 | Professional Plan</h4>
                        <a className='btn pricing-btn' href='/bonus/price'>
                          get started
                        </a>
                      </div>
                      <ul className='avb-price'>
                        <li>
                          <i className='fa fa-check'></i>All Features is
                          Avalible
                        </li>
                        <li>
                          <i className='fa fa-check'></i>High Definition
                          Full-screen
                        </li>
                        <li>
                          <i className='fa fa-check'></i>24/7 phone and email
                          support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PricePlan;
