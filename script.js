document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.items-container');
    const itemsQueue = document.querySelector('.items-queue');

    itemsContainer.addEventListener('click', moveItem);
    itemsQueue.addEventListener('click', moveItem);

    itemsQueue.addEventListener('dragstart', handleDragStart);
    itemsQueue.addEventListener('dragover', handleDragOver);
    itemsQueue.addEventListener('drop', handleDrop);
    itemsQueue.addEventListener('dragleave', handleDragLeave);
    itemsQueue.addEventListener('dragend', handleDragEnd);

    function moveItem(e) {
        const target = e.target.closest('p');
        if (!target) return;

        const currentContainer = target.closest('.items-queue') ? itemsQueue : itemsContainer;
        let destinationContainer;

        if (currentContainer === itemsQueue) {
            // Возвращает элемент в его исходную группу в items-container
            const groupID = target.getAttribute('data-group');
            destinationContainer = document.getElementById(groupID);
        } else {
            // Перемещает элемент в items-queue
            destinationContainer = itemsQueue;
        }

        destinationContainer.appendChild(target);
        target.setAttribute('draggable', destinationContainer === itemsQueue);
    }

    function handleDragStart(e) {
        if (!e.target.closest('p') || !e.target.closest('.items-queue')) return;
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (!e.target.closest('.items-queue')) return;
        const target = e.target.closest('p');
        if (!target) return;

        let line = document.querySelector('.drag-line');
        if (!line) {
            line = document.createElement('div');
            line.className = 'drag-line';
            e.target.appendChild(line);
        }

        const targetRect = target.getBoundingClientRect();
        const midPoint = targetRect.top + (targetRect.height / 2);
        if (e.clientY < midPoint) {
            target.before(line);
        } else {
            target.after(line);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        if (!draggedElement || !draggedElement.classList.contains('dragging')) return;

        const line = document.querySelector('.drag-line');
        if (line) {
            line.replaceWith(draggedElement);
            draggedElement.setAttribute('draggable', true); // Устанавливает draggable на true только для items-queue
        }
        draggedElement.classList.remove('dragging');
        removeDragLine();
    }

    function handleDragLeave(e) {
        removeDragLine();
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        removeDragLine();
    }

    function removeDragLine() {
        const line = document.querySelector('.drag-line');
        if (line) {
            line.remove();
        }
    }
});