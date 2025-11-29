document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.header').addEventListener('click', function (e) {
        if (e.target.classList.contains('header') || e.target.closest('.header')) {
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
        }
    });
});


//js学的不是很好，后面这里折磨了很久，实在搞不定，上网学习了轮播的逻辑，然后小开了一下ai补全写的
//考核除了这里，其他都纯手搓，希望师兄师姐能放我一马[doge]

//讲AI融入各行业务环节的轮播图
document.addEventListener('DOMContentLoaded', function () {
    const slideTrack = document.querySelector('.slide-track');
    const prevBtn = document.querySelector('.content-container1-leftButton');
    const nextBtn = document.querySelector('.content-container1-rightButton');
    const cards = document.querySelectorAll('.content-container1-card');

    const originalCards = Array.from(cards);//获取原始卡片的Array
    const visibleCount = 3; // 后面克隆的裁切索引，从0到三，然后可以让图片无限循环
    //5张图片，然后最后一张图显示在最左边的时候，后面要补上最左边的四张图
    let currentIndex = 0;
    let isTransitioning = false;

    // 克隆首尾卡片
    const firstCards = originalCards.slice(0, visibleCount);//切
    const lastCards = originalCards.slice(-visibleCount);

    // 添加克隆卡片到DOM
    firstCards.forEach(card => {
        const clone = card.cloneNode(true);//深克隆DOM
        clone.classList.add('clone');
        slideTrack.appendChild(clone);//塞后面
    });

    // 在开头添加克隆的尾部卡片
    lastCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('clone');
        slideTrack.insertBefore(clone, slideTrack.firstChild);//插入到最前面
    });


    const allCards = document.querySelectorAll('.content-container1-card, .clone');
    const totalCards = allCards.length;
    const cardWidth = allCards[0].offsetWidth + 20; //offsetWidth测量元素实际的可见宽度,后面加的是gap



    // 更新轮播位置
    function updatePosition() {
        const translateX = -(currentIndex * cardWidth);//算上宽度和间隙的，计算移动X
        slideTrack.style.transform = `translateX(${translateX}px)`;
    }

    // 下一张
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex++;
        slideTrack.style.transition = 'transform 0.3s ease';
        updatePosition();

        // 检查是否需要跳转到开头
        setTimeout(() => {
            if (currentIndex >= totalCards - visibleCount) {
                slideTrack.style.transition = 'none';//让卡片在右边话过来，取消从左边回去的动画
                currentIndex = visibleCount;
                updatePosition();
            }
            isTransitioning = false;
        }, 300);

    }

    // 上一张
    function lastSlide() {

        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        slideTrack.style.transition = 'transform 0.3s ease';
        updatePosition();

        // 检查是否需要跳转到结尾
        setTimeout(() => {
            if (currentIndex < visibleCount) {
                slideTrack.style.transition = 'none';
                currentIndex = totalCards - visibleCount * 2;
                updatePosition();
            }
            isTransitioning = false;
            isTransitioning = false;
        }, 300);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', lastSlide);


}
);


//===========================================================
//跟着山羊学的导航栏，不过js语法全部改了一遍

// 等待页面完全加载完成后再执行
$(document).ready(function () {
    // 页面加载完成后，先设置默认选中的导航项样式
    setupInitialNavigation();

    // 为每个导航链接添加鼠标点击事件
    $('#content-nav a').on("click", function () {
        // 当用户点击某个导航链接时，更新滑块位置
        updateSlidePosition(this);
    });

    // 为每个导航链接添加鼠标移入事件
    $("#content-nav a").on("mouseover", function () {
        // 当鼠标悬停在导航链接上时，显示第二个滑块效果
        showHoverEffect(this);
    });

    // 为每个导航链接添加鼠标移出事件
    $("#content-nav a").on("mouseout", function () {
        // 当鼠标离开导航链接时，隐藏悬停效果
        hideHoverEffect(this);
    });
});

// 设置初始导航样式的方法
function setupInitialNavigation() {
    // 找到第4个li元素（也就是"明星产品"这一项，因为索引从0开始计数）
    var thirdNavItem = $("#content-nav li").eq(2);

    // 获取这个导航项的宽度和位置信息
    var itemWidth = thirdNavItem.width();
    var itemPosition = thirdNavItem.position();

    // 设置第一个滑块的初始位置和样式
    // 让它显示在"明星产品"这个导航项下方
    $("#content-nav-slide1").css({
        opacity: 1,         // 完全不透明
        left: itemPosition.left,   // 左边距对齐
        width: itemWidth    // 宽度一致
    });
}

// 更新滑块位置的方法（点击时调用）
function updateSlidePosition(navLinkElement) {
    // 获取被点击的导航链接的父元素（li标签）
    var parentListItem = $(navLinkElement).parent();

    // 获取父元素的位置和宽度信息
    var position = parentListItem.position();
    var width = parentListItem.width();

    // 移动第一个滑块到被点击的导航项位置
    $("#content-nav-slide1").css({
        opacity: 1,
        left: position.left,
        width: width
    });
}

// 显示悬停效果的方法（鼠标移入时调用）
function showHoverEffect(navLinkElement) {
    // 获取鼠标悬停的导航链接的父元素
    var parentListItem = $(navLinkElement).parent();

    // 获取父元素的位置和宽度
    var position = parentListItem.position();
    var width = parentListItem.width();

    // 设置第二个滑块的位置和样式
    $("#content-nav-slide2").css({
        opacity: 1,         // 显示滑块
        left: position.left,       // 对齐位置
        width: width        // 宽度一致
    });

    // 移除squeeze类，恢复正常大小
    $("#content-nav-slide2").removeClass("squeeze");
}

// 隐藏悬停效果的方法
function hideHoverEffect(navLinkElement) {
    // 获取鼠标离开的导航链接的父元素
    var parentListItem = $(navLinkElement).parent();

    // 获取父元素的位置和宽度
    var position = parentListItem.position();
    var width = parentListItem.width();

    // 设置第二个滑块的隐藏样式
    $("#content-nav-slide2").css({
        opacity: 0,         // 完全透明，隐藏滑块
        left: position.left,       // 保持位置
        width: width        // 保持宽度
    });

    // 添加squeeze类，让滑块缩小
    $("#content-nav-slide2").addClass("squeeze");
}