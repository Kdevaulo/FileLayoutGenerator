document.addEventListener('DOMContentLoaded', () => {
    const data = {
        fields: [
            { access: "Public", static: false, readonly: false, type: "Fields" },
            { access: "Public", static: false, readonly: true, type: "Fields" },
            { access: "Public", static: true, readonly: false, type: "Fields" },
            { access: "Public", static: true, readonly: true, type: "Fields" },
            { access: "Protected", static: false, readonly: false, type: "Fields" },
            { access: "Protected", static: false, readonly: true, type: "Fields" },
            { access: "Protected", static: true, readonly: false, type: "Fields" },
            { access: "Protected", static: true, readonly: true, type: "Fields" },
            { access: "Internal", static: false, readonly: false, type: "Fields" },
            { access: "Internal", static: false, readonly: true, type: "Fields" },
            { access: "Internal", static: true, readonly: false, type: "Fields" },
            { access: "Internal", static: true, readonly: true, type: "Fields" },
            { access: "Private", static: false, readonly: false, type: "Fields" },
            { access: "Private", static: false, readonly: true, type: "Fields" },
            { access: "Private", static: true, readonly: false, type: "Fields" },
            { access: "Private", static: true, readonly: true, type: "Fields" },
            { access: "Protected Internal", static: false, readonly: false, type: "Fields" },
            { access: "Protected Internal", static: false, readonly: true, type: "Fields" },
            { access: "Protected Internal", static: true, readonly: false, type: "Fields" },
            { access: "Protected Internal", static: true, readonly: true, type: "Fields" },
            { access: "Private Protected", static: false, readonly: false, type: "Fields" },
            { access: "Private Protected", static: false, readonly: true, type: "Fields" },
            { access: "Private Protected", static: true, readonly: false, type: "Fields" },
            { access: "Private Protected", static: true, readonly: true, type: "Fields" }
        ],
        properties: [
            { access: "Public", static: false, type: "Properties" },
            { access: "Public", static: true, type: "Properties" },
            { access: "Protected", static: false, type: "Properties" },
            { access: "Protected", static: true, type: "Properties" },
            { access: "Internal", static: false, type: "Properties" },
            { access: "Internal", static: true, type: "Properties" },
            { access: "Private", static: false, type: "Properties" },
            { access: "Private", static: true, type: "Properties" },
            { access: "Protected Internal", static: false, type: "Properties" },
            { access: "Protected Internal", static: true, type: "Properties" },
            { access: "Private Protected", static: false, type: "Properties" },
            { access: "Private Protected", static: true, type: "Properties" }
        ],
        methods: [
            { access: "Public", static: false, type: "Methods" },
            { access: "Public", static: true, type: "Methods" },
            { access: "Protected", static: false, type: "Methods" },
            { access: "Protected", static: true, type: "Methods" },
            { access: "Internal", static: false, type: "Methods" },
            { access: "Internal", static: true, type: "Methods" },
            { access: "Private", static: false, type: "Methods" },
            { access: "Private", static: true, type: "Methods" },
            { access: "Protected Internal", static: false, type: "Methods" },
            { access: "Protected Internal", static: true, type: "Methods" },
            { access: "Private Protected", static: false, type: "Methods" },
            { access: "Private Protected", static: true, type: "Methods" }
        ],
        constructors: [
            { access: "Public", static: false, type: "Constructors" },
            { access: "Protected", static: false, type: "Constructors" },
            { access: "Internal", static: false, type: "Constructors" },
            { access: "Private", static: false, type: "Constructors" }
        ],
        events: [
            { access: "Public", static: false, type: "Events" },
            { access: "Public", static: true, type: "Events" },
            { access: "Protected", static: false, type: "Events" },
            { access: "Protected", static: true, type: "Events" },
            { access: "Internal", static: false, type: "Events" },
            { access: "Internal", static: true, type: "Events" },
            { access: "Private", static: false, type: "Events" },
            { access: "Private", static: true, type: "Events" },
            { access: "Protected Internal", static: false, type: "Events" },
            { access: "Protected Internal", static: true, type: "Events" },
            { access: "Private Protected", static: false, type: "Events" },
            { access: "Private Protected", static: true, type: "Events" }
        ],
        nested: [
            { access: "Public", static: false, type: "Class" },
            { access: "Public", static: true, type: "Class" },
            { access: "Protected", static: false, type: "Class" },
            { access: "Protected", static: true, type: "Class" },
            { access: "Internal", static: false, type: "Class" },
            { access: "Internal", static: true, type: "Class" },
            { access: "Private", static: false, type: "Class" },
            { access: "Private", static: true, type: "Class" },
            { access: "Protected Internal", static: false, type: "Class" },
            { access: "Protected Internal", static: true, type: "Class" },
            { access: "Private Protected", static: false, type: "Class" },
            { access: "Private Protected", static: true, type: "Class" },
            
            { access: "Public", type: "Enum" },
            { access: "Protected", type: "Enum" },
            { access: "Internal", type: "Enum" },
            { access: "Private", type: "Enum" },
            { access: "Protected Internal", type: "Enum" },
            { access: "Private Protected", type: "Enum" },

            { access: "Public", type: "Interface" },
            { access: "Protected", type: "Interface" },
            { access: "Internal", type: "Interface" },
            { access: "Private", type: "Interface" },
            { access: "Protected Internal", type: "Interface" },
            { access: "Private Protected", type: "Interface" }
        ]
    };

    const itemsContainer = document.querySelector('.items-container');
    const itemsQueue = document.querySelector('.items-queue');
    const layoutText = document.querySelector('.layout-text');

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
                // Создание ID в новом порядке
                const itemID = [
                    item.access,
                    item.static ? 'static' : '',
                    item.readonly ? 'readonly' : '',
                    item.type.replace(/\s+/g, '-')
                ].filter(Boolean).join('-').toLowerCase();

                const pItem = document.createElement('p');
                pItem.id = `item-${itemID}`;
                pItem.setAttribute('draggable', 'true');
                pItem.setAttribute('data-group', category);
                pItem.setAttribute('data-kind', item.type);
                pItem.setAttribute('data-access', item.access);
                pItem.setAttribute('data-static', item.static ? 'true' : 'false');
                pItem.setAttribute('data-readonly', item.readonly ? 'true' : 'false');

                // Обновление строки в соответствии с новым порядком отображения
                const itemDescription = [
                    item.access,                         // Модификатор доступа
                    item.static ? 'Static' : '',         // Static
                    item.readonly ? 'Readonly' : '',     // Readonly
                    item.type                            // Type (Kind)
                ].filter(Boolean).join(' ');

                pItem.innerHTML = `<button class="move-btn">➔</button> ${itemDescription}`;
                groupDiv.appendChild(pItem);
            });

            container.appendChild(groupDiv);
        });
    }

    function updateQueueText() {
        const items = itemsQueue.querySelectorAll('p');
        const ids = Array.from(items).map(item => item.id).join(', ');
        layoutText.textContent = generateXMLLayout(items);
    }

    function generateXMLLayout(items) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<Patterns xmlns="urn:schemas-jetbrains-com:member-reordering-patterns">\n';

        items.forEach(item => {
            const isStatic = item.hasAttribute('data-static') && item.getAttribute('data-static') === 'true';
            const isReadonly = item.hasAttribute('data-readonly') && item.getAttribute('data-readonly') === 'true';

            xml += `  <Entry DisplayName="${item.textContent.trim()}">\n`;
            xml += '    <Entry.Match>\n';
            xml += `      <And>\n`;
            xml += `        <Kind Is="${item.getAttribute('data-kind')}"/>\n`;
            xml += `        <Access Is="${item.getAttribute('data-access')}"/>\n`;
            if (isStatic) {
                xml += '        <Static/>\n';
            }
            if (isReadonly) {
                xml += '        <Readonly/>\n';
            }
            xml += `      </And>\n`;
            xml += '    </Entry.Match>\n';
            xml += '    <Entry.SortBy>\n';
            xml += '      <Name/>\n';
            xml += '    </Entry.SortBy>\n';
            xml += '  </Entry>\n';
        });

        xml += '</Patterns>';
        return xml;
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
        updateQueueText();
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
        updateQueueText();
    }

    function handleDragLeave(e) {
        removeDragLine();
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        removeDragLine();
        updateQueueText();
    }

    function removeDragLine() {
        const line = document.querySelector('.drag-line');
        if (line) {
            line.remove();
        }
    }
});
