document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-nav">
                <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('.modal-image');
    const closeModal = modal.querySelector('.close-modal');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => 
        item.style.backgroundImage.replace('url("', '').replace('")', '')
    );
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openModal();
        });
    });
    
    function openModal() {
        modal.style.display = 'flex';
        modalImg.src = images[currentIndex];
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function navigate(direction) {
        currentIndex += direction;
        if (currentIndex >= images.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = images.length - 1;
        modalImg.src = images[currentIndex];
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });
    
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModalFunc();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        }
    });
});