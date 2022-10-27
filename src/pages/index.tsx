/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Page from '../components/template/Page'
import { Carousel } from 'flowbite-react'

const Home: NextPage = () => {

  const [test, setTest] = useState<boolean[]>([true, false])

  return (
    <Page
      category={null}
      title='Home'>

      {/* <div className="container mx-auto">
          <div className="carousel-inner">
            <input className="carousel-open" type="radio" id="carousel-1" name="carousel" aria-hidden={true} hidden={true} checked={true} onChange={() => setTest([false, true]))}/>
            <div className="carousel-item">
              <img src="/images/carousel/background.jpg" className='w-full'/>
            </div>
            <input className="carousel-open" type="radio" id="carousel-2" name="carousel" aria-hidden={true} hidden={true} />
            <div className="carousel-item">
              <img src="http://fakeimg.pl/2000x800/F90/fff/?text=Carousel" />
            </div>

            <label htmlFor="carousel-3" className="carousel-control prev control-1">‹</label>
            <label htmlFor="carousel-2" className="carousel-control next control-1">›</label>
            <label htmlFor="carousel-1" className="carousel-control prev control-2">‹</label>
            <label htmlFor="carousel-3" className="carousel-control next control-2">›</label>
            <label htmlFor="carousel-2" className="carousel-control prev control-3">‹</label>
            <label htmlFor="carousel-1" className="carousel-control next control-3">›</label>
            
            <ol className="carousel-indicators">
              <li>
                <label htmlFor="carousel-1" className="carousel-bullet">•</label>
              </li>
              <li>
                <label htmlFor="carousel-2" className="carousel-bullet">•</label>
              </li>
              
            </ol>
          </div>
        </div> */}
      <div className="lg:container mx-auto">
        <div className="h-56 sm:h-64 md:h-[30rem]">
          <Carousel slideInterval={5000}>
            <img
              src="/images/carousel/carousel-1.jpg"
              alt="..."
            />

            <img
              src="http://fakeimg.pl/2000x800/F90/fff/?text=Testing"
              alt="..."
            />
          </Carousel>
        </div>

      </div>





    </Page >
  )
}

export default Home
