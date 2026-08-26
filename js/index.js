 // Restaurants Data
    const restaurantData = [
      { id: 1, name: "Pizza Bistro", cuisine: "Italian • Pizza", rating: 4.8, time: "25-35 mins", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Burger Kingly", cuisine: "American • Burgers", rating: 4.6, time: "20-30 mins", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Green Fresh Salad", cuisine: "Healthy • Vegetarian", rating: 4.9, time: "15-25 mins", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "Sweet Treats Bakery", cuisine: "Desserts • Pastries", rating: 4.7, time: "10-20 mins", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" }
    ];

    // Food Data (Includes rating, popularity count, and price)
    const foodData = [
      { id: 1, name: "Margherita Pizza", category: "Pizza", price: 12.99, rating: 4.8, ordersCount: 230, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80", desc: "Mozzarella, fresh tomato puree, and basil leaves." },
      { id: 2, name: "Pepperoni Passion", category: "Pizza", price: 16.50, rating: 4.9, ordersCount: 450, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=400&q=80", desc: "Generous spicy pepperoni slices with mozzarella." },
      { id: 3, name: "Cheeseburger Deluxe", category: "Burgers", price: 9.49, rating: 4.5, ordersCount: 310, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80", desc: "Juicy beef patty, cheddar, lettuce and pickles." },
      { id: 4, name: "Double Smoked Burger", category: "Burgers", price: 14.99, rating: 4.7, ordersCount: 190, img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80", desc: "Double patty, smoked sauce & caramelized onions." },
      { id: 5, name: "Avocado Crunch Salad", category: "Healthy", price: 8.99, rating: 4.6, ordersCount: 120, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80", desc: "Avocado, mixed greens, seeds and vinaigrette." },
      { id: 6, name: "Chocolate Lava Cake", category: "Desserts", price: 6.50, rating: 4.9, ordersCount: 520, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80", desc: "Warm cake with molten chocolate core." }
    ];

    let cart = [];

    // Render Restaurants
    function renderRestaurants(list) {
      const grid = document.getElementById("restaurantGrid");
      grid.innerHTML = "";
      if (list.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center text-muted">No restaurants match your search.</div>`;
        return;
      }
      list.forEach(r => {
        grid.innerHTML += `
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 shadow-sm">
              <img src="${r.img}" class="card-img-top" alt="${r.name}">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h6 class="card-title fw-bold mb-0">${r.name}</h6>
                  <span class="badge badge-rating">${r.rating} ★</span>
                </div>
                <p class="text-muted small mb-2">${r.cuisine}</p>
                <div class="d-flex justify-content-between small text-secondary">
                  <span><i class="bi bi-clock"></i> ${r.time}</span>
                  <span class="text-success fw-bold">Open</span>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }

    // 1. Search Restaurant by Name
    function filterRestaurants() {
      const query = document.getElementById("restaurantSearch").value.toLowerCase();
      const filtered = restaurantData.filter(r => r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query));
      renderRestaurants(filtered);
    }

    // Render Food Cards
    function renderFoods(list) {
      const grid = document.getElementById("foodGrid");
      grid.innerHTML = "";
      if (list.length === 0) {
        grid.innerHTML = `<div class="col-12 text-center text-muted">No food items found matching your filters.</div>`;
        return;
      }
      list.forEach(f => {
        grid.innerHTML += `
          <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
              <img src="${f.img}" class="card-img-top" alt="${f.name}">
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-1">
                  <h6 class="fw-bold mb-0">${f.name}</h6>
                  <span class="badge bg-secondary">${f.category}</span>
                </div>
                <div class="small text-muted mb-2">
                  <span class="text-warning">★ ${f.rating}</span> | ${f.ordersCount}+ orders
                </div>
                <p class="text-muted small">${f.desc}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="fs-5 fw-bold text-dark">$${f.price.toFixed(2)}</span>
                  <button class="btn btn-warning btn-sm fw-bold" onclick="addToCart(${f.id})">
                    <i class="bi bi-cart-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    }

    // Price Slider Helper
    function updatePriceSlider(val) {
      document.getElementById("priceDisplay").innerText = `$${val}`;
      filterAndSortFoods();
    }

    // 2. Search Foods by Name, Category, Price Range & Sort (Rating/Popularity/Price)
    function filterAndSortFoods() {
      const search = document.getElementById("foodSearch").value.toLowerCase();
      const category = document.getElementById("foodCategory").value;
      const maxPrice = parseFloat(document.getElementById("priceRange").value);
      const sortBy = document.getElementById("foodSort").value;

      // Filtering
      let result = foodData.filter(item => {
        const matchesName = item.name.toLowerCase().includes(search);
        const matchesCat = category === "All" || item.category === category;
        const matchesPrice = item.price <= maxPrice;
        return matchesName && matchesCat && matchesPrice;
      });

      // Sorting
      if (sortBy === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "popularity") {
        result.sort((a, b) => b.ordersCount - a.ordersCount);
      } else if (sortBy === "price-low") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-high") {
        result.sort((a, b) => b.price - a.price);
      }

      renderFoods(result);
    }

    // Cart Handlers
    function addToCart(id) {
      const exist = cart.find(x => x.id === id);
      if (exist) {
        exist.quantity += 1;
      } else {
        const item = foodData.find(x => x.id === id);
        cart.push({ ...item, quantity: 1 });
      }
      updateCartUI();
    }

    function changeQuantity(id, delta) {
      const exist = cart.find(x => x.id === id);
      if (exist) {
        exist.quantity += delta;
        if (exist.quantity <= 0) cart = cart.filter(x => x.id !== id);
      }
      updateCartUI();
    }

    function clearCart() {
      cart = [];
      updateCartUI();
    }

    function updateCartUI() {
      const count = cart.reduce((acc, cur) => acc + cur.quantity, 0);
      const total = cart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0).toFixed(2);

      document.getElementById("cartCount").innerText = count;
      document.getElementById("modalCartTotal").innerText = `$${total}`;
      document.getElementById("orderTotal").innerText = `$${total}`;

      const container = document.getElementById("cartItemsContainer");
      if (cart.length === 0) {
        container.innerHTML = `<p class="text-muted text-center">Your cart is empty.</p>`;
      } else {
        container.innerHTML = cart.map(i => `
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <div class="fw-semibold">${i.name}</div>
              <small class="text-muted">$${i.price.toFixed(2)}</small>
            </div>
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i.id}, -1)">-</button>
              <span class="fw-bold">${i.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary" onclick="changeQuantity(${i.id}, 1)">+</button>
            </div>
          </div>
        `).join("");
      }
    }

    function handleCheckout(e) {
      e.preventDefault();
      if (cart.length === 0) {
        alert("Please add food items to your cart first!");
        return;
      }
      const name = document.getElementById("custName").value;
      const phone = document.getElementById("custPhone").value;
      const addr = document.getElementById("custAddress").value;
      const total = cart.reduce((acc, cur) => acc + (cur.price * cur.quantity), 0).toFixed(2);

      document.getElementById("summaryDetails").innerHTML = `
        <p class="mb-1"><strong>Name:</strong> ${name}</p>
        <p class="mb-1"><strong>Phone:</strong> ${phone}</p>
        <p class="mb-2"><strong>Address:</strong> ${addr}</p>
        <h6 class="fw-bold mt-3">Items:</h6>
        <ul class="list-group mb-3">
          ${cart.map(c => `<li class="list-group-item d-flex justify-content-between"><span>${c.name} x${c.quantity}</span><span>$${(c.price * c.quantity).toFixed(2)}</span></li>`).join('')}
        </ul>
        <h5 class="text-end fw-bold text-success">Total: $${total}</h5>
      `;

      new bootstrap.Modal(document.getElementById("summaryModal")).show();
      document.getElementById("checkoutForm").reset();
      clearCart();
    }

    // Initial load
    renderRestaurants(restaurantData);
    renderFoods(foodData);