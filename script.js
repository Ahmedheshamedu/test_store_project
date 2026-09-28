const filterButtons = document.querySelectorAll('.filter');
const productGrid = document.querySelector('.product-grid');
const sortBooks = document.getElementById('sortBooks');
const catalogSearch = document.getElementById('catalogSearch');
const catalogEmpty = document.getElementById('catalogEmpty');
const cartCount = document.getElementById('cartCount');
const cartButton = document.querySelector('[data-cart-toggle]');
const cartDrawer = document.getElementById('cartDrawer');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartItemsCount = document.getElementById('cartItemsCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const discountRow = document.getElementById('discountRow');
const discountAmount = document.getElementById('discountAmount');
const promoCodeInput = document.getElementById('promoCode');
const applyPromoBtn = document.getElementById('applyPromoBtn');
const promoMessage = document.getElementById('promoMessage');
const finishOrderBtn = document.getElementById('finishOrderBtn');
const authOverlay = document.getElementById('authOverlay');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const dashboardModal = document.getElementById('dashboardModal');
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
const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
const mainNavigation = document.getElementById('main-navigation');
const navWrap = document.querySelector('.nav-wrap');
const addBookForm = document.getElementById('addBookForm');
const addBookFeedback = document.getElementById('addBookFeedback');
const bookDetailsModal = document.getElementById('bookDetailsModal');
const bookDetailsTitle = document.getElementById('bookDetailsTitle');
const bookDetailsCategory = document.getElementById('bookDetailsCategory');
const bookDetailsPrice = document.getElementById('bookDetailsPrice');
const bookDetailsDescription = document.getElementById('bookDetailsDescription');
const bookDetailsPages = document.getElementById('bookDetailsPages');
const bookDetailsRating = document.getElementById('bookDetailsRating');
const bookDetailsReviews = document.getElementById('bookDetailsReviews');
const bookDetailsReview = document.getElementById('bookDetailsReview');
const bookDetailsAdd = document.getElementById('bookDetailsAdd');
const bookDetailsWishlist = document.getElementById('bookDetailsWishlist');
const bookReviewList = document.getElementById('bookReviewList');
const bookReviewsSummary = document.getElementById('bookReviewsSummary');
const bookReviewForm = document.getElementById('bookReviewForm');
const reviewFeedback = document.getElementById('reviewFeedback');
const themeToggle = document.querySelector('[data-theme-toggle]');
const toastRegion = document.getElementById('toastRegion');
const dashboardButton = document.querySelector('[data-dashboard]');
const dashboardWishlistCount = document.getElementById('dashboardWishlistCount');
const dashboardCartCount = document.getElementById('dashboardCartCount');
const dashboardOrdersCount = document.getElementById('dashboardOrdersCount');
const dashboardOrdersList = document.getElementById('dashboardOrdersList');
const dashboardStudentLabel = document.getElementById('dashboardStudentLabel');

const PRICE_PER_BOOK = 299;
const AUTH_STORAGE_KEY = 'prepverse-user';
const CART_STORAGE_KEY = 'prepverse-cart';
const PROMO_STORAGE_KEY = 'prepverse-promo';
const BOOKS_STORAGE_KEY = 'prepverse-books';
const REVIEWS_STORAGE_KEY = 'prepverse-reviews';
const WISHLIST_STORAGE_KEY = 'prepverse-wishlist';
const ORDERS_STORAGE_KEY = 'prepverse-orders';
const getProductCards = () => [...productGrid.querySelectorAll('.book-card:not(.engineering-kit-card)')];
const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
const cart = Array.isArray(storedCart) ? storedCart : [];
const storedPromo = JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY) || 'null');
let appliedPromo = storedPromo && typeof storedPromo === 'object' ? storedPromo : null;
const PROMO_CODES = {
  MUST10: { label: 'MUST10', type: 'percent', value: 10 },
  ENG2026: { label: 'ENG2026', type: 'fixed', value: 100 }
};
const storedBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) || '[]');
const savedBooks = Array.isArray(storedBooks) ? storedBooks : [];
const storedReviews = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
const reviewsByBook = storedReviews && typeof storedReviews === 'object' && !Array.isArray(storedReviews) ? storedReviews : {};
const storedWishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
const wishlist = Array.isArray(storedWishlist) ? storedWishlist : [];
let activeBookTitle = '';

