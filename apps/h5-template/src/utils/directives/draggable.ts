import type { Directive } from 'vue';

interface ElType extends HTMLElement {
    parentNode: HTMLElement;
}

/**
 * 拖动指令
 * 该指令用于拖动元素
 * v-drag （设置需要拖拽的元素为absolute，其父元素为relative）
 * <button v-drag>拖动我</button>
 */
const draggable: Directive = {
    mounted: function (el: ElType) {
        el.style.cursor = 'move';
        el.style.position = 'absolute';

        function startDrag(e: MouseEvent | TouchEvent, isTouch: boolean) {
            const startX = isTouch ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX;
            const startY = isTouch ? (e as TouchEvent).touches[0].pageY : (e as MouseEvent).pageY;
            const disX = startX - el.offsetLeft;
            const disY = startY - el.offsetTop;

            // 用于判断是点击还是拖拽
            let isDragging = false;
            const dragThreshold = 5; // 5px的拖动阈值

            function move(e: MouseEvent | TouchEvent) {
                const x = isTouch ? (e as TouchEvent).touches[0].pageX : (e as MouseEvent).pageX;
                const y = isTouch ? (e as TouchEvent).touches[0].pageY : (e as MouseEvent).pageY;

                // 计算移动距离
                const moveX = Math.abs(x - startX);
                const moveY = Math.abs(y - startY);

                // 只有当移动距离超过阈值时才认为是拖拽
                if (!isDragging && (moveX > dragThreshold || moveY > dragThreshold)) {
                    isDragging = true;
                    e.preventDefault(); // 只在确认是拖拽时才阻止默认行为

                    // 阻止父容器滚动
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                }

                if (isDragging) {
                    // 阻止父容器滚动
                    if (e.cancelable) {
                        e.preventDefault();
                    }

                    let newX = x - disX;
                    let newY = y - disY;
                    const maxX = el.parentNode.offsetWidth - el.offsetWidth;
                    const maxY = el.parentNode.offsetHeight - el.offsetHeight;

                    if (newX < 0) {
                        newX = 0;
                    } else if (newX > maxX) {
                        newX = maxX;
                    }

                    if (newY < 0) {
                        newY = 0;
                    } else if (newY > maxY) {
                        newY = maxY;
                    }

                    requestAnimationFrame(() => {
                        el.style.left = newX + 'px';
                        el.style.top = newY + 'px';
                    });
                }
            }

            function endDrag(e: MouseEvent | TouchEvent) {
                document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', move);
                document.removeEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);

                // 如果是点击而非拖拽，则触发元素的点击事件
                if (!isDragging && (e.target as HTMLElement).click) {
                    (e.target as HTMLElement).click();
                }
            }

            // 阻止父容器滚动
            document.addEventListener(isTouch ? 'touchmove' : 'mousemove', move, { passive: false });
            document.addEventListener(isTouch ? 'touchend' : 'mouseup', endDrag);
        }

        el.addEventListener('touchstart', e => startDrag(e, true));
        el.addEventListener('mousedown', e => startDrag(e, false));
    },
};

export default draggable;
