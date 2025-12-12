document.addEventListener('DOMContentLoaded', () => {
  const cartDropdown = document.querySelector('.cart-dropdown');

  if (cartDropdown) {
    fetch('mini-cart.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(html => {
        cartDropdown.insertAdjacentHTML('beforeend', html);
      })
      .catch(error => {
        console.error('Error loading mini-cart:', error);
        cartDropdown.innerHTML = '<div class="mini-cart shadow p-3 text-danger">Error loading cart.</div>';
      });
  }
});
