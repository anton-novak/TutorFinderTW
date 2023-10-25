import React from 'react';
import Logo from '../assets/icon_text.svg';

function Home() {

  return (
    <>
      <section className="hero is-light is-halfheight">
        <div className="hero-body p-2 animated-gradient">
            <div className='container'>
              <img className="svg-logo" src={Logo} />
            </div>
            <p className="subtitle is-size-3 pr-6" id='gradient-text'>
              Find tutors in Taiwan with TutorFinder! <br /><br /> Our tutors teach a wide variety of subjects in person in Taipei, remotely, or both! If you are a tutor based in Taiwan, you can register for free 
            </p>
        </div>
      </section>
      <footer className="footer p-4">
        <div className="content has-text-centered has-text-grey-light">
          <p>
            <i>by TutorFinderTW LLP © 2023</i>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;