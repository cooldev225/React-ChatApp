import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CommonLayout from '../pages/common/commonLayout';

const Page404 = () => {
  return (
    <div>
      <CommonLayout title='404' parent='home'>
        <section className='error-main'>
          <ul className='page-decore'>
            <li className='top'>
              <img
                className='img-fluid inner2'
                src='/assets/images/landing/footer/2.png'
                alt='footer-back-img'
              />
            </li>
            <li className='bottom'>
              <img
                className='img-fluid inner2'
                src='/assets/images/landing/footer/2.png'
                alt='footer-back-img'
              />
            </li>
          </ul>
          <Container>
            <Row>
              <Col sm='12'>
                <div className='error-contain'>
                  <h1>404</h1>
                  <h2>Page Not Found</h2>
                  <h4>
                    The Page You Are Attempting To Reach Is Not Available.{' '}
                    <br></br>This May Be Because The Page Does Not Exist Or Has
                    Been Moved.
                  </h4>
                  <a className='btn btn-primary' href='/landing'>
                    back to home
                  </a>
                  <div className='animated-bg'>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
    </div>
  );
};

export default Page404;
