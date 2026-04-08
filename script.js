// Sample Data
let items = [
    { id: 1, title: "System Analytics", desc: "Real-time monitoring of server resources and traffic.", tags: ["Backend", "Monitor"] },
    { id: 2, title: "UI Redesign", desc: "Update desktop interface to modern web standards.", tags: ["Frontend", "Design"] },
    { id: 3, title: "Database Sync", desc: "Synchronize local SQLite data with cloud PostgreSQL.", tags: ["Database", "Backend"] },
    { id: 4, title: "Client Meeting", desc: "Presentation of current progress and future roadmap.", tags: ["Meeting", "Admin"] }
];

let editingId = null;

const itemGrid = document.getElementById('itemGrid');
const searchInput = document.getElementById('searchInput');

function render(filterText = '', filterTag = '') {
    itemGrid.innerHTML = '';
    
    const filtered = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(filterText.toLowerCase()) || 
                              item.desc.toLowerCase().includes(filterText.toLowerCase());
        const matchesTag = filterTag === '' || item.tags.includes(filterTag);
        return matchesSearch && matchesTag;
    });

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="tag-container">
                ${item.tags.map(t => `<span class="tag" onclick="filterByTag('${t}')">${t}</span>`).join('')}
            </div>
            <div class="card-actions">
                <button class="btn btn-primary" onclick="openEdit(${item.id})">Edit</button>
            </div>
        `;
        itemGrid.appendChild(card);
    });
}

// Search Functionality
searchInput.addEventListener('input', (e) => {
    render(e.target.value);
});

// Tag Filtering
function filterByTag(tag) {
    searchInput.value = ''; // Clear text search
    render('', tag);
}

// Edit Functionality
function openEdit(id) {
    editingId = id;
    const item = items.find(i => i.id === id);
    document.getElementById('editTitle').value = item.title;
    document.getElementById('editDesc').value = item.desc;
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function saveEdit() {
    const item = items.find(i => i.id === editingId);
    item.title = document.getElementById('editTitle').value;
    item.desc = document.getElementById('editDesc').value;
    
    closeModal();
    render();
}

// Initial Load
render();
