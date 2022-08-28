import React, { useEffect } from 'react';
import UserContext from '../context/UserContext';
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
            {user ?
                <div className="container">
                    <p>{user.customer.first_name}</p>
                    <p>{user.customer.last_name}</p>
                    <p>{user.customer.email}</p>
                    <p>{user.customer.contact_number}</p>
                    <p>{user.customer.block_street}</p>
                    <p>{user.customer.unit}</p>
                    <p>{user.customer.postal}</p>
                    <p>Joined on {moment(user.customer.created_date).format("DD-MM-YYYY")}</p>
                </div> :
                <div className="container d-flex justify-content-center align-items-center">
                    <img src={require("../images/loader.gif")} style={{"height":"100px"}}/>
                </div>}
        </React.Fragment>
    )
}