import homepage from '../images/homepage.avif';
import '../styles/home.css'

function Home() {
  return (
    <div className='home-container'>
      <div className='col'>
        <h1 className='home-header'>Your e-market for used books</h1>
      </div>
        <div className='col home-img-container'>
            <img className='home-img' src={homepage} alt = 'homepage image - kindly offerec by unsplash.com'/>
        </div>
    </div>
  )
}

export default Home
