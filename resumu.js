// 技能标签点击交互：弹出轻提示
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            const skillName = tag.getAttribute('data-skill') || tag.innerText;
            showToast(`✨ 擅长：${skillName} ✨`);
        });
    });

    // 平滑滚动（如有锚点需求，保留）
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 动态添加页面可见时的微动画
    const cards = document.querySelectorAll('.info-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(card);
    });
});

// 轻提示函数
function showToast(message, duration = 2000) {
    // 移除已存在的 toast
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        color: white;
        padding: 10px 20px;
        border-radius: 40px;
        font-size: 0.9rem;
        z-index: 1000;
        border: 1px solid rgba(255,255,200,0.3);
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        animation: fadeInUp 0.2s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}