import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";
import { cartEmpty } from "../core/helper/cartHelper";



const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        errr: "",
        success: false,
    })

    const { name, email, password, error, success } = values

    const handleChange = name =>
        (event) => {
            setValues({ ...values, error: false, [name]: event.target.value });
        }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then((data) => {
                console.log("DATA", data);
                if (data.email === email) {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true
                    })
                } else {
                    setValues({
                        ...values,
                        error: true,
                        success: false
                    })
                }
            })
            .catch((e) => console.log(e));
    };

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                className="form-control"
                                value={name}
                                onChange={handleChange("name")}
                                type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                className="form-control"
                                value={email}
                                onChange={handleChange("email")}
                                type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input
                                className="form-control"
                                value={password}
                                onChange={handleChange("password")}
                                type="password" />
                        </div>
                        <button
                            onClick={onSubmit}
                            className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Signup Page" description="A Signup for LCO User">
            {signUpForm()}
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
};

export default Signup;
