Rails.configuration.stripe = {
  :publishable_key => ENV['stripe_publishable_key'],
  :secret_key      => ENV['stripe_api_key']
}
# clear
Stripe.api_key = ENV['stripe_api_key']
# clear
