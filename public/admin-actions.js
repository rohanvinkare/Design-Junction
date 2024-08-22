async function deleteUser(userId) {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3002/admin/users/${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        alert('User deleted successfully');
        window.location.reload();
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again later.');
    }
}

async function updateUser(userId) {
    try {
        // Prompt the user for the new username and role
        const newUsername = prompt("Enter the new username:");
        const newRole = prompt("Enter the new role:");

        // Validate input
        if (!newUsername || !newRole) {
            alert("Username and role are required");
            return;
        }

        const response = await fetch(`http://localhost:3002/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newUsername, newRole })
        });
        
        if (response.ok) {
            const updatedUser = await response.json();
            alert("User information updated successfully");
            window.location.reload();
        } else {
            const responseData = await response.json();
            alert(responseData.message);
        }
    } catch (error) {
        console.error("Error updating user:", error);
        alert("An error occurred while updating user information");
    }
}

document.querySelectorAll(".update-button").forEach(button => {
    button.addEventListener("click", function() {
        const userId = this.dataset.userId; // Get the user ID from the button's data attribute
        updateUser(userId);
    });
});
