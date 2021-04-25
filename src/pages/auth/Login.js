import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

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
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock } from 'react-feather';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';

class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = { username: '', password: '' };
    }

    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.location.reload(false);
        document.body.classList.remove('authentication-bg');
    }



    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {
        this.props.loginUser(values.username, values.password);
    };

    SuperAdminHandler = () => {
        localStorage.removeItem('usertype');
        localStorage.setItem('usertype', 'superadmin');
        this.props.loginUser(this.state.username, this.state.password, 'sAdmin');
        localStorage.setItem('usernamelogin', this.state.username);

    };

    BranchAdminHandler = () => {
        localStorage.removeItem('usertype');
        localStorage.setItem('usertype', 'branchadmin');
        this.props.loginUser(this.state.username, this.state.password, 'bAdmin');
        localStorage.setItem('usernamelogin', this.state.username);
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    BranchCoachHandler = () => {
        localStorage.removeItem('usertype');
        localStorage.setItem('usertype', 'coach');
        this.props.loginUser(this.state.username, this.state.password, 'coach');
        localStorage.setItem('usernamelogin', this.state.username);

    };

    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {

        const isAuthTokenValid = isUserAuthenticated();
        if (isAuthTokenValid) {


            let usertype = localStorage.getItem("usertype");
            // if(usertype==="branchadmin"){
            //     return <Redirect to="/branchadmin/dashboard" />
            // }
            if (usertype === "superadmin") { return <Redirect to="/dashboard" />; }
            else if (usertype === "branchadmin") { return <Redirect to="/branchadmin/dashboard" />; }
            else if (usertype === "coach") { return <Redirect to="/branchcoach/client" />; }

        }
    };

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>
                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && (
                    <div className="account-pages my-5">
                        <Container>
                            <Row className="justify-content-center">
                                <Col xl={10}>
                                    <Card className="">
                                        <CardBody className="p-0">
                                            <Row>
                                                <Col md={6} className="p-5 position-relative">
                                                    {/* preloader */}
                                                    {this.props.loading && <Loader />}

                                                    <div className="mx-auto mb-5">
                                                        <a href="/">
                                                            <img src={logo} alt="" height="24" />
                                                            <h3 className="d-inline align-middle ml-1 text-logo">
                                                                Restoration
                                                            </h3>
                                                        </a>
                                                    </div>

                                                    <h6 className="h5 mb-0 mt-4">Welcome back!</h6>
                                                    <p className="text-muted mt-1 mb-4">
                                                        Enter your email address and password to access admin panel.
                                                    </p>

                                                    {this.props.error && (
                                                        <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                            <div>{this.props.error}</div>
                                                        </Alert>
                                                    )}

                                                    <AvForm
                                                        // onValidSubmit={this.handleValidSubmit}
                                                        className="authentication-form">
                                                        <AvGroup className="">
                                                            <Label for="username">Username</Label>
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Mail className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="text"
                                                                    name="username"
                                                                    id="username"
                                                                    placeholder="hello@healthrestoration.com"
                                                                    value={this.state.username} onChange={this.handleChange}
                                                                    required
                                                                />
                                                            </InputGroup>

                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <AvGroup className="mb-3">
                                                            <Label for="password">Password</Label>

                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <span className="input-group-text">
                                                                        <Lock className="icon-dual" />
                                                                    </span>
                                                                </InputGroupAddon>
                                                                <AvInput
                                                                    type="password"
                                                                    name="password"
                                                                    id="password"
                                                                    placeholder="Enter your password"
                                                                    value={this.state.password} onChange={this.handleChange}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                            <AvFeedback>This field is invalid</AvFeedback>
                                                        </AvGroup>

                                                        <FormGroup className="form-group mb-0 text-center">

                                                            <Button
                                                                color="success"
                                                                className="btn-block"
                                                                onClick={this.SuperAdminHandler}
                                                            >
                                                                {/* <Link to='/dashboard'> */}
                                                                    Log In as Master Admin
                                                                    {/* </Link> */}

                                                            </Button>

                                                            <Button
                                                                color="success"
                                                                className="btn-block"
                                                                onClick={this.BranchAdminHandler}
                                                            >
                                                                {/* <Link to='/branchadmin/dashboard'> */}
                                                                Log In as Branch Admin
                                                                {/* </Link> */}
                                                            </Button>
                                                            <Button
                                                                color="success"
                                                                className="btn-block"
                                                                onClick={this.BranchCoachHandler}>
                                                                Log In as Coach
                                                            </Button>
                                                        </FormGroup>
                                                    </AvForm>
                                                </Col>

                                                <Col md={6} className="d-none d-md-inline-block">
                                                    <div className="auth-page-sidebar">
                                                        <div className="overlay"></div>
                                                        <div className="auth-user-testimonial">
                                                            <p className="font-size-24 font-weight-bold text-white mb-1">
                                                                Welcome to Restoration !!
                                                            </p>
                                                            <p className="lead">
                                                                "We care about your health"
                                                            </p>
                                                            <p></p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col className="col-12 text-center">
                                    <p className="text-muted">
                                        Don't have an account?{' '}
                                        <Link to="/account/login" className="text-success font-weight-bold ml-1">
                                            Sign Up
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
