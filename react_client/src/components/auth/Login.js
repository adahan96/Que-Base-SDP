import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import authServices from '../../services/auth.service';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/***
 *  Login page
 */
 
class Login extends Component {
    
    /**
     *  Login constructor
     */

    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            redirect: authServices.getUser() && true,
            error: null,
            useStyles: makeStyles(theme => ({
                paper: {
                  marginTop: theme.spacing(8),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                },
                avatar: {
                  margin: theme.spacing(1),
                  backgroundColor: theme.palette.secondary.main,
                },
                form: {
                  width: '100%', // Fix IE 11 issue.
                  marginTop: theme.spacing(1),
                },
                submit: {
                  margin: theme.spacing(3, 0, 2),
                },
            }))
        }
        
    }
    

    componentDidMount() {
        const token = this.props.match.params.token;
        if (token) {
            authServices.setUser(token);
            this.setState({ redirect: true });
        }
    }


    /**
     *  Handling the change in the form elements and assigning them to states
     *
     *  @param e: input event
     */

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };


    /**
     *  Handling the submit action
     *
     *  @param e: input event
     */

    handleSubmit = (e) => {
        e.preventDefault();

        authServices.login({
            email: this.state.email,
            password: this.state.password
        })
            .then(response => {
                if (response.success) {
                    this.setState({ redirect: true });
                } else {
                    this.setState({ error: response.message });
                }
            })
            .catch(err => console.log(err));
    };

    
    render() {
        if (this.state.redirect) {
            return <Redirect to={'/'}/>
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <form onChange={this.handleChange} onSubmit={this.handleSubmit} method="post">
                    <div className={this.state.useStyles.paper}>
                        <Avatar className={this.state.useStyles.avatar}>
                        <LockOutlinedIcon text-align = "center"/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <form className={this.state.useStyles.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.state.useStyles.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="/signUp/" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                    {/* Error */}
                    {(this.state.error) && alert(this.state.error)}
                    </form>
            </Container>
            
           
        )
    }
}

// Exporting the component
export default Login;
