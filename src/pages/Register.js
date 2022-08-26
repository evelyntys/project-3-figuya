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
        postal: "",
    });

    const [userError, setUserError] = React.useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
        contact_number: "",
        block_street: "",
        unit: "",
        postal: "",
    })

    const updateFormField = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        })
    }

    const createNewUser = async () => {
        // alert ('hi');
        try {
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
        } catch (e) {
            console.log(e);
            console.log(e.response.data);
            let errorMessages = e.response.data;
            await setUserError({
                username: errorMessages.username,
                email: errorMessages.email,
                password: errorMessages.password,
                confirm_password: errorMessages.confirm_password,
                first_name: errorMessages.first_name,
                last_name: errorMessages.last_name,
                contact_number: errorMessages.contact_number,
                block_street: errorMessages.block_street,
                unit: errorMessages.unit,
                postal: errorMessages.postal,
            })
        }
    }

    return (
        <React.Fragment>
            <div className="container">
                <h1>Register a new account</h1>
                <div>
                    <label>First Name: </label>
                    <input type="text" className="form-control" name="first_name"
                        value={userDetails.first_name} onChange={updateFormField} />
                       {userError.first_name? <div className="error-msg">{userError.first_name}</div> : null }
                </div>
                <div>
                    <label>Last Name: </label>
                    <input type="text" className="form-control" name="last_name"
                        value={userDetails.last_name} onChange={updateFormField} />
                        {userError.last_name? <div className="error-msg">{userError.last_name}</div> : null }
                </div>
                <div>
                    <label>Username: </label>
                    <input type="text" className="form-control" name="username"
                        value={userDetails.username} onChange={updateFormField} />
                        {userError.username? <div className="error-msg">{userError.username}</div> : null }
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" className="form-control" name="email"
                        value={userDetails.email} onChange={updateFormField} />
                        {userError.email? <div className="error-msg">{userError.email}</div> : null }
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" className="form-control" name="password"
                        value={userDetails.password} onChange={updateFormField} />
                        {userError.password? <div className="error-msg">{userError.password}</div> : null }
                </div>
                <div>
                    <label>Confirm password: </label>
                    <input type="password" className="form-control" name="confirm_password"
                        value={userDetails.confirm_password} onChange={updateFormField} />
                        {userError.confirm_password? <div className="error-msg">{userError.confirm_password}</div> : null }
                </div>
                <div>
                    <label>Contact number: </label>
                    <input type="text" className="form-control" name="contact_number"
                        value={userDetails.contact_number} onChange={updateFormField} />
                        {userError.contact_number? <div className="error-msg">{userError.contact_number}</div> : null }
                </div>
                <div>
                    <label>Block&Street: </label>
                    <input type="text" className="form-control" name="block_street"
                        value={userDetails.block_street} onChange={updateFormField} />
                        {userError.block_street? <div className="error-msg">{userError.block_street}</div> : null }
                </div>
                <div>
                    <label>Unit: </label>
                    <input type="text" className="form-control" name="unit"
                        value={userDetails.unit} onChange={updateFormField} />
                        {userError.unit? <div className="error-msg">{userError.unit}</div> : null }
                </div>
                <div>
                    <label>Postal: </label>
                    <input type="text" className="form-control" name="postal"
                        value={userDetails.postal} onChange={updateFormField} />
                        {userError.postal? <div className="error-msg">{userError.postal}</div> : null }
                </div>
                <button className="btn btn-primary my-2" onClick={createNewUser}>Register</button>
            </div>
        </React.Fragment>
    )
}