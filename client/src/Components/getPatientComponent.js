import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback ,Card, CardImg,CardImgOverlay, CardTitle, CardBody, CardText} from 'reactstrap';
import { BrowserRouter, NavLink } from 'react-router-dom';
import '../App.css';
import { render } from 'react-dom';

class GetPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pataccount: '',
            allergies: '',
            weight: '',
            height: '',
            gender: '',
            bloodtype: '',
            age: '',
            location: '',
            patient_state: '',
            treatmentsgone: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    //  contract = this.props.contract;
    //  accounts = this.props.accounts; 

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    async handleSubmit(event) {
        console.log("Current State" + JSON.stringify(this.state));
        event.preventDefault();
        const res = await this.props.contract.methods.pat(this.state.pataccount).call();
        var mst = await this.props.contract.methods.gettreatgone(this.state.pataccount).call();
        var arr = '';
        mst.map(ms => {
            arr = arr.concat(ms,',')
        })

        console.log("fdsaf",arr);
        this.setState({
            allergies: res.allergies,
            weight: res.weight,
            height: res.height,
            gender: res.gender,
            bloodtype: res.bloodtype,
            age: res.age,
            location: res.location,
            patient_state: res.patient_state,
            treatmentsgone: arr

        });
        console.log("Current State" + JSON.stringify(this.state));
        // console.log(res);

    }

    render() {
        var st = '';
        if(this.state.patient_state == 0){
            st = 'Active';
        }
        else if(this.state.patient_state == 1){
            st = 'Recovered';
        }
        else if(this.state.patient_state == 2){
            st = 'Deceased';
        }
        if(!this.props.auth){
            return(<React.Fragment></React.Fragment>);
        }
        return (
            <div className="container">

                <h2>Patient Details</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Label htmlFor="pataccount" md={2}>Patient Account</Label>
                        <Col md={10}>
                            <Input type="text" id="pataccount" name="pataccount" placeholder="Patient Account Address" value={this.state.pataccount} onChange={this.handleInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={{ size: 12}}>
                            <Button type="submit" color="primary">
                                Get Data
                                    </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <br />
                <br />
                <h2>Patient Details</h2>
                <Card >
                    <i className="fa fa-wheelchair fa-3x"></i>
                    <CardBody>
                        <CardTitle>Patient account : {this.state.pataccount}</CardTitle>
                        <CardText><small>Height : {this.state.height}</small></CardText>
                        <CardText><small>Weight : {this.state.weight}</small></CardText>
                        <CardText><small>Bloodtype : {this.state.bloodtype}</small></CardText>
                        <CardText><small>Gender : {this.state.gender}</small></CardText>
                        <CardText><small>Allergies : {this.state.allergies}</small></CardText>
                        <CardText><small>Location : {this.state.location}</small></CardText>
                        <CardText><small >State : {st}</small></CardText>
                        <CardText><small >treatments Undergone : {this.state.treatmentsgone}</small></CardText>
                    </CardBody>
                </Card>
            </div>


        )
    }
}

export default GetPatient;