import React from 'react';
import axios from 'axios';

export default function Register(props) {
    const url = props.url;

    const [userDetails, setUserDetails] = React.useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        contact_number: "",
        block_street: "",
        unit: "",
        postal: ""
    });

    const updateFormField = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const createNewUser = async () => {
        // alert ('hi');
        let registerResponse = await axios.post(url + "users/register", {
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.password,
            confirm_password: userDetails.confirm_password,
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            contact_number: userDetails.contact_number,
            block_street: userDetails.block_street,
            unit: userDetails.unit,
            postal: userDetails.postal
        });
        console.log(registerResponse.data);
    }

    return (
        <React.Fragment>
            <div className="container">
                <h1>Register a new account</h1>
                <div>
                    <label>First Name: </label>
                    <input type="text" className="form-control" name="first_name"
                        value={userDetails.first_name} onChange={updateFormField} />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input type="text" className="form-control" name="last_name"
                        value={userDetails.last_name} onChange={updateFormField} />
                </div>
                <div>
                    <label>Username: </label>
                    <input type="text" className="form-control" name="username"
                        value={userDetails.username} onChange={updateFormField} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" className="form-control" name="email"
                        value={userDetails.email} onChange={updateFormField} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" className="form-control" name="password"
                        value={userDetails.password} onChange={updateFormField} />
                </div>
                <div>
                    <label>Confirm password: </label>
                    <input type="password" className="form-control" name="confirm_password"
                        value={userDetails.confirm_password} onChange={updateFormField} />
                </div>
                <div>
                    <label>Contact number: </label>
                    <input type="text" className="form-control" name="contact_number"
                        value={userDetails.contact_number} onChange={updateFormField} />
                </div>
                <div>
                    <label>Block&Street: </label>
                    <input type="text" className="form-control" name="block_street"
                        value={userDetails.block_street} onChange={updateFormField} />
                </div>
                <div>
                    <label>Unit: </label>
                    <input type="text" className="form-control" name="unit"
                        value={userDetails.unit} onChange={updateFormField} />
                </div>
                <div>
                    <label>Postal: </label>
                    <input type="text" className="form-control" name="postal"
                        value={userDetails.postal} onChange={updateFormField} />
                </div>
                <button className="btn btn-primary my-2" onClick={createNewUser}>Register</button>
            </div>
        </React.Fragment>
    )
}