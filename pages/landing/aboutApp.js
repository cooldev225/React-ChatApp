import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const AboutApp = () => {
  return (
    <div>
      <section className='section-py-space app-design-block' id='features'>
        <Container fluid={true}>
          <Row>
            <Col sm='12'>
              <div className='landing-title'>
                <div>
                  <h1>about app</h1>
                </div>
                <div className='sub-title'>
                  <div>
                    <h4>Exclusive Features</h4>
                    <h2>We provide best feature for app design and coding</h2>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className=' app-code-block'>
            <Col md='4'>
              <div className='app-design-main'>
                <div className='icon-box'>
                  <i className='ti-wand'></i>
                </div>
                <img
                  className='img-fluid app-hover'
                  src='../assets/images/landing/app/hover.png'
                  alt='app hover img'
                />
                <div className='contant-box'>
                  <a href='/messenger'>
                    <h2>latest design</h2>
                    <h4>
                      Easy to use our chat app, Attractive Features Dark &
                      light.
                    </h4>
                  </a>
                </div>
              </div>
            </Col>
            <Col md='4'>
              <div className='app-design-main hover'>
                <div className='icon-box'>
                  <i className='ti-mobile'></i>
                </div>
                <img
                  className='img-fluid app-hover'
                  src='../assets/images/landing/app/hover.png'
                  alt='app hover img'
                />
                <div className='contant-box'>
                  <a href='/messenger'>
                    <h2>fully responsive</h2>
                    <h4>
                      Easy to use our chat app, Attractive Features Dark &
                      light.
                    </h4>
                  </a>
                </div>
              </div>
            </Col>
            <Col md='4'>
              <div className='app-design-main'>
                <div className='icon-box'>
                  <i className='ti-shortcode'></i>
                </div>
                <img
                  className='img-fluid app-hover'
                  src='../assets/images/landing/app/hover.png'
                  alt='app hover img'
                />
                <div className='contant-box'>
                  <a href='/messenger'>
                    <h2>clean code</h2>
                    <h4>
                      Easy to use our chat app, Attractive Features Dark &
                      light.
                    </h4>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutApp;
