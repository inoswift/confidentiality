async function fetchSubscriptions() {
    const response = await fetch('/api/subscriptions', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });
    const subscriptions = await response.json();
    const subscriptionList = document.getElementById('subscriptionList');
    subscriptionList.innerHTML = '';
    subscriptions.forEach(sub => {
        const subItem = document.createElement('li');
        subItem.textContent = `${sub.plan} - Expires: ${new Date(sub.expiration_date).toLocaleDateString()}`;
        subscriptionList.appendChild(subItem);
    });
}

document.addEventListener('DOMContentLoaded', fetchSubscriptions);