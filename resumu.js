document.addEventListener('DOMContentLoaded', () => {
    // 1. 技能标签交互：点击弹出“玻璃质感”提示
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation(); // 防止冒泡
            const skillName = tag.getAttribute('data-skill') || tag.innerText;
            showGlassToast(`✨ 技能点：${skillName}`);
        });
    });

    // 2. 滚动显现动画 (优化版)
    // 避免使用 transform: translateY，防止与 CSS 中的 hover 效果冲突
    const cards = document.querySelectorAll('.info-card, .glass-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.05 }); // 只要露出一点点就触发

    cards.forEach(card => {
        // 初始状态：透明 + 轻微放大
        card.style.opacity = '0';
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(card);
    });

    // 3. 顶部标题打字机效果 (增加科技感)
    const title = document.querySelector('.title-section h1');
    if (title) {
        const text = title.innerHTML;
        title.innerHTML = ''; // 清空
        let i = 0;
        
        // 简单的逐字显示逻辑 (保留 HTML 标签)
        // 注意：这是一个简化的打字机效果，实际可能需要更复杂的解析来跳过标签
        // 这里为了简单，我们直接让整个标题淡入，或者只给名字加光标
        title.style.borderRight = "2px solid #ffde9c";
        title.style.animation = "blinkCursor 0.75s step-end infinite alternate";
    }
});

/**
 * 玻璃拟态风格的 Toast 提示
 */
function showGlassToast(message, duration = 2500) {
    const existing = document.querySelector('.custom-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerText = message;
    
    // 样式完全匹配你的 CSS 风格
    toast.style.cssText = `
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(12, 22, 35, 0.85); /* 深色半透明背景 */
        backdrop-filter: blur(12px);        /* 毛玻璃模糊 */
        -webkit-backdrop-filter: blur(12px);
        color: #ffde9c;                     /* 金色文字 */
        padding: 12px 24px;
        border-radius: 50px;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 1000;
        border: 1px solid rgba(255, 222, 156, 0.3); /* 金色边框 */
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: toastIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `;
    
    document.body.appendChild(toast);

    // 消失动画
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// 动态注入关键帧动画 (这样你不需要改 CSS 文件也能用)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes toastIn {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opa
