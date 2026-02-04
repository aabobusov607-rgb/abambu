document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-up');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Header Blur Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Menu (Simple toggle for now)
    // Add more complex mobile menu logic if requested

    // Form Submission Handler
    const form = document.getElementById('contactForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const button = form.querySelector('button[type="submit"]');
        const buttonText = button.textContent;

        // Показываем индикатор загрузки
        button.textContent = 'Отправка...';
        button.disabled = true;

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                result.style.display = 'block';
                result.style.color = '#10b981';
                result.textContent = '✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
                form.reset();
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            result.style.display = 'block';
            result.style.color = '#ef4444';
            result.textContent = '❌ Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами напрямую.';
        } finally {
            button.textContent = buttonText;
            button.disabled = false;
        }
    });
});
