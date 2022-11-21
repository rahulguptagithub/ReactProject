import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './api/celebrities.json'
import Accordion from 'react-bootstrap/Accordion';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleDelete(id) {
    if (window.confirm("Are you sure want to delete")) {
      let arr = this.state.data;
      arr.splice(id, 1);
      this.setState({ data: data })
    }
  }
  
  handleEdit(id) {
    
      let arr = this.state.data;
      arr[id].isDisable = false;
      this.setState({ data: data })
  }
  handleSelect = (e) => {
    console.log(e.target.value);
    this.setState({drop:e.target.value})
  }

  calculate_age(dob) {
    var diff_ms = window.Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
  handleSubmit(event) {
    event.preventDefault()

    if (data.length) {
      data.forEach(val => {
        val.age = this.calculate_age(new Date(val.dob))
        val.isDisable = true;
      })
    }

    console.log(data)
    this.setState({ data: data })

  }
  componentDidMount(){
    
    if (data.length) {
      data.forEach(val => {
        val.age = this.calculate_age(new Date(val.dob))
        val.isDisable = true;
      })
    }
    this.setState({ data: data })
  }
  render() {
    return (
      <Accordion defaultActiveKey="0">
        {this.state.data && this.state.data.map(dat =>
          <Accordion.Item eventKey={dat.id} key={dat.id}>
            <Accordion.Header>{dat.first + ' ' + dat.last}</Accordion.Header>
            <Accordion.Body>
            <Form.Label bsStyle="primary" column sm="2">Age - {dat.age}</Form.Label>
            <select value={dat.gender} onChange={this.handleSelect} column sm="3">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Orange">Rather not say</option>
                <option value="Radish">Transgender</option>
                <option value="Cherry">Other</option>
              </select>

              <Form.Label bsStyle="primary" column sm="4">Country - {dat.country}</Form.Label>
<br></br>
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control  as="textarea" type="text" placeholder="Enter email"  value={dat.description} disabled={dat.isDisable}/>
      </Form.Group>
      <button onClick={() => this.handleEdit(dat.id - 1)}>Edit data</button>
              <button onClick={() => this.handleDelete(dat.id - 1)}>Delete data</button>
            </Accordion.Body>
          </Accordion.Item>)}
      </Accordion>
    );
  }
}

export default NameForm;
