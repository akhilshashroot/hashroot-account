import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  Alert,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

import { loginUser, resetPassword } from "../../redux/actions";
import { getLoggedInUser, isUserAuthenticated } from "../../helpers/authUtils";
import LoaderWidget from "../../components/Loader";
import logo from "../../assets/images/logo.png";

class PasswordUpdate extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.state = {
      confirmpassword: "",
      password: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * Handles the submit
   */
  handleValidSubmit = (event, values) => {
    let send = {
      password: values.password,
      confirm_password: values.confirmpassword,
      id: this.props.match.params.id,
    };
    console.log(send);
    this.props.resetPassword(send);
  };

  /**
   * Redirect to root
   */
  renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      if(getLoggedInUser().role === 'Admin') {
        return <Redirect to="/admin/dashboard" />;
    }
    else {
        return <Redirect to="/employee/dashboard" />;
    }
    
    }
  };

  render() {
    const isAuthTokenValid = isUserAuthenticated();

    return (
      <React.Fragment>
        {/* {(isAuthTokenValid) ? <Redirect to="/dashboard" /> : ''} */}

        {this.renderRedirectToRoot()}

        {(this._isMounted || !isAuthTokenValid) && (
          <div className="account-pages mt-5 mb-5">
            <Container>
              <Row className="justify-content-center">
                <Col lg={5}>
                  <Card>
                    <div className="card-header pt-4 pb-4 text-center bg-dark">
                    
                      <h4 style={{color:'#fff'}} >
                          Hashroot Account Portal
                        </h4>
                     
                    </div>

                    <CardBody className="p-4 position-relative">
                      {/* preloader */}
                      {this.props.loading && <LoaderWidget />}

                      <div className="text-center w-75 m-auto">
                        <h4 className="text-dark-50 text-center mt-0 font-weight-bold">
                          Hashroot Account Portal
                        </h4>
                        <p className="text-muted mb-4">
                          Enter your password and confirm password.
                        </p>
                      </div>

                      {this.props.error && (
                        <Alert
                          color="danger"
                          isOpen={this.props.error ? true : false}
                        >
                          <div>{this.props.error}</div>
                        </Alert>
                      )}

                      {this.props.passwordResetStatus && (
                        <Alert
                          color="success"
                          isOpen={this.props.passwordResetStatus ? true : false}
                        >
                          {this.props.passwordResetStatus}
                        </Alert>
                      )}

                      <AvForm onValidSubmit={this.handleValidSubmit}>
                        <AvGroup>
                          <Label for="password">Password</Label>
                          {/* <Link
                                                        to="/forget-password"
                                                        className="text-muted float-right">
                                                        <small>Forgot your password?</small>
                                                    </Link> */}
                          <AvInput
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            required
                          />
                          <AvFeedback>This field is invalid</AvFeedback>
                        </AvGroup>
                        <AvField
                          type="password"
                          name="confirmpassword"
                          label="Confirm Password"
                          placeholder="Enter your confirm password"
                          value={this.state.confirmpassword}
                          required
                        />

                        <FormGroup className="text-center">
                          <Button color="danger">Submit</Button>
                        </FormGroup>
                      </AvForm>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col className="col-12 text-center">
                  <p className="text-muted">
                    {/* Back to{' '} */}
                    <Link to="/account/login" className="text-white ml-1">
                      <b>Sign In</b>
                    </Link>
                  </p>
                </Col>
              </Row>                                    
              {/* <Row className="mt-1">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/account/register" className="text-muted ml-1">
                                            <b>Register</b>
                                        </Link>
                                    </p>
                                </Col>
                            </Row> */}
            </Container>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loading, error,passwordResetStatus } = state.Auth;
  return { user, loading, error ,passwordResetStatus};
};

export default connect(mapStateToProps, { loginUser, resetPassword })(
  PasswordUpdate
);
