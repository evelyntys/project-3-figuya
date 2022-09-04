import React, { useEffect } from 'react';
import UserContext from '../context/UserContext';
import { ToastContainer } from 'react-toastify';
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Taipei');

export default function Profile() {
    const userContext = React.useContext(UserContext);
    const [user, setUser] = React.useState();
    const [form, setForm] = React.useState({
        password: "",
        confirm_password: ""
    });
    let errors = userContext.getPWErrors();
    const [showUpdate, setShowUpdate] = React.useState(false);

    const updateFormField = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        async function getUser() {
            let user = await userContext.getProfile();
            setUser(user);
        }
        getUser();
    }, [])

    const [pwErrors, setPwErrors] = React.useState({
        password: "",
        confirm_password: ""
    })

    React.useEffect(() => {
        setPwErrors(errors)
    }, [errors])

    return (
        <React.Fragment>
            <ToastContainer />
            <div class="wrapper mob-content-profile">
                <div className="container profile-container">
                    {user ?
                        <div>
                            <div className="d-flex m-1 justify-content-end">
                                <button className="btn btn-sm main-btn"
                                    onClick={() => setShowUpdate(!showUpdate)}>
                                    Change password
                                </button>
                            </div>
                            <div className="d-flex justify-content-center my-1">
                                <img src={require("../images/user.png")} style={{ "height": "100px" }} alt="cat user" />
                            </div>
                            <h3 className="text-center" style={{ "fontWeight": "800" }}>{user.customer.username}</h3>
                            <p className="text-center">Joined on {moment(user.customer.created_date).format("DD-MM-YYYY")}</p>
                            <div className="row">
                                <div className="col text-center profile-text">
                                    <p><b>First name:</b> {user.customer.first_name}</p>
                                    <p><b>Last name:</b> {user.customer.last_name}</p>
                                    <p><b>Email:</b> {user.customer.email}</p>
                                    <p><b>Contact number:</b> {user.customer.contact_number}</p>
                                    <p><b>Block/Street:</b> {user.customer.block_street}</p>
                                    <p><b>Unit number:</b> {user.customer.unit}</p>
                                    <p><b>Postal code:</b> {user.customer.postal}</p>
                                </div>
                                {showUpdate ?
                                    <div>
                                        <div>
                                            <label>Password:</label>
                                            <input type="password" className="form-control" onChange={updateFormField} name="password" value={form.password} />
                                            {pwErrors.password ? <div className="error-msg">{pwErrors.password}</div> : null}
                                        </div>
                                        <div>
                                            <label>Confirm Password:</label>
                                            <input type="password" className="form-control" onChange={updateFormField} name="confirm_password" value={form.confirm_password} />
                                            {pwErrors.confirm_password ? <div className="error-msg">{pwErrors.confirm_password}</div> : null}
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className=" my-1 btn btn-sm main-btn"
                                                onClick={() => userContext.updatePassword(form.password, form.confirm_password)}>
                                                Update password
                                            </button>
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div> :
                        <div className="container d-flex justify-content-center align-items-center">
                            <img className="loader-size" src={require("../images/loader.gif")} alt="loader" />
                        </div>}
                </div>
                <img className="profile-img" src={require('../images/profile.jpg')} alt="background of figures" />
            </div>
        </React.Fragment>
    )
}