document.addEventListener('DOMContentLoaded', function() {
  const public_key = document.querySelector('meta[name="stripe-public-key"]').content;
  const stripe = Stripe(public_key);
  // need this to initialize stripe configuration
  const elements = stripe.elements();
  // clear
  const style = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'anitaliased',
      fontSize: '18px',
      '::placeholder': {
        color: '#aab7c4'
        // clear
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: "#fa755a"
    }
  };
// clear   setting styles
  const card = elements.create('card', {style: style});
// clear
  card.mount("#card-element");
// clear   mounting to card element
  card.addEventListener('change', ({errors}) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = ""
    }
  });
// clear   checking to see if there are any errors
    const form = document.getElementById('new_job');
// clear rails does new_job as a configuration by default
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
// clear   do this event and awaiting responses/changes to the order
      const {token, error} = await stripe.createToken(card);
// clear   waiting for confirmation from stripe via token, a return token =  no error's
      if (error) {
        // this will alert the customer the order was not filled because something went wrong.
        // The alert message will detail the error
        // clear
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
      } else {

        stripeTokenHandler(token);
      }
// clear   we get error's if we do not get a token
// the token handler will render these parameters through our site
// this is up communicating information/what's happening to our site
    });
// clear
      const stripeTokenHandler = (token) => {
      const form = document.getElementById('new_job');
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);
// clear   our token handler gets enabled and passes more specifications for the card
      ["brand", "exp_month", "exp_year", "last4"].forEach(function(field) {
        // foreach is an array so we can pass in a field   also  clear
        // passing these 4 params through the fieldform to correlate with form token and field
        addFieldToForm(form, token, field);
        // then we call a function for each time we pass the parameters to get to our controller
      });
      form.submit();
    }
// clear
    function addFieldToForm(form, token, field) {
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute("type", "hidden");
      hiddenInput.setAttribute("name", "user[card_" + field + "]");
      hiddenInput.setAttribute('value', token.card[field]);
      form.appendChild(hiddenInput);
    }
});
// clear
