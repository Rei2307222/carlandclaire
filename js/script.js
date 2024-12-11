const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.product-card');
const dotsContainer = document.querySelector('.dots');
let currentPosition = 0;
const cardWidth = 100 / cards.length;
const totalSlides = Math.ceil(cards.length / getCardsPerView());


// Ambil elemen navbar
const navbar = document.querySelector('.nav');
const logo = document.querySelector('.logo img');
const exploreSection = document.querySelector('.title'); // Ambil elemen judul "Explore the Collection"

// Fungsi untuk menambahkan atau menghapus kelas sticky
function handleScroll() {
    const sectionTop = exploreSection.getBoundingClientRect().top; // Posisi bagian "Explore the Collection"
    if (sectionTop < 0) { // Jika bagian tersebut sudah di atas viewport
        navbar.classList.add('sticky');
        logo.setAttribute('src', '/media/2.png'); // Tambahkan kelas sticky
    } else {
        navbar.classList.remove('sticky');
        logo.setAttribute('src', '/media/1.png'); // Hapus kelas sticky
    }
}
// Tambahkan event listener untuk scroll
window.addEventListener('scroll', handleScroll);

// Fungsi untuk membuat titik
function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Fungsi untuk mendapatkan jumlah kartu per tampilan
function getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4; // Menampilkan 4 kartu di layar besar
}

// Fungsi untuk memperbarui titik
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    const currentSlide = Math.abs(currentPosition / (cardWidth * getCardsPerView()));
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Fungsi untuk memindahkan slide
function moveSlide(direction) {
    console.log("Current Position: ", currentPosition);
    console.log("Direction: ", direction)
    const cardsPerView = getCardsPerView();
    const maxPosition = -(Math.ceil((cards.length - cardsPerView) / cardsPerView) * cardsPerView * cardWidth);
    
    currentPosition += direction * (cardWidth * cardsPerView);
    
    // Menangani batas
    if (currentPosition > 0) currentPosition = maxPosition;
    if (currentPosition < maxPosition) currentPosition = 0;

    slider.style.transform = `translateX(${currentPosition}%)`;
    updateDots();
}

// Fungsi untuk pergi ke slide tertentu
function goToSlide(slideIndex) {
    console.log("Going to Slide: ", slideIndex);
    const cardsPerView = getCardsPerView();
    currentPosition = -(slideIndex * cardsPerView * cardWidth);
    slider.style.transform = `translateX(${currentPosition}%)`;
    updateDots();
}

// Inisialisasi titik
createDots();

// Menangani perubahan ukuran jendela
window.addEventListener('resize', () => {
    createDots();
    currentPosition = 0;
    slider.style.transform = `translateX(0)`;
    updateDots();
});

// Opsional: Auto slide
setInterval(() => moveSlide(1), 10000);