const THEME_STORAGE_KEY = 'prepverse-theme';
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = savedTheme === 'dark' || savedTheme === 'light'
  ? savedTheme
  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function updateThemeButton(theme) {
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.querySelector('.theme-toggle-icon').textContent = isDark ? '☀' : '☾';
  themeToggle.querySelector('.theme-toggle-label').textContent = isDark ? 'Light mode' : 'Dark mode';
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
  toast.innerHTML = `<span>${escapeHtml(message)}</span><button type="button" aria-label="Close notification">×</button>`;
  const closeButton = toast.querySelector('button');
  let timeoutId = window.setTimeout(() => toast.remove(), 3000);
  closeButton.addEventListener('click', () => {
    window.clearTimeout(timeoutId);
    toast.remove();
  });
  toastRegion.appendChild(toast);
  window.requestAnimationFrame(() => toast.classList.add('is-visible'));
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeButton(theme);
}

setTheme(initialTheme);
themeToggle.addEventListener('click', () => {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

const originalProductOrder = getProductCards();
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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatCategory(category) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getBookData(card) {
  const title = card.querySelector('h3').textContent.trim();
  const description = card.querySelector('p').textContent.trim();
  const meta = [...card.querySelectorAll('.book-meta span')].map((item) => item.textContent.trim());
  const rating = meta.find((item) => item.includes('★')) || '4.7 ★';
  const category = card.dataset.category.split(' ')[0] || 'engineering';
  return {
    title,
    description,
    price: Number(card.dataset.price) || PRICE_PER_BOOK,
    category,
    pages: card.dataset.pages || `${180 + (title.length * 7) % 120}`,
    rating,
    reviews: card.dataset.reviews || `${24 + title.length}`,
    review: card.dataset.review || 'Students appreciate the clear explanations and practical examples in this title.'
  };
}

function isWishlisted(title) {
  return wishlist.some((book) => book.title === title);
}

function updateWishlistButton(button, title) {
  const active = isWishlisted(title);
  button.classList.toggle('is-wishlisted', active);
  button.setAttribute('aria-pressed', String(active));
  button.querySelector('.wishlist-icon').textContent = active ? '♥' : '♡';
  const label = button.querySelector('.wishlist-label');
  if (label) label.textContent = active ? 'Remove from wishlist' : 'Add to wishlist';
  button.setAttribute('aria-label', active ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`);
}

function toggleWishlist(card) {
  const book = getBookData(card);
  const index = wishlist.findIndex((item) => item.title === book.title);
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push({
      title: book.title,
      price: book.price,
      category: book.category
    });
  }
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  renderDashboardStats();
  document.querySelectorAll('.wishlist-card-button').forEach((button) => {
    if (button.closest('.book-card')?.querySelector('h3')?.textContent.trim() === book.title) {
      updateWishlistButton(button, book.title);
    }
  });
  if (activeBookTitle === book.title) updateWishlistButton(bookDetailsWishlist, book.title);
}

function addWishlistButton(card) {
  if (card.querySelector('.wishlist-card-button')) return;
  const title = card.querySelector('h3').textContent.trim();
  const button = document.createElement('button');
  button.className = 'wishlist-button wishlist-card-button';
  button.type = 'button';
  button.innerHTML = '<span class="wishlist-icon" aria-hidden="true">♡</span><span class="sr-only">Add to wishlist</span>';
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleWishlist(card);
  });
  card.prepend(button);
  updateWishlistButton(button, title);
}

function getStoredReviews(title) {
  return Array.isArray(reviewsByBook[title]) ? reviewsByBook[title] : [];
}

function renderBookReviews(book) {
  const userReviews = getStoredReviews(book.title);
  const baseRatingMatch = String(book.rating).match(/[\d.]+/);
  const baseRating = baseRatingMatch ? Number(baseRatingMatch[0]) : 0;
  const baseReviewCount = Number(book.reviews) || 0;
  const totalCount = baseReviewCount + userReviews.length;
  const average = totalCount
    ? ((baseRating * baseReviewCount + userReviews.reduce((sum, review) => sum + review.rating, 0)) / totalCount).toFixed(1)
    : 'New';

  bookReviewsSummary.textContent = `${average} ★ · ${totalCount} review${totalCount === 1 ? '' : 's'}`;
  bookReviewList.innerHTML = '';
  const reviews = [
    ...(baseReviewCount ? [{ reviewer: 'PrepVerse students', rating: baseRating, comment: book.review }] : []),
    ...userReviews
  ];

  if (!reviews.length) {
    bookReviewList.innerHTML = '<p class="empty-reviews">No reviews yet. Be the first to share your experience.</p>';
    return;
  }

  reviews.slice().reverse().forEach((review) => {
    const item = document.createElement('article');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-item-header">
        <strong>${escapeHtml(review.reviewer)}</strong>
        <span class="review-stars" aria-label="${review.rating} out of 5 stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
      </div>
      <p>${escapeHtml(review.comment)}</p>
    `;
    bookReviewList.appendChild(item);
  });
}

function createBookCard(book) {
  const card = document.createElement('article');
  card.className = 'book-card user-book-card';
  card.dataset.category = book.category;
  card.dataset.price = String(book.price);
  card.dataset.popularity = '40';
  card.dataset.pages = String(book.pages);
  card.dataset.reviews = String(book.reviews);
  card.dataset.review = book.review;
  card.innerHTML = `
    <div class="book-badge core">${escapeHtml(formatCategory(book.category))}</div>
    <h3>${escapeHtml(book.title)}</h3>
    <p>${escapeHtml(book.description)}</p>
    <div class="book-meta">
      <span>New title</span>
      <span>${escapeHtml(book.rating || 'New')}</span>
    </div>
    <div class="book-footer">
      <strong>${book.price} EGP</strong>
      <button class="add-cart" type="button">Add to cart</button>
    </div>
  `;
  addWishlistButton(card);
  return card;
}

function renderSavedBooks() {
  savedBooks.forEach((book) => productGrid.appendChild(createBookCard(book)));
  productGrid.querySelectorAll('.book-card').forEach(addWishlistButton);
}

renderSavedBooks();

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
  dashboardButton.textContent = isSignedIn ? 'My dashboard' : 'Student dashboard';
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
  const { subtotal, discount, total } = getCartTotals();
  cartCount.textContent = String(totalCount);
  renderDashboardStats();
  cartButton.classList.toggle('hidden', totalCount === 0);
  navWrap.classList.toggle('cart-visible', totalCount > 0);
  cartItemsCount.textContent = String(totalCount);
  cartSubtotal.textContent = `${subtotal} EGP`;
  discountRow.classList.toggle('hidden', discount === 0);
  discountAmount.textContent = `-${discount} EGP`;
  cartTotal.textContent = `${total} EGP`;

  if (!cart.length) {
    appliedPromo = null;
    localStorage.removeItem(PROMO_STORAGE_KEY);
    promoCodeInput.value = '';
    promoMessage.textContent = '';
    promoMessage.className = 'promo-message';
    cartSubtotal.textContent = '0 EGP';
    discountRow.classList.add('hidden');
    discountAmount.textContent = '-0 EGP';
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

function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo
    ? Math.min(subtotal, appliedPromo.type === 'percent' ? subtotal * appliedPromo.value / 100 : appliedPromo.value)
    : 0;
  return { subtotal, discount, total: subtotal - discount };
}

function applyPromoCode() {
  const code = promoCodeInput.value.trim().toUpperCase();
  const promo = PROMO_CODES[code];

  if (!code) {
    appliedPromo = null;
    localStorage.removeItem(PROMO_STORAGE_KEY);
    promoMessage.textContent = 'Enter a promo code first.';
    promoMessage.className = 'promo-message error';
  } else if (!promo) {
    appliedPromo = null;
    localStorage.removeItem(PROMO_STORAGE_KEY);
    promoMessage.textContent = 'Invalid promo code.';
    promoMessage.className = 'promo-message error';
    showToast('Invalid promo code.', 'error');
  } else {
    appliedPromo = promo;
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promo));
    promoCodeInput.value = promo.label;
    promoMessage.textContent = promo.type === 'percent'
      ? `${promo.label} applied successfully: ${promo.value}% off.`
      : `${promo.label} applied successfully: ${promo.value} EGP off.`;
    promoMessage.className = 'promo-message success';
    showToast(`${promo.label} applied successfully.`);
  }

  renderCart();
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
  document.querySelectorAll('.book-card:not(.engineering-kit-card)').forEach((card) => {
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
  showToast(`${title} added to your cart.`);
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

function openBookDetails(card) {
  const book = getBookData(card);
  activeBookTitle = book.title;
  bookDetailsTitle.textContent = book.title;
  bookDetailsCategory.textContent = formatCategory(book.category);
  bookDetailsPrice.textContent = `${book.price} EGP`;
  bookDetailsDescription.textContent = book.description;
  bookDetailsPages.textContent = `${book.pages} pages`;
  bookDetailsRating.textContent = book.rating;
  bookDetailsReviews.textContent = `${book.reviews} student reviews`;
  bookDetailsReview.textContent = `"${book.review}"`;
  bookDetailsAdd.dataset.cardTitle = book.title;
  updateWishlistButton(bookDetailsWishlist, book.title);
  bookReviewForm.reset();
  reviewFeedback.classList.add('hidden');
  renderBookReviews(book);
  openModal(bookDetailsModal);
}

function openModal(modal) {
  authOverlay.classList.remove('hidden');
  modal.classList.remove('hidden');
}

function getStoredOrders() {
  const storedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
  return Array.isArray(storedOrders) ? storedOrders : [];
}

function renderDashboardStats() {
  const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
  const orders = getStoredOrders();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const user = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || 'null');

  dashboardWishlistCount.textContent = String(Array.isArray(wishlist) ? wishlist.length : 0);
  dashboardCartCount.textContent = String(totalCartItems);
  dashboardOrdersCount.textContent = String(orders.length);
  dashboardStudentLabel.textContent = user ? `Signed in as ${user.name || user.email}` : 'Local account';

  if (!orders.length) {
    dashboardOrdersList.innerHTML = '<p class="dashboard-empty">No orders yet. Your completed orders will appear here.</p>';
    return;
  }

  dashboardOrdersList.innerHTML = orders
    .map((order) => `
      <article class="dashboard-order">
        <div>
          <strong>${escapeHtml(order.id)}</strong>
          <span>${escapeHtml(order.date)} · ${order.itemCount} ${order.itemCount === 1 ? 'book' : 'books'}</span>
        </div>
        <div class="dashboard-order-meta">
          <strong>${order.total} EGP</strong>
          <span class="order-status-badge">${escapeHtml(order.status)}</span>
        </div>
      </article>
    `)
    .join('');
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
  const { subtotal, discount, total } = getCartTotals();
  checkoutSummary.innerHTML = cart
    .map((item) => `
      <div class="checkout-summary-row">
        <span>${item.title} × ${item.quantity}</span>
        <strong>${item.price * item.quantity} EGP</strong>
      </div>
    `)
    .join('') + `
      <div class="checkout-summary-row"><span>Subtotal</span><strong>${subtotal} EGP</strong></div>
      ${discount ? `<div class="checkout-summary-row discount-summary-row"><span>Discount (${appliedPromo.label})</span><strong>-${discount} EGP</strong></div>` : ''}
      <div class="checkout-summary-row checkout-total-row"><span>Total</span><strong>${total} EGP</strong></div>
    `;
}

function toggleCart() {
  cartDrawer.classList.toggle('hidden');
  authOverlay.classList.toggle('hidden', cartDrawer.classList.contains('hidden'));
}

let selectedFilter = 'all';

function updateCatalogVisibility() {
  const searchTerm = catalogSearch.value.trim().toLowerCase();
  let visibleCount = 0;

  getProductCards().forEach((card) => {
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

productGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-cart');
  if (addButton) {
    addBookToCart(addButton.closest('.book-card'));
    return;
  }

  if (event.target.closest('button, a, input, select, textarea')) return;
  const card = event.target.closest('.book-card');
  if (card) openBookDetails(card);
});

bookDetailsWishlist.addEventListener('click', () => {
  const matchingCard = [...productGrid.querySelectorAll('.book-card')].find((item) => item.querySelector('h3').textContent.trim() === activeBookTitle);
  if (matchingCard) toggleWishlist(matchingCard);
});

bookDetailsAdd.addEventListener('click', () => {
  const card = getProductCards().find((item) => item.querySelector('h3').textContent.trim() === bookDetailsAdd.dataset.cardTitle);
  if (card) addBookToCart(card);
  closeModal(bookDetailsModal);
});

bookReviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(bookReviewForm);
  const rating = Number(formData.get('rating'));
  const reviewer = String(formData.get('reviewer') || '').trim();
  const comment = String(formData.get('comment') || '').trim();

  if (!activeBookTitle || rating < 1 || rating > 5 || !reviewer || !comment) return;

  const review = {
    id: `review-${Date.now()}`,
    reviewer,
    rating,
    comment,
    createdAt: new Date().toISOString()
  };
  reviewsByBook[activeBookTitle] = [...getStoredReviews(activeBookTitle), review];
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviewsByBook));

  const card = getProductCards().find((item) => item.querySelector('h3').textContent.trim() === activeBookTitle);
  if (card) renderBookReviews(getBookData(card));
  bookReviewForm.reset();
  reviewFeedback.textContent = 'Your review was published successfully.';
  reviewFeedback.classList.remove('hidden');
  showToast('Your review was published successfully.');
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

