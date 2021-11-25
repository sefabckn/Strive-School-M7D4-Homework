import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavAction } from "../actions";

const Home = (props) => {
  const [query, setQuery] = useState();
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [query]);

  const fetchJobs = async () => {
    try {
      let response = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?search=${query}&limit=10`
      );
      if (response.ok) {
        let jobs = await response.json();
        console.log(jobs);
        setJobOffers(jobs.data);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Find a Job</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favourites
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <h1>Here is your Job Search Results: </h1>
      <Container>
        <Row id="row1">
          <Col id="col1">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup as="ul">
              {jobOffers.map((job) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto justify-content-center align-items-center">
                    <div className="fw-bold">{job.title}</div>
                    <div>
                      <Link to={`/${job._id}`}>{job.company_name}</Link>{" "}
                    </div>
                    <div>
                      <em>Publication Date:</em>
                      <span className="date1">
                        {moment(job.publication_date).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        props.addToFavAction(job);
                      }}
                      variant="primary"
                    >
                      Add To Fav
                    </Button>
                  </div>
                  <hr />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addToFavAction: (job) => dispatch(addToFavAction(job)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
