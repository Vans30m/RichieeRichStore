# Richiee Rich Store

Welcome to **The Richiee Rich Store** — a front-end e-commerce website built as a 1st Semester Front-End Development (FEE) project.

---

## Overview
The Richiee Rich Store is an interactive online store featuring modern mobile phones, electronics, and premium watches. It features dynamic product listing, interactive cart management via `localStorage`, and structured UI navigation.

---

## Features & Key Fixes

### E-Commerce Functionality
- **Dynamic Product Rendering**: Renders products dynamically from [`products.json`](file:///d:/Chitkara/Projects/RichieeRichStore/products.json).
- **Interactive Shopping Cart**: Add, update, and remove items with real-time price total calculations.
- **Cart Persistence**: Uses browser `localStorage` to preserve items across page refreshes.

### Architecture & Code Quality Fixes
- **Robust DOM Guards**: Protected DOM query selectors (`.listProduct`, `.listCart`, `.icon-cart`, `.close`) in [`cart.js`](file:///d:/Chitkara/Projects/RichieeRichStore/cart.js) against null references when scripts are loaded across various pages.
- **Portable Relative Links**: Replaced absolute local development URLs (`http://127.0.0.1:5500/...`) with relative URLs, allowing seamless deployment on GitHub Pages or hosting services.
- **Clean Image Architecture**: Organized all site graphics and model assets cleanly under `images/site/` and product model subdirectories (`images/s24-ultra/`, `images/16-pro-max/`, etc.).

---

## Project Structure

```text
RichieeRichStore/
├── index 2.html        # Main landing page
├── MOBILE.html         # Mobile phones catalog
├── ELECTRONICS.html    # Electronics catalog
├── WATCHES.html        # Watches catalog
├── cart.html           # Shopping cart page
├── login.html          # User login page
├── signup.html         # User sign-up page
├── aboutus.html        # About Us page
├── cart.js             # Cart logic, DOM handlers & local storage management
├── cart.css            # Styles for cart modal and notifications
├── products.json       # Product metadata catalog (names, prices, images, links)
└── images/             # Organized assets directory
    ├── site/           # General background wallpapers, icons, and site graphics
    ├── 14-ultra/       # Model specific image assets
    ├── 16-plus/
    ├── 16-pro-max/
    ├── book-4-pro/
    ├── book-4-pro-360/
    ├── legion-5-pro/
    ├── mac-2023/
    ├── mac-book-pro/
    ├── s24-plus/
    └── s24-ultra/
```

---

## Technologies Used

- **HTML5**: Semantic web structure
- **CSS3**: Layout design, animations, glassmorphic cart overlay & responsive styles
- **JavaScript (ES6+)**: Fetch API, DOM manipulation, state management & local storage
- **JSON**: Structured product data catalog

---

## How to Run Locally

1. Clone or download the repository.
2. Open [`index 2.html`](file:///d:/Chitkara/Projects/RichieeRichStore/index%202.html) or run a local web server (e.g. VS Code Live Server or `python -m http.server`).
3. Browse products, add items to your cart, and test navigation!
