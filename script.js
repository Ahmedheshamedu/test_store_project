const filterButtons = document.querySelectorAll('.filter');
const productCards = document.querySelectorAll('.book-card');
const productGrid = document.querySelector('.product-grid');
const sortBooks = document.getElementById('sortBooks');
const catalogSearch = document.getElementById('catalogSearch');
const catalogEmpty = document.getElementById('catalogEmpty');
const cartCount = document.getElementById('cartCount');
const addToCartButtons = document.querySelectorAll('.book-card .add-cart');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartItemsCount = document.getElementById('cartItemsCount');
const finishOrderBtn = document.getElementById('finishOrderBtn');
const authOverlay = document.getElementById('authOverlay');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const cardFields = document.getElementById('cardFields');
const walletFields = document.getElementById('walletFields');
const paymentMethodInputs = checkoutForm.querySelectorAll('input[name="paymentMethod"]');
const governorateSelect = document.getElementById('governorate');
const citySelect = document.getElementById('city');
const loginButton = document.querySelector('[data-modal="login"]');
const registerButton = document.querySelector('[data-modal="register"]');
const logoutButton = document.querySelector('[data-logout]');
const passwordToggleButtons = document.querySelectorAll('[data-toggle-password]');
const orderStatus = document.getElementById('orderStatus');
const checkoutSummary = document.getElementById('checkoutSummary');

const PRICE_PER_BOOK = 299;
const AUTH_STORAGE_KEY = 'prepverse-user';
const CART_STORAGE_KEY = 'prepverse-cart';
const originalProductOrder = [...productCards];
const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
const cart = Array.isArray(storedCart) ? storedCart : [];
const KIT_TITLE = 'Engineering Kit';
const KIT_PRICE = 1199;
const KIT_CONTENTS = [
  'Engineering Mathematics Foundation',
  'Applied Physics for Engineers',
  'Engineering Mechanics Essentials',
  'Engineering Drawing & Visualization',
  'Linear Algebra & Differential Equations',
  'Electrical Fundamentals Guide'
];

const egyptLocations = {
  "Cairo": ["Al Azbakeya", "Bab El Sharia", "Bulaq", "Dar El Salam", "El Khalifa", "El Marg", "El Matareya", "El Musky", "El Nozha", "Hadayek El Kobba", "Heliopolis", "Helwan", "Maadi", "Madinat Nasr", "Mokattam", "Qasr El Nil", "Shorouk", "Tebin", "Zeitoun"],
  "Alexandria": ["Al Amreya", "Al Agamy", "Al Attarin", "Al Gomrok", "Al Labban", "Al Mamurah", "Al Montaza", "Al Raml", "Borg El Arab", "Karmouz", "Moharam Bek", "Sidi Gaber"],
  "Port Said": ["Al Arab", "Al Dawahy", "Al Manakh", "Al Sharq", "Al Zohour", "Port Fouad"],
  "Suez": ["Al Arbaeen", "Al Ganayen", "Ataka", "Faisal", "Suez"],
  "Damietta": ["Damietta", "Faraskour", "Kafr Saad", "Kafr El Battikh", "Mit Abu Ghaleb", "El Zarqa"],
  "Dakahlia": ["Mansoura", "Aga", "Belqas", "Dikirnis", "El Manzala", "El Senbellawein", "Gamasa", "Meet Ghamr", "Mit Salsil", "Nabaroh", "Sherbin", "Talkha"],
  "Sharqia": ["Zagazig", "Abu Hammad", "Abu Kabir", "Bilbeis", "Deyerb Negm", "El Husseiniya", "Faqous", "Hihya", "Kafr Saqr", "Minya El Qamh", "Mashtoul El Souq", "10th of Ramadan"],
  "Qalyubia": ["Banha", "Kafr Shukr", "Khanka", "Qalyub", "Qaha", "Shibin El Qanater", "Shubra El Kheima", "Tukh"],
  "Kafr El Sheikh": ["Kafr El Sheikh", "Baltim", "Beyala", "Desouk", "El Hamoul", "Fouh", "Metoubes", "Qallin", "Ras El Bar"],
  "Gharbia": ["Tanta", "Basyoun", "El Mahalla El Kubra", "Kafr El Zayat", "Qutour", "Samannoud", "Santa", "Zefta"],
  "Monufia": ["Shibin El Kom", "Ashmoun", "El Bagour", "El Shohada", "Menouf", "Quesna", "Sadat", "Tala"],
  "Beheira": ["Damanhur", "Abu El Matamir", "Abu Hummus", "Edko", "Hosh Essa", "Kafr El Dawwar", "Mahmoudiyah", "Nubariya", "Rashid", "Shubrakhit", "Wadi El Natrun"],
  "Ismailia": ["Ismailia", "Abu Suwir", "El Qantara East", "El Qantara West", "Fayed", "Kasaseen", "Tell El Kebir"],
  "Giza": ["Giza", "Abu El Nomros", "Al Ayyat", "Atfih", "El Badrashein", "El Hawamdeya", "El Saff", "Kerdasa", "Meet Okba", "October Gardens", "Osim", "Sheikh Zayed", "6th of October"],
  "Beni Suef": ["Beni Suef", "Al Fashn", "Beba", "Ehnasia", "Nasser", "Sumusta El Waqf", "Wasta"],
  "Fayoum": ["Fayoum", "Etsa", "Ibshaway", "Sinnuris", "Tamiya", "Youssef El Seddik"],
  "Minya": ["Minya", "Abu Qurqas", "Beni Mazar", "Deir Mawas", "Maghagha", "Mallawi", "Matay", "Samalut"],
  "Assiut": ["Assiut", "Abnub", "Abu Tig", "Al Badari", "Al Qusiya", "Dairut", "El Ghanayem", "Manfalut", "Sahil Selim", "Sadfa"],
  "Sohag": ["Sohag", "Akhmim", "Al Baliana", "Al Maragha", "Dar El Salam", "Girga", "Juhayna", "Sakulta", "Tahta", "Tama"],
  "Qena": ["Qena", "Abu Tesht", "Dishna", "Farshut", "Nag Hammadi", "Naqada", "Qift", "Qus"],
  "Luxor": ["Luxor", "Armant", "Esna", "Al Bayadiya", "Al Qurna", "Al Tod"],
  "Aswan": ["Aswan", "Daraw", "Edfu", "Kom Ombo", "Nasr El Nuba"],
  "Red Sea": ["Hurghada", "El Quseir", "Marsa Alam", "Ras Gharib", "Safaga", "Shalateen"],
  "New Valley": ["Kharga", "Dakhla", "Farafra", "Baris", "Balat"],
  "Matrouh": ["Marsa Matrouh", "Alamein", "Dabaa", "El Hamam", "Nagila", "Sallum", "Siwa"],
  "North Sinai": ["Arish", "Bir El Abd", "Nakhl", "Rafah", "Sheikh Zuweid", "Hasana"],
  "South Sinai": ["El Tor", "Abu Rudeis", "Abu Zenima", "Dahab", "Nuweiba", "Ras Sidr", "Saint Catherine", "Sharm El Sheikh", "Taba"]
};

