document.addEventListener('DOMContentLoaded', () => {
    const animList = [
        'dot-elastic',
        'dot-pulse',
        'dot-flashing',
        'dot-collision',
        'dot-revolution',
        'dot-carousel',
        'dot-typing',
        'dot-windmill',
        'dot-bricks',
        'dot-floating',
        'dot-fire',
        'dot-spin',
        'dot-falling',
        'dot-stretching',
        'dot-gathering',
        'dot-hourglass',
        'dot-overtaking',
        'dot-shuttle',
        'dot-bouncing',
        'dot-rolling',
    ];

    const loadingContainer = document.getElementById('loadingContainer');

    // 使用 fetch 动态加载当前目录下 loading.html 的内容
    fetch('./loading/loading.html')
        .then(response => response.text())
        .then(htmlContent => {
            // 将加载的 HTML 内容插入到 loadingContainer 中
            loadingContainer.innerHTML = htmlContent;

            const dotElement = document.querySelector('.snippet .dot-bricks');

            if (dotElement) {
                // 随机选择一个类名
                const randomClass = animList[Math.floor(Math.random() * animList.length)];
                // 移除当前类，添加随机选择的类
                dotElement.className = randomClass;
            }
        })
        .catch(error => {
            console.error('Error loading loading.html:', error);
        });
});
