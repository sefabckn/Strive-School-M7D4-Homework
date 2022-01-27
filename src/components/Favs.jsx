import { connect } from "react-redux";
import { Button, Row, Col, Container } from "react-bootstrap";
import { removeFromFavAction } from "../actions";
const mapStateToProps = (state) => ({
  favs: state.favs.content,
});

const mapDispatchToProps = (dispatch) => ({
  removeFromFav: (indexToRemove) => {
    dispatch(removeFromFavAction(indexToRemove));
  },
});

const Favs = ({ favs, removeFromFav }) => {
  console.log("favs", favs);
  return (
    <Container>
      <Row>
        <h1 style={{ textAlign: "center", alignContent: 'center' }}>Favourites</h1>
        <Col sm={12}>
          <ul style={{ listStyle: "none" }}>
            {favs.map((company, i) => (
              <li key={company._id} className="my-4">
                <Button variant="danger" onClick={() => removeFromFav(i)}>
                  <i class="cis-trash">Delete</i>
                </Button>
                <span className="mx-2">
                  <strong>{company.company_name}</strong>
                </span>
                <span>{company.title}</span>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Favs);