Object.keys(egyptLocations).forEach((governorate) => {
  governorateSelect.add(new Option(governorate, governorate));
});

governorateSelect.addEventListener('change', () => {
  const locations = egyptLocations[governorateSelect.value] || [];
  citySelect.replaceChildren(new Option(locations.length ? 'Choose a center / city' : 'No centers listed', ''));
  locations.forEach((city) => citySelect.add(new Option(city, city)));
  citySelect.disabled = locations.length === 0;
});

function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');
  const isSignedIn = Boolean(user);
  loginButton.classList.toggle('hidden', isSignedIn);
  registerButton.classList.toggle('hidden', isSignedIn);
  logoutButton.classList.toggle('hidden', !isSignedIn);
  logoutButton.textContent = isSignedIn ? `Log out (${user.name || user.email})` : 'Log out';
}

passwordToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const passwordInput = button.closest('.password-input').querySelector('input');
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    button.textContent = isVisible ? 'Show' : 'Hide';
    button.setAttribute('aria-label', `${isVisible ? 'Show' : 'Hide'} password`);
  });
});

function renderCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = String(totalCount);
  cartItemsCount.textContent = String(totalCount);
  cartTotal.textContent = `${total} EGP`;

  if (!cart.length) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">No books selected yet.</p>';
    finishOrderBtn.disabled = true;
    return;
  }

  finishOrderBtn.disabled = false;
  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item">
          <div>
            <strong>${item.title}</strong>
            <span>${item.price} EGP each</span>
            <span class="cart-item-subtotal">Subtotal: ${item.price * item.quantity} EGP</span>
            ${item.contents ? `<small class="cart-kit-contents">Includes: ${item.contents.join(', ')}</small>` : ''}
          </div>
          <div class="cart-item-actions">
            <div class="quantity-control" aria-label="Quantity for ${item.title}">
              <button type="button" class="quantity-button cart-minus" data-index="${index}" aria-label="Decrease quantity">−</button>
              <span class="quantity-value">${item.quantity}</span>
              <button type="button" class="quantity-button cart-plus" data-index="${index}" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="remove-item" data-index="${index}">Remove</button>
          </div>
        </div>
      `
    )
    .join('');

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      cart.splice(index, 1);
      renderCart();
    });
  });

  document.querySelectorAll('.cart-minus').forEach((button) => {
    button.addEventListener('click', () => changeCartQuantity(Number(button.dataset.index), -1));
  });

  document.querySelectorAll('.cart-plus').forEach((button) => {
    button.addEventListener('click', () => changeCartQuantity(Number(button.dataset.index), 1));
  });

  updateProductQuantityControls();
}

function getCartQuantity(title) {
  return cart.find((item) => item.title === title)?.quantity || 0;
}

function changeCartQuantity(index, amount) {
  const item = cart[index];
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function updateProductQuantityControls() {
  document.querySelectorAll('.book-card').forEach((card) => {
    const title = card.querySelector('h3').textContent.trim();
    const quantity = getCartQuantity(title);
    const quantityValue = card.querySelector('.product-quantity-value');
    if (quantityValue) quantityValue.textContent = String(quantity);
  });
}

function addBookToCart(card) {
  const title = card.querySelector('h3').textContent.trim();
  const price = Number(card.dataset.price) || PRICE_PER_BOOK;
  const existingItem = cart.find((item) => item.title === title);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ title, price, quantity: 1 });
  }

  renderCart();
}

function addKitToCart() {
  const existingItem = cart.find((item) => item.title === KIT_TITLE);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ title: KIT_TITLE, price: KIT_PRICE, quantity: 1, contents: KIT_CONTENTS });
  }
  renderCart();
}

function openModal(modal) {
  authOverlay.classList.remove('hidden');
  modal.classList.remove('hidden');
}

function closeModal(modal) {
  modal.classList.add('hidden');
  if (document.querySelectorAll('.modal:not(.hidden)').length === 0) {
    authOverlay.classList.add('hidden');
  }
}

function showOrderStatus(message, type) {
  orderStatus.textContent = message;
  orderStatus.className = `order-status ${type}`;
}

function hideOrderStatus() {
  orderStatus.className = 'order-status hidden';
  orderStatus.textContent = '';
}

function updatePaymentFields() {
  const paymentMethod = checkoutForm.querySelector('input[name="paymentMethod"]:checked').value;
  const isCardPayment = paymentMethod === 'card';
  const isWalletPayment = paymentMethod === 'wallet';
  cardFields.classList.toggle('hidden', !isCardPayment);
  cardFields.querySelectorAll('input').forEach((input) => {
    input.required = isCardPayment;
  });
  walletFields.classList.toggle('hidden', !isWalletPayment);
  walletFields.querySelectorAll('input, select').forEach((input) => {
    input.required = isWalletPayment;
  });
}

function renderCheckoutSummary() {
  checkoutSummary.innerHTML = cart
    .map((item) => `
      <div class="checkout-summary-row">
        <span>${item.title} × ${item.quantity}</span>
        <strong>${item.price * item.quantity} EGP</strong>
      </div>
    `)
    .join('');
}

function toggleCart() {
  cartDrawer.classList.toggle('hidden');
  authOverlay.classList.toggle('hidden', cartDrawer.classList.contains('hidden'));
}

let selectedFilter = 'all';

function updateCatalogVisibility() {
  const searchTerm = catalogSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const categories = card.dataset.category.split(' ');
    const searchableText = `${card.querySelector('h3').textContent} ${card.querySelector('p').textContent} ${card.dataset.category}`.toLowerCase();
    const matchesFilter = selectedFilter === 'all' || categories.includes(selectedFilter);
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
    const isVisible = matchesFilter && matchesSearch;
    card.classList.toggle('hidden', !isVisible);
    if (isVisible) visibleCount += 1;
  });

  catalogEmpty.classList.toggle('hidden', visibleCount > 0);
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    updateCatalogVisibility();
  });
});

catalogSearch.addEventListener('input', updateCatalogVisibility);

sortBooks.addEventListener('change', () => {
  const cards = [...productGrid.querySelectorAll('.book-card')];
  const selectedSort = sortBooks.value;

  if (selectedSort === 'price-asc') {
    cards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
  } else if (selectedSort === 'price-desc') {
    cards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
  } else if (selectedSort === 'popularity') {
    cards.sort((a, b) => Number(b.dataset.popularity) - Number(a.dataset.popularity));
  } else {
    cards.splice(0, cards.length, ...originalProductOrder);
  }

  cards.forEach((card) => productGrid.appendChild(card));
});

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.book-card');
    addBookToCart(card);
  });
});

document.querySelectorAll('[data-kit-add]').forEach((button) => {
  button.addEventListener('click', addKitToCart);
});

document.querySelectorAll('[data-kit-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const contents = document.querySelector('[data-kit-contents]');
    const isHidden = contents.classList.toggle('hidden');
    button.textContent = isHidden ? 'View kit contents' : 'Hide kit contents';
    button.setAttribute('aria-expanded', String(!isHidden));
  });
});

document.querySelectorAll('.book-card').forEach((card) => {
  const footer = card.querySelector('.book-footer');
  const addButton = card.querySelector('.add-cart');
  const quantityControl = document.createElement('div');
  quantityControl.className = 'quantity-control product-quantity-control';
  quantityControl.innerHTML = `
    <button type="button" class="quantity-button product-minus" aria-label="Decrease quantity">−</button>
    <span class="quantity-value product-quantity-value">0</span>
    <button type="button" class="quantity-button product-plus" aria-label="Increase quantity">+</button>
  `;
  footer.insertBefore(quantityControl, addButton);

  quantityControl.querySelector('.product-minus').addEventListener('click', () => {
    const title = card.querySelector('h3').textContent.trim();
    const item = cart.find((entry) => entry.title === title);
    if (!item) return;
    changeCartQuantity(cart.indexOf(item), -1);
  });
  quantityControl.querySelector('.product-plus').addEventListener('click', () => addBookToCart(card));
});

document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.modal;
    if (target === 'login') {
      openModal(loginModal);
    }
    if (target === 'register') {
      openModal(registerModal);
    }
  });
});

document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.close);
    closeModal(modal);
  });
});

document.querySelector('[data-close-cart]').addEventListener('click', () => {
  cartDrawer.classList.add('hidden');
  authOverlay.classList.add('hidden');
});

document.querySelector('[data-cart-toggle]').addEventListener('click', () => {
  if (cartDrawer.classList.contains('hidden')) {
    cartDrawer.classList.remove('hidden');
    authOverlay.classList.remove('hidden');
  } else {
    cartDrawer.classList.add('hidden');
    authOverlay.classList.add('hidden');
  }
});

authOverlay.addEventListener('click', () => {
  cartDrawer.classList.add('hidden');
  loginModal.classList.add('hidden');
  registerModal.classList.add('hidden');
  checkoutModal.classList.add('hidden');
  authOverlay.classList.add('hidden');
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ email }));
  updateAuthUI();
  const button = loginForm.querySelector('button[type="submit"]');
  button.textContent = `Welcome back, ${email}`;
  setTimeout(() => {
    closeModal(loginModal);
    button.textContent = 'Login';
    loginForm.reset();
  }, 900);
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = registerForm.querySelector('input[name="name"]').value;
  const email = registerForm.querySelector('input[name="email"]').value;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ name, email }));
  updateAuthUI();
  const button = registerForm.querySelector('button[type="submit"]');
  button.textContent = `Welcome, ${name}`;
  setTimeout(() => {
    closeModal(registerModal);
    button.textContent = 'Register';
    registerForm.reset();
  }, 900);
});

finishOrderBtn.addEventListener('click', () => {
  if (!cart.length) {
    showOrderStatus('Unable to place the order because your cart is empty.', 'error');
    return;
  }

  hideOrderStatus();
  cartDrawer.classList.add('hidden');
  checkoutModal.classList.remove('hidden');
  authOverlay.classList.remove('hidden');
  renderCheckoutSummary();
  updatePaymentFields();
});

paymentMethodInputs.forEach((input) => {
  input.addEventListener('change', updatePaymentFields);
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!cart.length) {
    showOrderStatus('Unable to place the order because your cart is empty.', 'error');
    return;
  }

  try {
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    checkoutForm.reset();
    updatePaymentFields();
    closeModal(checkoutModal);
    cartDrawer.classList.add('hidden');
    authOverlay.classList.add('hidden');
    cart.length = 0;
    renderCart();
    showOrderStatus('Order placed successfully', 'success');
  } catch (error) {
    showOrderStatus('Something went wrong while placing the order. Please try again.', 'error');
  }
});

renderCart();
updateAuthUI();

logoutButton.addEventListener('click', () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  updateAuthUI();
});

function setupScrollReveal() {
  const animatedElements = document.querySelectorAll(
    '[data-scroll-animations] .section-heading, ' +
    '[data-scroll-animations] .book-spotlight, ' +
    '[data-scroll-animations] .book-card, ' +
    '[data-scroll-animations] .discount-card, ' +
    '[data-scroll-animations] .feature-card, ' +
    '[data-scroll-animations] blockquote'
  );

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animatedElements.forEach((element) => element.classList.add('scroll-reveal-visible'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach((element) => element.classList.add('scroll-reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('scroll-reveal-visible');
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  animatedElements.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });
}

setupScrollReveal();