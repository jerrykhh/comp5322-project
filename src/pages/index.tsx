/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Page from '../components/template/Page'
import { Carousel } from 'flowbite-react'
import Link from 'next/link'

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

        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="/images/static/index-adoption.jpg" alt="adoption image" className='object-cover rounded-lg' />
            </div>
            <div className=" place-self-center lg:col-span-7 lg:ml-8">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Give them a Forever Home</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Hong Kong based pro-bono animal adoption platform. We are a social network where pet lovers can easily find updated pet adoption information from animal shelters & individual volunteers! On top of that, we can help with the adoption process and update our members with adoption news & events.</p>
              <div className="text-center md:text-left">
                <Link href="/adoptions/">
                  <div className="inline-flex cursor-pointer items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                    Adoption Pet Now
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:bg-white bg-black text-white">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="md:place-self-center lg:col-span-7 lg:text-right text-center">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl lg:text-black">Pet Care Shop</h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Provide Pet Fashion, Food Grooming, Toys, etc</p>
              <Link href="/shop">
                <div className="inline-flex cursor-pointer items-center justify-center px-5 py-3 text-base font-medium text-center text-white hover:bg-white hover:text-black lg:text-gray-900 border border-gray-300 rounded-lg lg:hover:bg-gray-100 focus:ring-4 lg:focus:ring-gray-100">
                Shopping Now
                </div>
                </Link>
             
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src="/images/static/index-item.jpg" alt="shop image" className='object-cover rounded-lg'/>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">70+</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">Matched Adoption</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">30+</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">Adoption</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">10+</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">Pet Items</dd>
              </div>
            </dl>
          </div>
        </section>

      </div >





    </Page >
  )
}

export default Home
