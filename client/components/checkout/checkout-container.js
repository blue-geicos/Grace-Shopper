import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ShippingForm from './shipping'
import PaymentForm from './payment'
import Review from './review'
import {addShippingInfo, addCardInfo} from '../../store/checkout'
import {connect} from 'react-redux'
import {guestCheckout, userCheckout} from '../../store'
import {UserHome} from '..'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    iconColor: 'lightCoral'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundColor: 'lightCoral'
  },
  stepIcon: {
    color: 'pink'
  }
}))

const steps = ['Shipping address', 'Payment details', 'Review your order']

function useStepContent(step) {
  const [formInfo, setFormInfo] = React.useState({})
  const onChange = React.useCallback(
    (propName, value) => setFormInfo({...formInfo, [propName]: value}),
    [formInfo, setFormInfo]
  )
  switch (step) {
    case 0:
      return {
        formInfo,
        Component: <ShippingForm formInfo={formInfo} handleChange={onChange} />,
        setFormInfo
      }
    case 1:
      return {
        formInfo,
        Component: <PaymentForm formInfo={formInfo} handleChange={onChange} />,
        setFormInfo
      }
    case 2:
      return {formInfo, Component: <Review />, setFormInfo}
    case 3:
      return {formInfo, Component: <UserHome />, setFormInfo}
    default:
      throw new Error('Unknown step')
  }
}

function Checkout({
  cart,
  cartId,
  userId,
  isLoggedIn,
  userCheckout,
  guestCheckout,
  addShippingInfo,
  addCardInfo
}) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const {formInfo, Component, setFormInfo} = useStepContent(activeStep)
  const total = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        addShippingInfo(formInfo)
        break
      case 1:
        addCardInfo(formInfo)
        break
      case 2:
        isLoggedIn
          ? userCheckout(cartId, userId, total)
          : guestCheckout(cart, total)
        break
      default:
        throw new Error('Unknown step')
    }
    setActiveStep(activeStep + 1)
    setFormInfo({})
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    classes: {root: classes.stepIcon}
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {Component}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="lightCoral"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  )
}

const mapState = state => ({
  cart: state.cart.cart,
  cartId: state.cart.cartId,
  isLoggedIn: !!state.user.id,
  userId: state.user.userId || 'guest'
})

const mapDispatch = dispatch => ({
  addShippingInfo: formInfo => dispatch(addShippingInfo(formInfo)),
  addCardInfo: formInfo => dispatch(addCardInfo(formInfo)),
  guestCheckout: (cart, total) => dispatch(guestCheckout(cart, total)),
  userCheckout: (cartId, userId, total) =>
    dispatch(userCheckout(cartId, userId, total))
})

export default connect(mapState, mapDispatch)(Checkout)
