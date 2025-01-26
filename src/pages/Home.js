import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>

      {/* SHOWCASE TOP */}
      {/* <section className='bg-dark text-light p-5 p-lg-0 text-center text-sm-start'> */}
      <section className='bg-dark-color text-light text-center text-sm-start'>
          <div className='container'>
              <div className='d-sm-flex align-items-center justify-content-between pe-2'>
                  <div>
                      <p className='text-main-color fs-5'>#1 on draft evaluations</p>
                      <h1 className='showcase-title'>
                          Discover<br/>
                          Tomorrow's NFL<br/>
                          Stars
                      </h1>
                      <p className='lead mt-4 mr-3 pe-5'>
                        Unite with Draft Pulse: Your Gateway to Discover NFL Draft Prospects - from SEC Powerhouses to Hidden Draft Gems. Test Your Scouting Skills Against the Best!
                      </p>
                      <button className='btn-main-color my-4 btn-glow'>Sign up today</button>
                  </div>
                  <img className='img-fluid w-50 d-none d-sm-block' src='/img/draft.jpg' alt='NFL Draft'/>
              </div>
          </div>
      </section>

      {/* SHOWCASE BOTTOM */}
      <section className='bg-main-color text-light text-center text-sm-start pt-5' id='showcase-bottom'>
          <div className='container text-center text-dark-color'>
              <h2 className='fw-bold'>The #1 interactive NFL Draft community platform</h2>
              <p className='lead'>As recognized by spots analysts, fans, and scouting experts</p>
              {/* <div className='d-flex justify-content-between'> */}
              <div className='pb-5'>

                <img className='img-fluid showcase-bottom-img mx-3' src='/img/placeholder.png' alt='placeholder'/>
                <img className='img-fluid showcase-bottom-img mx-3' src='/img/placeholder.png' alt='placeholder'/>
                <img className='img-fluid showcase-bottom-img mx-3' src='/img/placeholder.png' alt='placeholder'/>
                <img className='img-fluid showcase-bottom-img mx-3' src='/img/placeholder.png' alt='placeholder'/>
                <img className='img-fluid showcase-bottom-img mx-3' src='/img/placeholder.png' alt='placeholder'/>
              </div>
          </div>
      </section>
    </div>
  )
}

export default Home