import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import tony from '../images/tony.avif'
import anabelle from '../images/anabelle.avif'

function Testimonials(){
    return(
        <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="mb-4">See what other users are saying</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0">
            ReRead is becoming quite popular amongst the Irish readers. See the testimonials below and find out what the users are saying about ReRead!
          </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center testimonial-row">
        <MDBCol md="6" className="mb-4 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src={anabelle}
              class="rounded-circle shadow-1-strong"
              width="100"
              height="100"
              alt='Photo by Christopher Campbell on unsplash.com'
            />
          </div>
          <p className="lead my-3 text-muted">
            "Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
            elit sed ut perspiciatis unde omnis."
          </p>
          <p className="font-italic font-weight-normal mb-0">- Anabelle Cullen</p>
        </MDBCol>
        <MDBCol md="6" className="mb-4 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src= {tony}
              class="rounded-circle shadow-1-strong"
              width="100"
              height="100"
              alt='Photo by Austin Wade on unsplash.com'
            />
          </div>
          <p className="lead my-3 text-muted">
            "Neque cupiditate assumenda in maiores repudiandae mollitia
            architecto elit sed adipiscing elit."
          </p>
          <p className="font-italic font-weight-normal mb-0">- Tony Reeves</p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        )
}
export default Testimonials;