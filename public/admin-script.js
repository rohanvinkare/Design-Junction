function fetchAndRenderUsers() {
    fetch('http://localhost:3002/admin/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    })
    .then(users => {
        const tableBody = document.getElementById('viewUserTableBody');
        tableBody.innerHTML = ''; // Clear existing table body content
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td><button class="update-button" onclick="updateUser('${user._id}')">
            <i class="fas fa-user-edit"></i>
            </button>
            <button class="delete-button" onclick="deleteUser('${user._id}')">
            <i class="fas fa-trash"></i>
            </button></td>
            `;
            row.id = user._id;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}

fetchAndRenderUsers();