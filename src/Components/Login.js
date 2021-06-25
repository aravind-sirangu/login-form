import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                userName: "",
                password: ""
            },
            formErrorMessage: {
                userNameError: "UserName should Contain atleast 8 letters",
                passwordNumberError: "Password should contain atleast 1 Number",
                passwordUpperCaseError: "Password should contain atleast 1 UpperCase Letter",
                passwordLengthError: "Password should contain atleast 8 Characters",
                passwordSpecialCharacterError: "Password should contain atleast 1 Special Character"
            },
            formValid: {
                userNameactive: false,
                passwordActive: false,
                userName: false,
                passwordNumber: false,
                passwordLength: false,
                passwordSpecialCharacter: false,
                passwordUpperCase: false,
                buttonActive: false
            },
            loginMessage: ""
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loginMessage: "Logged in Successfully" })
    }
    handleClick = (e) => {
        let target = e.target;
        let name = target.name;
        if (name == "userName") {
            this.state.formValid.passwordActive = false
            this.state.formValid.userNameactive = true
        }
        else {
            this.state.formValid.passwordActive = true
            this.state.formValid.userNameactive = false
        }
    }
    handleChange = (e) => {
        var target = e.target;
        var value = target.value;
        var name = target.name;
        var { form } = this.state;
        this.setState({ form: { ...form, [name]: value } });
        this.validateField(name, value);
    };
    validateField = (name, value) => {
        let fieldValidationErrors = this.state.formErrorMessage;
        let formValid = this.state.formValid;
        var userNamePattern = /^[a-z][^\W_]{7,14}$/i
        var passwordNumberPattern = /^(?=.*?\d$)/
        var passwordLengthPattern = /^(?=^.{8,}$)/
        var passwordSpecialCharacterPattern = /^(?=.*?[#?!@$%^&*-]$)/
        var passwordUpperCasePattern = /^(?=.*?[A-Z]$)/

        switch (name) {
            case "userName":
                if (value === "") {
                    formValid.userName = false;
                } else if (!value.match(userNamePattern)) {
                    formValid.userName = false;
                } else {
                    formValid.userName = true;
                }
                break;
            case "password":
                if (this.state.form.password === "") {
                    formValid.inputNumber = false;
                } else if (value.match(passwordLengthPattern)) {
                    formValid.passwordLength = true;
                } else if (value.match(passwordNumberPattern)) {
                    formValid.passwordNumber = true;
                }
                else if (value.match(passwordSpecialCharacterPattern)) {
                    formValid.passwordSpecialCharacter = true;
                }
                else if (value.match(passwordUpperCasePattern)) {
                    formValid.passwordUpperCase = true;
                } else {
                    fieldValidationErrors.inputNumberError = "";
                    formValid.inputNumber = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive =
            formValid.userName &&
            formValid.passwordLength && formValid.passwordNumber && formValid.passwordSpecialCharacter && formValid.passwordUpperCase
        this.setState({ formErrorMessage: fieldValidationErrors, formValid: formValid })
    }

    render() {
        return (
            <div>
                <Card className="col-md-6 offset-md-3 shadow p-3 mb-5 mt-5 bg-white rounded ">
                    <CardBody>
                        <h3 className="text-center fw-bold">Login Form</h3>
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <h4 className="text-dark ">UserName</h4>
                                <input className="form-control" type="text" id="userName" name="userName" onChange={this.handleChange} onClick={this.handleClick} />
                                {this.state.formValid.userNameactive ?
                                    <>
                                        <h6 className={this.state.formValid.userName ? "text-success" : "text-danger"} >{this.state.formErrorMessage.userNameError}</h6>
                                    </> : null
                                }
                            </div>
                            <div className="form-group">
                                <h4 className="text-dark mt-2">Password</h4>
                                <input className="form-control mt-2" type="password" id="password" name="password" onChange={this.handleChange} onClick={this.handleClick} />
                                {this.state.formValid.passwordActive ?
                                    <>
                                        <h6 className={this.state.formValid.passwordLength ? "text-success" : "text-danger"} >{this.state.formErrorMessage.passwordLengthError}</h6>
                                        <h6 className={this.state.formValid.passwordNumber ? "text-success" : "text-danger"} >{this.state.formErrorMessage.passwordNumberError}</h6>
                                        <h6 className={this.state.formValid.passwordUpperCase ? "text-success" : "text-danger"} >{this.state.formErrorMessage.passwordUpperCaseError}</h6>
                                        <h6 className={this.state.formValid.passwordSpecialCharacter ? "text-success" : "text-danger"} >{this.state.formErrorMessage.passwordSpecialCharacterError}</h6>
                                    </> : null
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block mt-3 form-control" type="submit" disabled={!this.state.formValid.buttonActive}><h6 className="font-weight-bold">Login</h6></button>
                            </div>
                        </form>
                        <h6 className="text-success text-center">{this.state.loginMessage}</h6>
                    </CardBody>
                </Card>
            </div>
        )
    }
}


export default Login