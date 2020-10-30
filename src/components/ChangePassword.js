import React, { Component } from 'react';
import { setUserSession, getUser } from '../Utils/Common';
import Axios from 'axios';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sentOldPass: "",
            newPass: "",
            submitError: null,
            formErrors: {
                sentOldPass: "",
                newPass: ""
            }
        }
    }


    handleChangePass = (event) => {
        event.preventDefault();
        this.setState({
            submitError: null
        });

        const reqObject = {
            sentOldPass = this.state.sentOldPass,
            newPass = this.state.newPass
        }


        Axios.post("http://localhost:3001/auth/admin/login", reqObject)
            .then(res => {
                this.setState({
                    loading: false
                });

                setUserSession(res.data.token, res.data.admin);
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
                if (error.response.status === 400 || error.response.status === 500) {
                    this.setState({
                        submitError: error.response.data.message
                    });
                }
                else {
                    this.setState({
                        submitError: "Something went wrong. Please try again later."
                    });
                }
            })

    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case "sentOldPass":
                formErrors.password = value.length < 8 ? "Minimum 8 characters are required" : "";
                break;
            case "newPass":
                formErrors.password = value.length < 8 ? "Minimum 8 characters are required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => { console.log(this.state) });
    }

    render() {

        const { formErrors } = this.state;

        return (
            <div className="container" style={{ width: "60%" }}>

                {!getUser() ?
                    <form onSubmit={this.handleChangePass}>
                        <div className="form-group">
                            <label htmlFor="sentOldPass">Old Password</label>
                            <input type="password" className={`form-control ${formErrors.sentOldPass.length > 0 ? "is-invalid" : null}`}
                                onChange={this.handleChange} id="sentOldPass"
                                name="sentOldPass"
                                placeholder="Old Password" />
                            {formErrors.sentOldPass.length > 0 && (<span>{formErrors.sentOldPass}</span>)}
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPass">New Password</label>
                            <input type="password" className={`form-control ${formErrors.newPass.length > 0 ? "is-invalid" : null}`}
                                onChange={this.handleChange} id="newPass"
                                name="newPass"
                                placeholder="New Password" />
                            {formErrors.newPass.length > 0 && (<span>{formErrors.newPass}</span>)}
                        </div>
                        {this.state.submitError && <><div className="alert alert-danger" role="alert">{this.state.submitError}</div><br /></>}<br />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form> : ""}
            </div>
        )
    }

}


export default ChangePassword;