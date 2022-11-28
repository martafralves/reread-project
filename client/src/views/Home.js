import Testimonials from '../components/Testimonials';
import homepage from '../images/homepage.avif';
import '../styles/home.css'

function Home() {
  return (
    <div className='home-container'>
        <div className='col home-img-container'>
            <img className='home-img' src={homepage} alt = 'homepage image - kindly offerec by unsplash.com'/>
            <div className='title-div'>
            <h1 className='img-header'>Your e-market for used books</h1>
            </div>
        </div>
        <div className='testimonial-container'>
            <Testimonials/>
        </div>
    </div>
  )
}

export default Home
