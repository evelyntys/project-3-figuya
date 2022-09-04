import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = React.useState({
        user: "",
        password: ""
    });
    const userContext = React.useContext(UserContext);

    const updateFormField = (e) => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    }

    const Login = async () => {
        const loginToast = toast.loading("Logging you in...");
        let validLogin = await userContext.login(loginState.user, loginState.password);
        console.log(validLogin);
        if (validLogin) {
            toast.update(loginToast, {
                render: `Welcome back, ${validLogin}`,
                type: "success",
                isLoading: false,
                autoClose: 2000
            });
            setTimeout(function () {
                navigate("/products");
            }, 2000)
        } else {
            toast.update(loginToast, {
                render: "Invalid credentials, please try again.",
                type: "error",
                isLoading: false,
                autoClose: 2000
            });
        }
    }

    const directToRegister = () => {
        navigate("/register")
    }

    return (
        <React.Fragment>
            <div className="container mob-content login-container my-5">
                <div className="row parent-contain align-items-center">
                    <div className="col-12 col-lg-6 d-flex flex-col justify-content-center align-items-center login-img">
                        <img src={require("../images/logo.png")} className="login-img-logo" alt="fortune cat logo" /><br />
                    </div>
                    <div className="container p-5 col-12 col-lg-6">
                        <h1 className="text-center text-lg-start">Login</h1>
                        <div>
                            <div>
                                <label>Username/Email:</label>
                                <input type="text" name="user" className="form-control" value={loginState.user} onChange={updateFormField} />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" name="password" className="form-control" value={loginState.password} onChange={updateFormField} />
                            </div>
                            <button className="btn main-btn my-2" onClick={Login}>Login</button>
                            <ToastContainer />
                        </div>
                        Don't have an account? <span className="to-register view-more" onClick={directToRegister}>Register</span> for an account now!
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}