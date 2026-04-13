let currentEditingId = null;
let editPreviewSources = [];

let editLogoInput;
let editLogoPreview;
let editPlusIcon;
let editPreviewInput;
let editPreviewBox;
let editPreviewList;
let editPlaceholder;
let editLogoBox;
let editPanel;
let panelOverlay;

function showTab(event, tabName) {
    event.preventDefault();
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

function renderUploads() {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) return;

        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const userProjects = projects.filter(p => p.authorEmail === loggedInUser.email);

        const uploadsGrid = document.querySelector('.uploads-grid');
        const emptyState = document.querySelector('.empty-state');

        uploadsGrid.innerHTML = '';

        if (userProjects.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        userProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'upload-card';

            const img = document.createElement('img');
            img.src = project.logo || '../../share/img/app.jpg';
            img.alt = 'App';
            img.className = 'upload-card-image';

            const content = document.createElement('div');
            content.className = 'upload-card-content';

            const title = document.createElement('div');
            title.className = 'upload-card-title';
            title.textContent = project.appName;

            const category = document.createElement('div');
            category.className = 'upload-card-category';
            category.textContent = project.category;

            const actions = document.createElement('div');
            actions.className = 'upload-card-actions';

            const editBtn = document.createElement('button');
            editBtn.className = 'btn-small';
            editBtn.textContent = 'Sửa';
            editBtn.onclick = () => editProject(project.id);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-small delete';
            deleteBtn.textContent = 'Xóa';
            deleteBtn.onclick = () => deleteProject(project.id);

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            content.appendChild(title);
            content.appendChild(category);
            content.appendChild(actions);

            card.appendChild(img);
            card.appendChild(content);
            uploadsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error rendering uploads:', error);
    }
}

function openEditPanel() {
    editPanel.classList.add('active');
    panelOverlay.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeEditPanel() {
    editPanel.classList.remove('active');
    panelOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    currentEditingId = null;
    editPreviewSources = [];
    editLogoPreview.src = '';
    editLogoPreview.style.display = 'none';
    editPlusIcon.style.display = 'block';
    renderEditPreviews();
}

function editProject(id) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find(p => p.id === id);
    if (!project) return;

    currentEditingId = id;
    document.getElementById('editAppName').value = project.appName;
    document.getElementById('editCategory').value = project.category;
    document.getElementById('editDescription').value = project.description;

    if (project.logo) {
        editLogoPreview.src = project.logo;
        editLogoPreview.style.display = 'block';
        editPlusIcon.style.display = 'none';
    } else {
        editLogoPreview.src = '';
        editLogoPreview.style.display = 'none';
        editPlusIcon.style.display = 'block';
    }

    editPreviewSources = Array.isArray(project.previews) ? [...project.previews] : [];
    renderEditPreviews();
    openEditPanel();
}

function deleteProject(id) {
    if (!confirm('Bạn có chắc muốn xóa ứng dụng này?')) return;
    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('projects', JSON.stringify(projects));
    renderUploads();
}

function renderEditPreviews() {
    editPreviewList.innerHTML = '';
    editPlaceholder.style.display = editPreviewSources.length === 0 ? 'block' : 'none';

    editPreviewSources.forEach((src, index) => {
        const div = document.createElement('div');
        div.className = 'preview-item';

        const img = document.createElement('img');
        img.src = src;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'preview-remove';
        removeBtn.innerText = 'x';
        removeBtn.onclick = (ev) => {
            ev.stopPropagation();
            editPreviewSources = editPreviewSources.filter((_, i) => i !== index);
            renderEditPreviews();
        };

        div.appendChild(img);
        div.appendChild(removeBtn);
        editPreviewList.appendChild(div);
    });
}

function handleLogoInputChange() {
    const file = editLogoInput.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        editLogoPreview.src = e.target.result;
        editLogoPreview.style.display = 'block';
        editPlusIcon.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function handlePreviewInputChange() {
    const files = Array.from(editPreviewInput.files);
    files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        if (editPreviewSources.length < 3) {
            const reader = new FileReader();
            reader.onload = function (e) {
                editPreviewSources.push(e.target.result);
                renderEditPreviews();
            };
            reader.readAsDataURL(file);
        } else {
            alert('Chỉ tối đa 3 ảnh!');
        }
    });
    editPreviewInput.value = '';
}

function saveEdit() {
    if (!currentEditingId) return;
    const appName = document.getElementById('editAppName').value.trim();
    const category = document.getElementById('editCategory').value;
    const description = document.getElementById('editDescription').value.trim();
    const logo = editLogoPreview.src || '';

    let projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const index = projects.findIndex(p => p.id === currentEditingId);
    if (index === -1) return;

    projects[index].appName = appName;
    projects[index].category = category;
    projects[index].description = description;
    if (logo) projects[index].logo = logo;
    projects[index].previews = [...editPreviewSources];
    localStorage.setItem('projects', JSON.stringify(projects));
    renderUploads();
    closeEditPanel();
}

function initUserPage() {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
        document.getElementById('userAvatar').src = loggedInUser.avatar || '';
        document.getElementById('userName').textContent = loggedInUser.name || loggedInUser.email;
        document.getElementById('userEmail').textContent = loggedInUser.email;
        document.getElementById('profileName').value = loggedInUser.name || '';
        document.getElementById('profileEmail').value = loggedInUser.email;
    }

    editLogoInput = document.getElementById('editLogoInput');
    editLogoPreview = document.getElementById('editLogoPreview');
    editPlusIcon = document.getElementById('editPlusIcon');
    editPreviewInput = document.getElementById('editPreviewInput');
    editPreviewBox = document.getElementById('editPreviewBox');
    editPreviewList = document.getElementById('editPreviewList');
    editPlaceholder = document.getElementById('editPlaceholder');
    editPanel = document.getElementById('editPanel');
    panelOverlay = document.getElementById('panelOverlay');
    editLogoBox = document.getElementById('editLogoBox');

    document.querySelector('.btn-logout').addEventListener('click', function () {
        localStorage.removeItem('user');
        window.location.href = '../login/login.html';
    });

    editLogoBox.addEventListener('click', function () {
        editLogoInput.click();
    });

    editLogoInput.addEventListener('change', handleLogoInputChange);
    editPreviewBox.addEventListener('click', function () {
        editPreviewInput.click();
    });
    editPreviewInput.addEventListener('change', handlePreviewInputChange);
    document.getElementById('saveEditBtn').addEventListener('click', saveEdit);
    panelOverlay.addEventListener('click', closeEditPanel);

    renderUploads();
}

document.addEventListener('DOMContentLoaded', initUserPage);