function initializeProductQuantityControl(card) {
  if (card.classList.contains('engineering-kit-card') || card.querySelector('.product-quantity-control')) return;
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
}

getProductCards().forEach(initializeProductQuantityControl);
productGrid.querySelectorAll('.book-card').forEach(addWishlistButton);

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(addBookForm);
  const book = {
    id: `book-${Date.now()}`,
    title: String(formData.get('title')).trim(),
    price: Number(formData.get('price')),
    category: String(formData.get('category')),
    description: String(formData.get('description')).trim(),
    pages: 180 + Math.floor(Math.random() * 121),
    rating: 'New',
    reviews: 0,
    review: 'This is a newly added title. Be the first student to review it.'
  };

  if (!book.title || !book.price || !book.category || !book.description) return;
  savedBooks.push(book);
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(savedBooks));
  const card = createBookCard(book);
  productGrid.appendChild(card);
  initializeProductQuantityControl(card);
  addWishlistButton(card);
  addBookForm.reset();
  addBookFeedback.textContent = `${book.title} was added to the catalog.`;
  addBookFeedback.classList.remove('hidden');
  showToast(`${book.title} was added to the catalog.`);
  updateCatalogVisibility();
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

  dashboardButton.addEventListener('click', () => {
    renderDashboardStats();
    openModal(dashboardModal);
  });
});

