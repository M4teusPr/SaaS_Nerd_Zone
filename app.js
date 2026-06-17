// Basic Kanban Drag and Drop Logic
function allowDrop(ev) {
    ev.preventDefault();

    // Highlight drop zone
    if (ev.target.classList.contains('kanban-col')) {
        ev.target.classList.add('drag-over');
    } else if (ev.target.closest('.kanban-col')) {
        ev.target.closest('.kanban-col').classList.add('drag-over');
    }
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.opacity = "0.5";
}
function drop(ev) {
    ev.preventDefault();

    // Remove all drag-over highlights
    document.querySelectorAll('.kanban-col').forEach(col => {
        col.classList.remove('drag-over');
    });
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    draggedElement.style.opacity = "1";
    // Find the closest kanban-cards container within the column
    let targetCol = ev.target.closest('.kanban-col');
    if (targetCol) {
        let cardsContainer = targetCol.querySelector('.kanban-cards');
        if (cardsContainer) {
            cardsContainer.appendChild(draggedElement);
            updateBadges();
        }
    }
}
// Remove drag-over styling when leaving a column
document.addEventListener('dragover', function (event) {
    event.preventDefault();
}, false);
document.addEventListener('dragleave', function (event) {
    if (event.target.classList.contains('kanban-col')) {
        event.target.classList.remove('drag-over');
    }
}, false);
// Drag end to reset opacity in case drop failed outside
document.addEventListener('dragend', function (event) {
    if (event.target.classList.contains('k-card')) {
        event.target.style.opacity = "1";
        document.querySelectorAll('.kanban-col').forEach(col => {
            col.classList.remove('drag-over');
        });
    }
});
function updateBadges() {
    document.querySelectorAll('.kanban-col').forEach(col => {
        const count = col.querySelectorAll('.k-card').length;
        const badge = col.querySelector('.badge');
        if (badge) {
            badge.textContent = count;
        }
    });
}
// Navigation UI and View Switching
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Get target view ID
        const targetId = item.getAttribute('data-target');
        if (targetId) {
            // Hide all views
            document.querySelectorAll('.view-section').forEach(view => {
                view.classList.remove('active');
                view.style.display = 'none';
            });

            // Show targeted view
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
                targetView.style.display = 'block';
            }
        }
    });
});
// Theme Switching Logic
document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));

        // Add active class to clicked option
        option.classList.add('active');

        // Get theme name from data attribute
        const themeName = option.getAttribute('data-theme');

        // Apply theme to the root HTML element
        if (themeName && themeName !== 'neon-green') {
            document.documentElement.setAttribute('data-theme', themeName);
        } else {
            document.documentElement.removeAttribute('data-theme'); // Default theme
        }
    });
});