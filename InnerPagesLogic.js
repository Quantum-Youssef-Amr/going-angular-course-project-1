const postListPanel = document.getElementById("page-body");
const usersListPanel = document.getElementById("users-list");

let users = [];
let posts = [];
let initialUserId = -1; 

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const userId = parseInt(params.get('userId'));
    if (!isNaN(userId) && params.has('userId')) {
        initialUserId = userId;
    }
});

Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()),
    fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json())
]).then(([usersData, postsData]) => {
    users = usersData;
    posts = postsData;
    if (usersListPanel) {
        renderAllUsers();
    }
    UpdateUsersList(initialUserId);
}).catch(err => console.error(err));

function GetUserData(userId) {
    return users.find(user => user.id === userId);
}

function UpdateUsersList(userId = -1) {
    if (!postListPanel) return;
    postListPanel.innerHTML = ""; 

    let filteredPosts = userId === -1
        ? posts
        : posts.filter(post => post.userId === userId);

    for (let i = 0; i < filteredPosts.length; i++) {
        postListPanel.innerHTML += getUserPostUI(filteredPosts[i]);
    }

    // Add click event listeners to each post
    const postElements = postListPanel.querySelectorAll('.post-container');
    postElements.forEach(el => {
        el.addEventListener('click', function () {
            const uid = parseInt(this.getAttribute('data-user-id'));
            UpdateUsersList(uid);
        });
    });
}

function getUserPostUI(post) {
    const user = GetUserData(post.userId);
    if (!user) {
        return "";
    }
    return `<span class="post-container" data-user-id="${user.id}">
                <span class="post-container-header">
                    <img src="./src/user-icon.png" alt="User-image">
                    <label id="post-container-header-user-name-${user.id}" 
                        value="${user.id}"
                        class="post-container-header-use-name">${user.name}</label>
                </span>
                <span class="post-container-body">
                    <label class="title">
                        ${post.title}
                    </label>
                    ${post.body}
                </span>
            </span>`;
}

function getUserUI(userid){
    const user = GetUserData(userid);
    if(!user){
        return "";
    }
    const postCount = posts.filter(p => p.userId === user.id).length;
    return `
    <span class="post-container user-card" id="user-card-${user.id}" data-user-id="${user.id}">
        <span class="post-info-container">
            <span class="post-info-header">
                <img src="./src/user-icon.png" alt="User-image">
                <label class="post-container-header-use-name">${user.username}, ${user.name}</label>
            </span>
            <span class="user-info">
                <label class="user-age">${user.age || ''}</label>
                <cite class="user-address" title="location">${user.address?.street || ''}, ${user.address?.city || ''}</cite>
                <label class="user-number-of-posts">${postCount} post${postCount !== 1 ? 's' : ''}</label>
            </span>
        </span>
    </span>
    `
}

function renderAllUsers() {
    if (!usersListPanel) return;
    usersListPanel.innerHTML = "";
    users.forEach(user => {
        usersListPanel.innerHTML += getUserUI(user.id);
    });

    const userCards = usersListPanel.querySelectorAll('.user-card');
    userCards.forEach(card => {
        card.addEventListener('click', function () {
            // Navigate to posts page with userId in query string
            window.location.href = `posts.html?userId=${this.getAttribute('data-user-id')}`;
        });
    });
}

