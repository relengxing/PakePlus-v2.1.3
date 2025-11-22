// 导航栏功能脚本
(function() {
    'use strict';

    // ============================================
    // 功能开关配置 - 修改这里控制各功能的显示/隐藏
    // ============================================
    const NAVIGATION_ENABLED = true;    // 导航栏开关
    const TIMER_ENABLED = true;          // 倒计时工具开关
    const SECTION_NAV_ENABLED = true;    // Section左右导航按键开关
    // ============================================

    // 如果所有功能都被禁用，直接返回
    if (!NAVIGATION_ENABLED && !TIMER_ENABLED && !SECTION_NAV_ENABLED) {
        return;
    }

    // 页面配置
    const pages = [
        {
            url: '0.封面页.html',
            title: '封面页',
            icon: '📄',
            desc: '课件封面与课程信息'
        },
        { 
            url: '1.目录页.html',
            title: '目录页', 
            icon: '📚',
            desc: '返回课件目录'
        },
        {
            url: '2.火车过隧道.html', 
            title: '火车过隧道', 
            icon: '🚂',
            desc: '通过动画演示理解火车过隧道问题'
        },
        { 
            url: '3.环形道路相遇问题.html', 
            title: '环形道路相遇问题', 
            icon: '🏃',
            desc: '学习环形跑道中的相遇与追及问题'
        },
        { 
            url: '4.上下坡问题.html', 
            title: '上下坡问题', 
            icon: '⛰️',
            desc: '分析上下坡过程中的速度变化'
        },
        { 
            url: '5.随堂练习-选择题.html', 
            title: '随堂练习 - 选择题', 
            icon: '✅',
            desc: '通过选择题巩固所学知识'
        },
        { 
            url: '6.随堂练习-填空题.html', 
            title: '随堂练习 - 填空题', 
            icon: '✏️',
            desc: '填空题练习，检验理解程度'
        },
        { 
            url: '7.随堂练习-应用题.html', 
            title: '随堂练习 - 应用题', 
            icon: '📝',
            desc: '综合应用题，提升解题能力'
        },
        {
            url: '8.课后作业.html',
            title: '课后作业',
            icon: '📋',
            desc: '课后练习题目，巩固所学知识'
        }
    ];

    // 获取当前页面文件名（不包含查询参数和锚点，自动处理URL编码）
    function getCurrentPage() {
        // 优先使用 pathname
        let path = window.location.pathname;
        let filename = path.split('/').pop() || path.split('\\').pop();
        
        // 如果 pathname 为空（可能是 file:// 协议），尝试使用 href
        if (!filename || filename === '') {
            const href = window.location.href;
            // 处理 file:// 协议
            if (href.startsWith('file://')) {
                filename = href.split('/').pop() || href.split('\\').pop();
            } else {
                // 处理 http:// 或 https:// 协议
                filename = href.split('/').pop();
            }
        }
        
        // 移除查询参数和锚点
        filename = filename.split('?')[0].split('#')[0];
        
        // 解码URL编码（处理中文文件名等）
        try {
            filename = decodeURIComponent(filename);
        } catch (e) {
            // 如果解码失败，使用原始文件名
            console.warn('URL解码失败，使用原始文件名:', filename);
        }
        
        return filename || '1.目录页.html';
    }

    // 创建导航栏HTML
    function createNavigationHTML() {
        const currentPage = getCurrentPage();
        
        let menuHTML = '<div class="nav-menu">';
        
        pages.forEach(page => {
            const isActive = page.url === currentPage ? 'active' : '';
            menuHTML += `
                <a href="${page.url}" class="nav-menu-item ${isActive}">
                    <span class="nav-menu-item-icon">${page.icon}</span>
                    <span class="nav-menu-item-text">${page.title}</span>
                    <div class="nav-menu-item-desc">${page.desc}</div>
                </a>
            `;
        });
        
        menuHTML += '</div>';
        
        return `
            <div class="nav-overlay" id="navOverlay"></div>
            <div class="nav-container" id="navContainer">
                <button class="nav-close-btn" id="navCloseBtn">×</button>
                <div class="nav-header">
                    <h2>📚 课件导航</h2>
                    <p>快速跳转到任意页面</p>
                </div>
                ${menuHTML}
                <div class="nav-footer">
                    <p>按 ESC 键关闭导航</p>
                    <p style="margin-top: 5px; font-size: 0.85rem;">海旺学校 数学教研组</p>
                </div>
            </div>
            <button class="nav-toggle-btn" id="navToggleBtn" title="显示/隐藏导航 (ESC)">☰</button>
        `;
    }

    // 初始化导航栏
    function initNavigation() {
        // 检查是否已存在导航栏
        if (document.getElementById('navContainer')) {
            return;
        }

        // 创建导航栏
        const navHTML = createNavigationHTML();
        document.body.insertAdjacentHTML('beforeend', navHTML);

        // 获取元素
        const navOverlay = document.getElementById('navOverlay');
        const navContainer = document.getElementById('navContainer');
        const navToggleBtn = document.getElementById('navToggleBtn');
        const navCloseBtn = document.getElementById('navCloseBtn');

        // 切换导航栏显示/隐藏
        function toggleNav() {
            const isShowing = navContainer.classList.contains('show');
            if (isShowing) {
                hideNav();
            } else {
                showNav();
            }
        }

        // 显示导航栏
        function showNav() {
            navOverlay.classList.add('show');
            navContainer.classList.add('show');
            navToggleBtn.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }

        // 隐藏导航栏
        function hideNav() {
            navOverlay.classList.remove('show');
            navContainer.classList.remove('show');
            navToggleBtn.classList.remove('active');
            document.body.style.overflow = ''; // 恢复滚动
        }

        // 绑定事件
        navToggleBtn.addEventListener('click', toggleNav);
        navCloseBtn.addEventListener('click', hideNav);
        navOverlay.addEventListener('click', hideNav);

        // ESC键关闭导航栏
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                hideNav();
            }
        });

        // 点击导航菜单项后关闭导航栏（移动端体验优化）
        const navMenuItems = document.querySelectorAll('.nav-menu-item');
        navMenuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 如果是当前页面，不跳转，只关闭导航栏
                if (this.classList.contains('active')) {
                    e.preventDefault();
                    hideNav();
                } else {
                    // 延迟关闭，让跳转动画更流畅
                    setTimeout(hideNav, 200);
                }
            });
        });
    }

    // ============================================
    // 倒计时工具（通过meta标签控制显示）
    // ============================================
    function initTimer() {
        if (!TIMER_ENABLED) return;

        // 检查页面是否有启用计时器的meta标签
        // 格式：<meta name="enable-timer" content="true" data-duration="300">
        const timerMeta = document.querySelector('meta[name="enable-timer"]');
        const isTimerEnabled = timerMeta && 
                              (timerMeta.getAttribute('content') === 'true' || 
                               timerMeta.getAttribute('content') === '1');
        
        if (!isTimerEnabled) {
            return;
        }

        // 检查是否已存在计时器
        if (document.getElementById('globalTimer')) {
            return;
        }

        // 从meta标签读取倒计时时长（秒），默认300秒（5分钟）
        const duration = parseInt(timerMeta.getAttribute('data-duration')) || 300;
        const totalSeconds = duration;

        // 创建计时器HTML
        const timerHTML = `
            <div class="global-timer" id="globalTimer" title="点击开始倒计时，再次点击重置">
                <span class="timer-icon">⏱️</span>
                <span class="timer-text" id="timerText">${Math.floor(totalSeconds / 60).toString().padStart(2, '0')}:${(totalSeconds % 60).toString().padStart(2, '0')}</span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', timerHTML);

        const timerElement = document.getElementById('globalTimer');
        const timerText = document.getElementById('timerText');
        
        let remainingSeconds = totalSeconds;
        let timerInterval = null;
        let isRunning = false;

        function updateTimer() {
            if (remainingSeconds <= 0) {
                // 倒计时结束
                clearInterval(timerInterval);
                timerInterval = null;
                isRunning = false;
                timerElement.classList.remove('running');
                timerElement.classList.add('finished');
                timerText.textContent = '00:00';
                return;
            }

            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            remainingSeconds--;
        }

        function startTimer() {
            if (remainingSeconds <= 0) {
                remainingSeconds = totalSeconds;
            }
            isRunning = true;
            timerElement.classList.add('running');
            timerElement.classList.remove('not-started');
            timerElement.classList.remove('finished');
            timerInterval = setInterval(updateTimer, 1000);
            updateTimer();
        }

        function resetTimer() {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
            remainingSeconds = totalSeconds;
            isRunning = false;
            timerElement.classList.remove('running');
            timerElement.classList.remove('finished');
            timerElement.classList.add('not-started');
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // 点击切换：未开始→开始，运行中→重置
        timerElement.addEventListener('click', function() {
            if (!isRunning) {
                startTimer();
            } else {
                resetTimer();
            }
        });

        // 初始状态
        timerElement.classList.add('not-started');
    }

    // ============================================
    // Section导航按键
    // ============================================
    function initSectionNavigation() {
        if (!SECTION_NAV_ENABLED) return;

        // 检查是否已存在导航按键
        if (document.getElementById('sectionNavLeft')) {
            return;
        }

        // 创建导航按键HTML
        const navButtonsHTML = `
            <button class="section-nav-btn section-nav-left" id="sectionNavLeft" title="上一页/上一部分 (←)">
                ‹
            </button>
            <button class="section-nav-btn section-nav-right" id="sectionNavRight" title="下一页/下一部分 (→)">
                ›
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', navButtonsHTML);

        const leftBtn = document.getElementById('sectionNavLeft');
        const rightBtn = document.getElementById('sectionNavRight');

        // 获取所有section
        const sections = Array.from(document.querySelectorAll('section[data-section]'));
        
        // 获取当前可见的section
        function getCurrentSection() {
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollPos;
                
                if (scrollPos >= sectionTop - windowHeight / 3) {
                    return i;
                }
            }
            return 0;
        }

        // 平滑滚动到指定section
        function scrollToSection(index) {
            if (index >= 0 && index < sections.length) {
                sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // 获取当前页面的索引（支持URL编码的文件名）
        function getCurrentPageIndex() {
            const currentPage = getCurrentPage(); // 已经解码过了，应该是 "2.火车过隧道.html"
            
            // 直接匹配（pages数组中的URL是未编码的，如 "2.火车过隧道.html"）
            let index = pages.findIndex(page => page.url === currentPage);
            
            // 如果没找到，可能是文件名不完全匹配，尝试更灵活的匹配
            if (index === -1) {
                // 提取文件名的主要部分（去掉路径分隔符等）
                const currentPageName = currentPage.split('/').pop().split('\\').pop();
                index = pages.findIndex(page => {
                    const pageName = page.url.split('/').pop().split('\\').pop();
                    return pageName === currentPageName;
                });
            }
            
            return index;
        }

        // 导航到下一个section或下一页
        function navigateNext() {
            const currentSectionIndex = getCurrentSection();
            
            if (currentSectionIndex < sections.length - 1) {
                // 如果不是最后一个section，滚动到下一个section
                scrollToSection(currentSectionIndex + 1);
            } else {
                // 如果是最后一个section，跳转到下一个课件的第一个section
                const currentPageIndex = getCurrentPageIndex();
                if (currentPageIndex >= 0 && currentPageIndex < pages.length - 1) {
                    // 使用URL参数标记要跳转到第一个section
                    const nextPageUrl = pages[currentPageIndex + 1].url + '?section=0';
                    window.location.href = nextPageUrl;
                }
            }
        }

        // 导航到上一个section或上一页
        function navigatePrev() {
            const currentSectionIndex = getCurrentSection();
            
            if (currentSectionIndex > 0) {
                // 如果不是第一个section，滚动到上一个section
                scrollToSection(currentSectionIndex - 1);
            } else {
                // 如果是第一个section，跳转到上一个课件的最后一个section
                const currentPageIndex = getCurrentPageIndex();
                if (currentPageIndex > 0) {
                    // 使用URL参数标记要跳转到最后一个section
                    const prevPageUrl = pages[currentPageIndex - 1].url + '?section=last';
                    window.location.href = prevPageUrl;
                }
            }
        }

        // 更新按钮状态
        function updateButtonStates() {
            const currentSectionIndex = getCurrentSection();
            const currentPageIndex = getCurrentPageIndex();

            // 左按钮：第一页的第一个section时禁用
            if (currentPageIndex === 0 && currentSectionIndex === 0) {
                leftBtn.classList.add('disabled');
            } else {
                leftBtn.classList.remove('disabled');
            }

            // 右按钮：最后一页的最后一个section时禁用
            if (currentPageIndex === pages.length - 1 && currentSectionIndex === sections.length - 1) {
                rightBtn.classList.add('disabled');
            } else {
                rightBtn.classList.remove('disabled');
            }
        }

        // 绑定点击事件
        leftBtn.addEventListener('click', navigatePrev);
        rightBtn.addEventListener('click', navigateNext);

        // 键盘导航
        document.addEventListener('keydown', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return; // 在输入框中不响应键盘导航
            }

            if (e.key === 'ArrowLeft' || e.keyCode === 37) {
                e.preventDefault();
                navigatePrev();
            } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
                e.preventDefault();
                navigateNext();
            }
        });

        // 监听滚动，更新按钮状态
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateButtonStates, 100);
        });

        // 初始更新按钮状态
        updateButtonStates();

        // 页面加载时检查URL参数，自动滚动到目标section
        function handleSectionNavigation() {
            const urlParams = new URLSearchParams(window.location.search);
            const targetSection = urlParams.get('section');
            
            if (targetSection === null) {
                return; // 没有section参数，不处理
            }

            // 滚动到目标section
            function scrollToTargetSection(target) {
                // 重新获取sections，确保获取到最新的
                const currentSections = Array.from(document.querySelectorAll('section[data-section]'));
                if (currentSections.length === 0) {
                    // 如果还没有sections，延迟重试
                    setTimeout(function() {
                        scrollToTargetSection(target);
                    }, 100);
                    return;
                }

                let targetIndex;
                if (target === 'last') {
                    // 滚动到最后一个section
                    targetIndex = currentSections.length - 1;
                } else {
                    // 滚动到指定索引的section（默认第一个）
                    targetIndex = parseInt(target) || 0;
                    if (targetIndex < 0) targetIndex = 0;
                    if (targetIndex >= currentSections.length) targetIndex = currentSections.length - 1;
                }

                if (targetIndex >= 0 && targetIndex < currentSections.length) {
                    // 延迟一点确保页面完全渲染
                    setTimeout(function() {
                        currentSections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
                        
                        // 清除URL参数，保持URL干净
                        if (window.history && window.history.replaceState) {
                            const cleanUrl = window.location.pathname + window.location.hash;
                            window.history.replaceState({}, document.title, cleanUrl);
                        }
                    }, 200);
                }
            }

            // 等待页面完全加载后再滚动
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    scrollToTargetSection(targetSection);
                });
            } else {
                // 页面已加载，延迟一点确保所有元素都已渲染
                setTimeout(function() {
                    scrollToTargetSection(targetSection);
                }, 100);
            }
        }

        // 执行自动导航
        handleSectionNavigation();
    }

    // ============================================
    // 页码显示功能
    // ============================================
    function initPageNumber() {
        // 检查是否已存在页码
        if (document.getElementById('pageNumber')) {
            return;
        }

        // 定义所有页面的section数量（按页面顺序）
        const pageSectionCounts = [
            1,  // 0.封面页.html
            0,  // 1.目录页.html
            7,  // 2.火车过隧道.html
            5,  // 3.环形道路相遇问题.html
            4,  // 4.上下坡问题.html
            2,  // 5.随堂练习-选择题.html
            4,  // 6.随堂练习-填空题.html
            6,  // 7.随堂练习-应用题.html
            4   // 8.课后作业.html
        ];

        // 计算总section数
        const totalSections = pageSectionCounts.reduce((sum, count) => sum + count, 0);

        // 获取当前页面索引
        function getCurrentPageIndex() {
            const currentPage = getCurrentPage();
            let index = pages.findIndex(page => page.url === currentPage);
            if (index === -1) {
                const currentPageName = currentPage.split('/').pop().split('\\').pop();
                index = pages.findIndex(page => {
                    const pageName = page.url.split('/').pop().split('\\').pop();
                    return pageName === currentPageName;
                });
            }
            return index;
        }

        // 获取当前section在所有section中的序号（从1开始）
        function getCurrentSectionNumber() {
            const currentPageIndex = getCurrentPageIndex();
            if (currentPageIndex < 0 || currentPageIndex >= pageSectionCounts.length) {
                return 1;
            }

            // 计算前面所有页面的section总数
            let previousSections = 0;
            for (let i = 0; i < currentPageIndex; i++) {
                previousSections += pageSectionCounts[i];
            }

            // 获取当前页面的section索引
            const sections = Array.from(document.querySelectorAll('section[data-section]'));
            if (sections.length === 0) {
                return previousSections + 1;
            }

            // 获取当前可见的section
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            let currentSectionIndex = 0;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollPos;
                
                if (scrollPos >= sectionTop - windowHeight / 3) {
                    currentSectionIndex = i;
                    break;
                }
            }

            // 计算当前section在所有section中的序号
            // 直接使用section在页面中的索引（按DOM顺序）
            return previousSections + currentSectionIndex + 1;
        }

        // 创建页码HTML
        const pageNumberHTML = `
            <div class="page-number" id="pageNumber">
                <span id="pageNumberText">1</span> / <span id="pageNumberTotal">${totalSections}</span>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', pageNumberHTML);

        const pageNumberElement = document.getElementById('pageNumber');
        const pageNumberText = document.getElementById('pageNumberText');
        const pageNumberTotal = document.getElementById('pageNumberTotal');

        // 更新页码
        function updatePageNumber() {
            const currentNumber = getCurrentSectionNumber();
            pageNumberText.textContent = currentNumber;
            pageNumberTotal.textContent = totalSections;
        }

        // 监听滚动事件更新页码
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updatePageNumber, 100);
        });

        // 初始更新
        updatePageNumber();
    }

    // ============================================
    // 页面加载完成后初始化所有功能
    // ============================================
    function initAll() {
        if (NAVIGATION_ENABLED) {
            initNavigation();
        }
        if (TIMER_ENABLED) {
            initTimer();
        }
        if (SECTION_NAV_ENABLED) {
            initSectionNavigation();
        }
        // 页码功能始终启用
        initPageNumber();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();

