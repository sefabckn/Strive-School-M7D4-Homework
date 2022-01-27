import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as ={Link} to ='/'>Find a Job</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as ={Link} to ='/'>Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favourites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
export default MyNavbar 