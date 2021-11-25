import { useState, useEffect } from "react"
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { useParams } from "react-router-dom"
import {addToFavAction} from '../actions'
import { connect } from 'react-redux'


const mapStateToProps = (state) => state
  
  const mapDispatchToProps = (dispatch) => ({
    addToFav: function (addCompany) {
      dispatch(addToFavAction(addCompany))
    }
  })


const CompanyInfo = ({addToFav}) => {
    // const [selectedCompany, setSelectedCompany] = useState('')
    const [jobs, setJobs] = useState([])
    const params = useParams();

    useEffect(() => {
        jobInfo()
    }, [])


    const jobInfo = async() => {
        let response = await fetch(`https://strive-jobs-api.herokuapp.com/jobs?company=${params.company}&limit=10`)
        const {data} = await response.json()
        setJobs(data)
    }

    return(
        <Container>
            <Row>
                <Col>
                
                    {jobs.map((info) => ( 
                        <Card key={info._id}>
                        <Card.Body>
                            <span><strong>{info.company_name}</strong></span> 
                            <Button variant="outline-danger" className="ml-3" onClick={() => addToFav(info)}>Add to Favs</Button>
                            <div>{info.title}</div>
                            </Card.Body>
                      </Card>
                         ))}
                        
                </Col>
            </Row>
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInfo)