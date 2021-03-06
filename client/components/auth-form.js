import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      fontFamily: 'Noto Sans HK'
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#f50057',
    color: '#FFF',
    width: '111%'
  }
}))

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const classes = useStyles()

  return (
    <div className="form">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form
                name="signup"
                onSubmit={handleSubmit}
                className={classes.form}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  id="email"
                  label="Email"
                  name="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs>
                    <a href="/auth/google">{displayName} with Google</a>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        ) : (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form
                name="login"
                onSubmit={handleSubmit}
                className={classes.form}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  id="email"
                  label="Email"
                  name="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth={true}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
                <div className="formButton">
                  <Button
                    type="submit"
                    fullWidth={true}
                    variant="contained"
                    color="blue"
                    className={classes.submit}
                    maxWidth="xs"
                  >
                    Log In
                  </Button>
                </div>
                <Grid container>
                  <Grid item xs>
                    <a href="/auth/google">{displayName} with Google</a>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )}

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        dispatch(auth({firstName, lastName, email, password}, formName))
      } else {
        dispatch(auth({email, password}, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
