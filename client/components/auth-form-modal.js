import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

/**
 * COMPONENT
 */
const AuthFormModal = props => {
  const {name, displayName, handleSubmit, error} = props
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const actions = [
    <FlatButton label="Close" primary={true} onTouchTap={handleClose} />,
    <FlatButton
      label="Submit"
      primary={true}
      type="submit"
      onTouchTap={handleSubmit}
    />
  ]

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Sign Up
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This is the dialog content text.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstName"
                  label="First Name"
                  type="firstName"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="lastName"
                  label="Last Name"
                  type="lastName"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstName"
                  label="First Name"
                  type="firstName"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Sign Up
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Log In
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Log In</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter your email and password to sign in.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Log In
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}

        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

export default AuthFormModal

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
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
      console.log()
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

export const Login = connect(mapLogin, mapDispatch)(AuthFormModal)
export const Signup = connect(mapSignup, mapDispatch)(AuthFormModal)

/**
 * PROP TYPES
 */
AuthFormModal.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