function setMobileMenuState(isOpen) {
  mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  mainNavigation.classList.toggle('mobile-menu-open', isOpen);
  document.body.classList.toggle('mobile-menu-is-open', isOpen);
}

mobileMenuToggle.addEventListener('click', () => {
  setMobileMenuState(mobileMenuToggle.getAttribute('aria-expanded') !== 'true');
});

mainNavigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMobileMenuState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMobileMenuState(false);
});

window.matchMedia('(min-width: 768px)').addEventListener('change', () => setMobileMenuState(false));

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
  dashboardModal.classList.add('hidden');
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
    const { total } = getCartTotals();
    const orders = getStoredOrders();
    const orderId = `PV-${Date.now().toString(36).toUpperCase()}`;
    orders.unshift({
      id: orderId,
      status: 'Processing',
      itemCount,
      total,
      date: new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).format(new Date())
    });
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    checkoutForm.reset();
    updatePaymentFields();
    closeModal(checkoutModal);
    cartDrawer.classList.add('hidden');
    authOverlay.classList.add('hidden');
    cart.length = 0;
    renderCart();
    renderDashboardStats();
    showOrderStatus('Order placed successfully', 'success');
  } catch (error) {
    showOrderStatus('Something went wrong while placing the order. Please try again.', 'error');
  }
});

applyPromoBtn.addEventListener('click', applyPromoCode);
promoCodeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    applyPromoCode();
  }
});

renderCart();
if (appliedPromo) {
  promoCodeInput.value = appliedPromo.label;
  promoMessage.textContent = appliedPromo.type === 'percent'
    ? `${appliedPromo.label} applied successfully: ${appliedPromo.value}% off.`
    : `${appliedPromo.label} applied successfully: ${appliedPromo.value} EGP off.`;
  promoMessage.className = 'promo-message success';
}
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