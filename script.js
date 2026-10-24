const DAPURNYAKKU_CONFIG = {
  whatsappNumber: "6285257997229"
};

const products = [
  {
    name: "Paket Katering Nusantara",
    category: "Katering",
    description: "Nasi, lauk pilihan, sayur, sambal, dan buah segar.",
    price: 35000,
    unit: "per porsi",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80",
    alt: "Paket hidangan rumahan dengan sayuran segar"
  },
  {
    name: "Nasi Kotak Ayam Bakar",
    category: "Nasi Kotak",
    description: "Ayam bakar berbumbu, nasi hangat, lalapan, dan sambal.",
    price: 28000,
    unit: "per kotak",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80",
    alt: "Hidangan ayam dan nasi untuk makan siang"
  },
  {
    name: "Snack Box Sore Ceria",
    category: "Snack Box",
    description: "Kombinasi kue dan camilan, pas untuk teman berkumpul.",
    price: 22000,
    unit: "per kotak",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    alt: "Camilan gurih yang cocok untuk snack box"
  },
  {
    name: "Pisang Goreng Madu",
    category: "Jajanan Ringan",
    description: "Pisang pilihan dengan lapisan madu yang renyah.",
    price: 18000,
    unit: "per porsi",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
    alt: "Camilan goreng renyah untuk dinikmati bersama"
  },
  {
    name: "Brownies Cokelat",
    category: "Kue dan Camilan",
    description: "Brownies lembut dengan rasa cokelat yang kaya.",
    price: 65000,
    unit: "per loyang",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    alt: "Kue cokelat lembut untuk momen istimewa"
  },
  {
    name: "Nasi Kotak Rendang",
    category: "Nasi Kotak",
    description: "Rendang gurih, nasi putih, sayur, dan pelengkap.",
    price: 32000,
    unit: "per kotak",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
    alt: "Nasi dan lauk lengkap untuk makan siang"
  },
  {
    name: "Snack Box Pastry",
    category: "Snack Box",
    description: "Aneka pastry pilihan yang cocok untuk rapat dan acara.",
    price: 25000,
    unit: "per kotak",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",
    alt: "Aneka pastry segar untuk teman minum teh"
  },
  {
    name: "Kue Lapis Legit",
    category: "Kue dan Camilan",
    description: "Kue klasik berlapis dengan aroma rempah yang hangat.",
    price: 85000,
    unit: "per loyang",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    alt: "Kue berlapis dengan rasa manis yang istimewa"
  }
];

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const emptyState = document.querySelector("#empty-state");
const filterButtons = [...document.querySelectorAll(".filter-button")];
let activeCategory = "Semua";

function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function getWhatsAppUrl(message) {
  const number = DAPURNYAKKU_CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function orderMessage(product) {
  return `Halo Dapurnyakku, saya tertarik memesan ${product.name} dengan harga ${formatRupiah(product.price)} ${product.unit}. Mohon informasi lebih lanjut mengenai pemesanan. Terima kasih.`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase("id");
  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "Semua" || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.description} ${product.category}`
      .toLocaleLowerCase("id")
      .includes(query);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="product-category">${product.category}</span>
      </div>
      <div class="product-details">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">${formatRupiah(product.price)}<small>${product.unit}</small></span>
          <a class="order-button" href="${getWhatsAppUrl(orderMessage(product))}" target="_blank" rel="noopener noreferrer" aria-label="Pesan ${product.name} via WhatsApp">↗</a>
        </div>
      </div>
    </article>
  `).join("");
  emptyState.hidden = visibleProducts.length > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;
    filterButtons.forEach((filter) => filter.classList.toggle("active", filter === button));
    renderProducts();
  });
});

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    activeCategory = card.dataset.category;
    filterButtons.forEach((button) => button.classList.toggle("active", button.dataset.filter === activeCategory));
    renderProducts();
    document.querySelector("#katalog").scrollIntoView({ behavior: "smooth" });
  });
});

searchInput.addEventListener("input", renderProducts);

const generalMessage = "Halo Dapurnyakku, saya ingin bertanya tentang pemesanan. Mohon informasi lebih lanjut. Terima kasih.";
document.querySelector("#contact-whatsapp").href = getWhatsAppUrl(generalMessage);
document.querySelector("#footer-whatsapp").href = getWhatsAppUrl(generalMessage);
document.querySelector("#current-year").textContent = new Date().getFullYear();
renderProducts();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    navLinks.classList.remove("is-open");
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
