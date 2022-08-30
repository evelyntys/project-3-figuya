import React, { useEffect } from 'react';
import UserContext from '../context/UserContext';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import Orders from './Orders';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default function Profile() {
    const userContext = React.useContext(UserContext);
    const [user, setUser] = React.useState();

    useEffect(() => {
        async function getUser() {
            let user = await userContext.getProfile();
            await setUser(user);
        }
        getUser();
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid my-2 mob-content">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Orders</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {user ?
                                        <div className="container" style={{ "border": "1px solid black" }}>
                                            <div className="d-flex justify-content-center my-1">
                                                <img src={require("../images/user.png")} style={{ "height": "100px" }} />
                                            </div>
                                            <p className="text-center">Joined on {moment(user.customer.created_date).format("DD-MM-YYYY")}</p>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>First name:</p>
                                                    <p>Last name: </p>
                                                    <p>Email:</p>
                                                    <p>Contact number:</p>
                                                    <p>Block/Street:</p>
                                                    <p>Unit number:</p>
                                                    <p>Postal code:</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>{user.customer.first_name}</p>
                                                    <p>{user.customer.last_name}</p>
                                                    <p>{user.customer.email}</p>
                                                    <p>{user.customer.contact_number}</p>
                                                    <p>{user.customer.block_street}</p>
                                                    <p>{user.customer.unit}</p>
                                                    <p>{user.customer.postal}</p>
                                                </div>
                                            </div>
                                        </div> :
                                        <div className="container d-flex justify-content-center align-items-center">
                                            <img src={require("../images/loader.gif")} style={{ "height": "100px" }} />
                                        </div>}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div className="mob-content">
                                        <Orders />
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </React.Fragment>
    )
}