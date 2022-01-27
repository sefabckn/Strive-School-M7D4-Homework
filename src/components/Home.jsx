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
  Card
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavAction } from "../actions";


const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addToFavAction: (job) => dispatch(addToFavAction(job)),
});

const Home = (props) => {
  const [query, setQuery] = useState();
  const [jobOffers, setJobOffers] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchcategory();
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

  const fetchcategory = async () => {
    try {
      let response = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?category=writing&limit=10`
      );
      if (response.ok) {
        let jobs = await response.json();
        console.log(jobs);
        setCategory(jobs.data);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
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
            <ListGroup as="ul" className="d-flex justify-content-between align-items-center">
              {jobOffers.map((job) => (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto justify-content-center align-items-center">
                    <div className="fw-bold">{job.title}</div>
                    <div>
                      <Link to={`/${job.company_name}`}>{job.company_name}</Link>{" "}
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
        <Row id='row2' md={4} s={6} xs={6} xlg={3} className="mt-3 d-flex">
          {
            category.map((c) => (
              <Col md={4}>
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title><h2>{c.title}</h2></Card.Title>
                    <Card.Text>
                      {c.company_name}
                    </Card.Text>
                    <Card.Text>
                      <span><b>{c.job_type.toUpperCase()}</b> - {c.category}</span>
                    </Card.Text>
                    <Button onClick={() => {props.addToFavAction(c);}}
                      variant="primary">
                      Add To Fav
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
