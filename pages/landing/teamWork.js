import React, { useState } from 'react';
import { ToggleLeft } from 'react-feather';
import { Col, Container, Row } from 'reactstrap';
import TeamWorkModal from './teamWorkModal';

const TeamWork = () => {
  const [modalOne, setModalOne] = useState(false);

  const toggleOne = () => setModalOne(!modalOne);
  return (
    <div>
      <section className='section-py-space team-work-main' id='team'>
        <Container className='custom-container'>
          <Row className='team-block'>
            <Col md='6'>
              <div className='team-work-content'>
                <div>
                  <div className='ply-main'>
                    <div className='ply-content'>
                      <a href='#javaScript' onClick={toggleOne}>
                        <div className='ply-sub-content'>
                          <i className='fa fa-play'></i>  
                          <TeamWorkModal modal={modalOne} toggle={toggleOne} />
                        </div>
                      </a>
                    </div>
                    <h3>
                      See Our <span>Team work</span>
                    </h3>
                  </div>
                  <h1>Efficient teamwork for every enterprise</h1>
                  <h4>
                    Big companies save time with Slack by securely collaborating
                    across teams, departments, offices and countries.
                  </h4>
                  <a className='btn pricing-btn' href='/messenger'>
                    Chitchat for enterprise
                  </a>
                </div>
              </div>
            </Col>
            <Col md='6'>
              <div className='team-work-content'>
                <img
                  className='img-fluid team-main'
                  src='../assets/images/landing/teamwork/5.png'
                  alt='chit-chat'
                />
              </div>
            </Col>
          </Row>
        </Container>
        <img
          className='img-fluid team1'
          src='../assets/images/landing/teamwork/1.png'
          alt='team-work'
        />
        <img
          className='img-fluid team2'
          src='../assets/images/landing/teamwork/2.png'
          alt='team-work'
        />
        <img
          className='img-fluid team3'
          src='../assets/images/landing/teamwork/3.png'
          alt='team-work'
        />
        <img
          className='img-fluid team4'
          src='../assets/images/landing/teamwork/4.png'
          alt='team-work'
        />
        <img
          className='img-fluid team5'
          src='../assets/images/landing/slider/6.png'
          alt='team-work'
        />
      </section>
    </div>
  );
};

export default TeamWork;
