document.addEventListener('DOMContentLoaded', () => {
    const data = {
        events: [
            {access: "Public", static: true, type: "Event"},
            {access: "Public", static: false, type: "Event"},

            {access: "ProtectedInternal", static: true, type: "Event"},
            {access: "ProtectedInternal", static: false, type: "Event"},

            {access: "Protected", static: true, type: "Event"},
            {access: "Protected", static: false, type: "Event"},

            {access: "Internal", static: true, type: "Event"},
            {access: "Internal", static: false, type: "Event"},

            {access: "PrivateProtected", static: true, type: "Event"},
            {access: "PrivateProtected", static: false, type: "Event"},

            {access: "Private", static: true, type: "Event"},
            {access: "Private", static: false, type: "Event"},
        ],
        properties: [
            {access: "Public", static: true, type: "Property"},
            {access: "Public", static: false, type: "Property"},

            {access: "ProtectedInternal", static: true, type: "Property"},
            {access: "ProtectedInternal", static: false, type: "Property"},

            {access: "Protected", static: true, type: "Property"},
            {access: "Protected", static: false, type: "Property"},

            {access: "Internal", static: true, type: "Property"},
            {access: "Internal", static: false, type: "Property"},

            {access: "PrivateProtected", static: true, type: "Property"},
            {access: "PrivateProtected", static: false, type: "Property"},

            {access: "Private", static: true, type: "Property"},
            {access: "Private", static: false, type: "Property"},
        ],
        fields: [
            {access: "Public", static: true, readonly: true, type: "Field"},
            {access: "Public", static: false, readonly: true, type: "Field"},
            {access: "Public", static: true, readonly: false, type: "Field"},
            {access: "Public", static: false, readonly: false, type: "Field"},

            {access: "ProtectedInternal", static: true, readonly: true, type: "Field"},
            {access: "ProtectedInternal", static: false, readonly: true, type: "Field"},
            {access: "ProtectedInternal", static: true, readonly: false, type: "Field"},
            {access: "ProtectedInternal", static: false, readonly: false, type: "Field"},

            {access: "Protected", static: true, readonly: true, type: "Field"},
            {access: "Protected", static: false, readonly: true, type: "Field"},
            {access: "Protected", static: true, readonly: false, type: "Field"},
            {access: "Protected", static: false, readonly: false, type: "Field"},

            {access: "Internal", static: true, readonly: true, type: "Field"},
            {access: "Internal", static: false, readonly: true, type: "Field"},
            {access: "Internal", static: true, readonly: false, type: "Field"},
            {access: "Internal", static: false, readonly: false, type: "Field"},

            {access: "PrivateProtected", static: true, readonly: true, type: "Field"},
            {access: "PrivateProtected", static: false, readonly: true, type: "Field"},
            {access: "PrivateProtected", static: true, readonly: false, type: "Field"},
            {access: "PrivateProtected", static: false, readonly: false, type: "Field"},

            {access: "Private", static: true, readonly: true, type: "Field"},
            {access: "Private", static: false, readonly: true, type: "Field"},
            {access: "Private", static: true, readonly: false, type: "Field"},
            {access: "Private", static: false, readonly: false, type: "Field"},
        ],
        constructors: [
            {access: "Public", static: false, type: "Constructor"},
            {access: "Protected", static: false, type: "Constructor"},
            {access: "Internal", static: false, type: "Constructor"},
            {access: "Private", static: false, type: "Constructor"}
        ],
        methods: [
            {access: "Public", static: true, type: "Method"},
            {access: "Public", static: false, type: "Method"},

            {access: "ProtectedInternal", static: true, type: "Method"},
            {access: "ProtectedInternal", static: false, type: "Method"},
  
            {access: "Protected", static: true, type: "Method"},
            {access: "Protected", static: false, type: "Method"},

            {access: "Internal", static: true, type: "Method"},
            {access: "Internal", static: false, type: "Method"},

            {access: "PrivateProtected", static: true, type: "Method"},
            {access: "PrivateProtected", static: false, type: "Method"},

            {access: "Private", static: true, type: "Method"},
            {access: "Private", static: false, type: "Method"},
        ],
        nested: [
            {access: "Public", type: "Interface"},
            {access: "ProtectedInternal", type: "Interface"},
            {access: "Protected", type: "Interface"},
            {access: "Internal", type: "Interface"},
            {access: "PrivateProtected", type: "Interface"},
            {access: "Private", type: "Interface"},

            {access: "Public", static: true, type: "Class"},
            {access: "Public", static: false, type: "Class"},

            {access: "ProtectedInternal", static: true, type: "Class"},
            {access: "ProtectedInternal", static: false, type: "Class"},

            {access: "Protected", static: true, type: "Class"},
            {access: "Protected", static: false, type: "Class"},

            {access: "Internal", static: true, type: "Class"},
            {access: "Internal", static: false, type: "Class"},

            {access: "PrivateProtected", static: true, type: "Class"},
            {access: "PrivateProtected", static: false, type: "Class"},

            {access: "Private", static: true, type: "Class"},
            {access: "Private", static: false, type: "Class"},

            {access: "Public", type: "Enum"},
            {access: "ProtectedInternal", type: "Enum"},
            {access: "Protected", type: "Enum"},
            {access: "Internal", type: "Enum"},
            {access: "PrivateProtected", type: "Enum"},
            {access: "Private", type: "Enum"},
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
                const itemID = [
                    item.access,
                    item.readonly ? 'readonly' : '',
                    item.static ? 'static' : '',
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

                const itemDescription = [
                    item.access,
                    item.readonly ? 'Readonly' : '',
                    item.static ? 'Static' : '',
                    item.type
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
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\r\n';
        xml += '<Patterns xmlns="urn:schemas-jetbrains-com:member-reordering-patterns">\r\n';
        xml += '<TypePattern DisplayName="All">\r\n';

        items.forEach(item => {
            const isStatic = item.hasAttribute('data-static') && item.getAttribute('data-static') === 'true';
            const isReadonly = item.hasAttribute('data-readonly') && item.getAttribute('data-readonly') === 'true';
            const displayName = item.textContent.trim();

            xml += `    <Entry DisplayName="${displayName}">\r\n`;
            xml += '        <Entry.Match>\r\n';
            xml += '            <And>\r\n';
            xml += `                <Kind Is="${item.getAttribute('data-kind')}"/>\r\n`;
            xml += `                <Access Is="${item.getAttribute('data-access')}"/>\r\n`;
            if (isStatic) {
                xml += '                <Static/>\r\n';
            }
            if (isReadonly) {
                xml += '                <Readonly/>\r\n';
            }
            xml += '            </And>\r\n';
            xml += '        </Entry.Match>\r\n';
            xml += '        <Entry.SortBy>\r\n';
            xml += '            <Name/>\r\n';
            xml += '        </Entry.SortBy>\r\n';
            xml += '    </Entry>\r\n';
        });

        xml += '</TypePattern>\r\n';
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
