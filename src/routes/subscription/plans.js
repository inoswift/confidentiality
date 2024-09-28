export async function getSubscriptionPlans(req, res) {
  const plans = [
    { name: 'Basic', price: 5, description: 'Access to 5 files/month' },
    { name: 'Premium', price: 15, description: 'Unlimited access to files' },
    { name: 'Enterprise', price: 50, description: 'Custom business plans' },
  ];
  res.status(200).json(plans);
}