document.addEventListener('DOMContentLoaded', () => {
    const data = {
        fields: [
            "Public Fields", "Public Readonly Fields", "Public Static Fields",
            "Public Static Readonly Fields", "Protected Fields", "Protected Readonly Fields",
            "Protected Static Fields", "Protected Static Readonly Fields", "Internal Fields",
            "Internal Readonly Fields", "Internal Static Fields", "Internal Static Readonly Fields",
            "Protected Internal Fields", "Protected Internal Readonly Fields",
            "Protected Internal Static Fields", "Protected Internal Static Readonly Fields",
            "Private Fields", "Private Readonly Fields", "Private Static Fields",
            "Private Static Readonly Fields", "Private Protected Fields", "Private Protected Readonly Fields",
            "Private Protected Static Fields", "Private Protected Static Readonly Fields"
        ],
        properties: [
            "Public Properties", "Public Static Properties", "Protected Properties",
            "Protected Static Properties", "Internal Properties", "Internal Static Properties",
            "Protected Internal Properties", "Protected Internal Static Properties", "Private Properties",
            "Private Static Properties", "Private Protected Properties", "Private Protected Static Properties"
        ],
        methods: [
            "Public Methods", "Public Static Methods", "Protected Methods", "Protected Static Methods",
            "Internal Methods", "Internal Static Methods", "Protected Internal Methods",
            "Protected Internal Static Methods", "Private Methods", "Private Static Methods",
            "Private Protected Methods", "Private Protected Static Methods"
        ],
        constructors: [
            "Public Constructors", "Static Constructors", "Protected Constructors",
            "Internal Constructors", "Protected Internal Constructors", "Private Constructors",
            "Private Protected Constructors"
        ],
        events: [
            "Public Events", "Public Static Events", "Protected Events", "Protected Static Events",
            "Internal Events", "Internal Static Events", "Protected Internal Events",
            "Protected Internal Static Events", "Private Events", "Private Static Events",
            "Private Protected Events", "Private Protected Static Events"
        ],
        delegates: [
            "Public Delegate", "Protected Delegate", "Internal Delegate",
            "Protected Internal Delegate", "Private Delegate", "Private Protected Delegate"
        ],
        nested: [
            "Public Class", "Protected Class", "Internal Class",
            "Protected Internal Class", "Private Class", "Private Protected Class",
            "Public Interface", "Protected Interface", "Internal Interface",
            "Protected Internal Interface", "Private Interface", "Private Protected Interface",
            "Public Enum", "Protected Enum", "Internal Enum",
            "Protected Internal Enum", "Private Enum", "Private Protected Enum"
        ]
    };

    const itemsContainer = document.querySelector('.items-container');
    const itemsQueue = document.querySelector('.items-queue');

    itemsContainer.addEventListener('click', moveItem);
    itemsQueue.addEventListener('click', moveItem);

    itemsQueue.addEventListener('dragstart', handleDragStart);
    itemsQueue.addEventListener('dragover', handleDragOver);
    itemsQueue.addEventListener('drop', handleDrop);
    itemsQueue.addEventListener('dragleave', handleDragLeave);
    itemsQueue.addEventListener('dragend', handleDragEnd);

    generateItems();

    function generateItems() {
        const container = document.querySelector('.items-container');
        Object.keys(data).forEach(category => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            groupDiv.id = category;

            const title = document.createElement('h3');
            title.textContent = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase().replace(/_/g, ' ');
            groupDiv.appendChild(title);

            data[category].forEach(item => {
                const pItem = document.createElement('p');
                pItem.id = `item-${item.replace(/\s+/g, '-')}`;
                pItem.setAttribute('draggable', 'true');
                pItem.setAttribute('data-group', category);
                pItem.innerHTML = `<button class="move-btn">➔</button> ${item}`;
                groupDiv.appendChild(pItem);
            });

            container.appendChild(groupDiv);
        });
    }

    function moveItem(e) {
        const target = e.target.closest('p');
        if (!target) return;

        const currentContainer = target.closest('.items-queue') ? itemsQueue : itemsContainer;
        let destinationContainer;

        if (currentContainer === itemsQueue) {
            const groupID = target.getAttribute('data-group');
            destinationContainer = document.getElementById(groupID);
        } else {
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
            draggedElement.setAttribute('draggable', true);
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

