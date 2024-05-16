
//===========================Routes Table========================
document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch data from API
    async function fetchData() {
        const token = localStorage.getItem("accessToken"); // Get access token from localStorage

        try {
            const response = await fetch("/api/admin/all-routes", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Add access token to headers
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            populateTable(data.data); // Call function to populate table
        } catch (error) {
            console.error("There was a problem fetching the data:", error);
        }
    }

    // Function to populate table with API data
    function populateTable(data) {
        const tableBody = document.querySelector("#routeTable tbody");

        data.forEach((route) => {
            const row = tableBody.insertRow();
            const pathCell = row.insertCell(0);
            const methodsCell = row.insertCell(1);

            pathCell.textContent = route.path;
            methodsCell.textContent = Object.keys(route.methods).join(", ");
        });
    }

    fetchData(); // Call fetch data function when page is loaded
});

//==============================Users Table ========================

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch user data from API
    async function fetchUserData() {
        const token = localStorage.getItem("accessToken"); // Get access token from localStorage
        const url = "/api/get-user";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Add access token to headers
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            populateUserTable(data.data); // Call function to populate user table
        } catch (error) {
            console.error("There was a problem fetching user data:", error);
        }
    }

    // Function to populate user table with API data
    function populateUserTable(userData) {
        const tableBody = document.querySelector("#userTable tbody");

        userData.forEach((user) => {
            const row = tableBody.insertRow();
            const idCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const emailCell = row.insertCell(2);
            const roleCell = row.insertCell(3);
            const permissionCell = row.insertCell(4); // Change index to 4 for permissionCell

            idCell.textContent = user._id;
            nameCell.textContent = user.name;
            emailCell.textContent = user.email;

            // Handle role based on the numeric value
            if (user.role === 1) {
                roleCell.textContent = "Admin";
            } else if (user.role === 2) {
                roleCell.textContent = "Manager";
            } else if (user.role === 3) {
                roleCell.textContent = "Editor";
            } else {
                roleCell.textContent = "User";
            }

            // // Handle permissions based on the numeric value
            // if (user.permissions === 1) {
            //   permissionCell.textContent = "Read Only";
            // } else if (user.permissions === 2) {
            //   permissionCell.textContent = "Read/Write";
            // } else {
            //   permissionCell.textContent = "No Access";
            // }
        });
    }

    fetchUserData(); // Call fetch user data function when page is loaded
});

//-------------------------- User CURD -------------------------------
//---------------------------Create
document
    .getElementById("createUserForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = localStorage.getItem("accessToken");

        const formData = new FormData(this);
        const name = formData.get("name");
        const email = formData.get("email");
        const role = formData.get("role");

        try {
            const response = await fetch("/api/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email, role }), // Send data as JSON
            });

            const data = await response.json();
            if (data.success) {
                alert("User created successfully");
            } else {
                console.error("Failed: User Creation", data.msg);
                document.getElementById("createUserResponseMsg").innerText =
                    data.msg;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

//-------------------------Update
document
    .getElementById("updateUserForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = localStorage.getItem("accessToken");

        const formData = new FormData(this);
        const id = formData.get("id");
        const name = formData.get("name");
        const role = formData.get("role");

        try {
            const response = await fetch("/api/update-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id, name, role }), // Send data as JSON
            });

            const data = await response.json();
            if (data.success) {
                alert("User updated successfully");
            } else {
                console.error("Failed: User Updation", data.msg);
                document.getElementById("updateUserResponseMsg").innerText =
                    data.msg;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

//-----------------------------Delete

document
    .getElementById("deleteUserForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = localStorage.getItem("accessToken");

        const formData = new FormData(this);
        const id = formData.get("id");

        try {
            const response = await fetch("/api/delete-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id }), // Send data as JSON
            });

            const data = await response.json();
            if (data.success) {
                alert("User Deleted successfully");
            } else {
                console.error("Failed: User Deletion", data.msg);
                document.getElementById("updateUserResponseMsg").innerText =
                    data.msg;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

//==============================All Category===================================

document.addEventListener("DOMContentLoaded", async function () {
    // Function to fetch category data from API
    async function fetchCategoryData() {
        const token = localStorage.getItem("accessToken"); // Get access token from localStorage

        try {
            const response = await fetch("/api/get-category", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Add access token to headers
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            populateCategoryTable(data.data); // Call function to populate category table
        } catch (error) {
            console.error("There was a problem fetching category data:", error);
        }
    }

    // Function to populate category table with API data
    function populateCategoryTable(categories) {
        const tableBody = document.querySelector("#categoryTable tbody");

        categories.forEach((category) => {
            const row = tableBody.insertRow();
            const idCell = row.insertCell(0);
            const nameCell = row.insertCell(1);

            idCell.textContent = category._id;
            nameCell.textContent = category.name;
        });
    }

    fetchCategoryData(); // Call fetch category data function when page is loaded
});
//-------------------------- User CURD -------------------------------
// -----------------------------Create Category
document
    .getElementById("createCategoryForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = localStorage.getItem("accessToken");

        const formData = new FormData(this);
        const categoryName = formData.get("categoryName");

        try {
            const response = await fetch("/api/add-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ category_name: categoryName }), // Send data as JSON
            });

            const data = await response.json();
            if (data.success) {
                alert("Category created successfully");
                // Optionally update the category table or perform any other actions
            } else {
                console.error("Failed: Category Creation", data.msg);
                // Handle error message display if needed
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

// --------------------Update Category
document
    .getElementById("updateCategoryForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = localStorage.getItem("accessToken");

        const formData = new FormData(this);
        const categoryId = formData.get("categoryId");
        const newCategoryName = formData.get("newCategoryName");

        try {
            const response = await fetch("/api/update-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: categoryId,
                    category_name: newCategoryName,
                }), // Check the key names here
            });

            const data = await response.json();
            console.log("Update Category Response:", data); // Log response data for debugging

            if (data.success) {
                alert("Category updated successfully");
                // Optionally update the category table or perform any other actions
            } else {
                console.error("Failed: Category Updation", data.msg);
                // Handle error message display if needed
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

// --------------------Delete Category
document
    .getElementById("deleteCategoryForm")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const token = localStorage.getItem("accessToken");

        const formData = new FormData(this);
        const categoryId = formData.get("categoryId");

        try {
            const response = await fetch("/api/delete-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id: categoryId }), // Send data as JSON
            });

            const data = await response.json();
            console.log("Delete Category Response:", data); // Log response data for debugging

            if (data.success) {
                alert("Category deleted successfully");
                // Optionally update the category table or perform any other actions
            } else {
                console.error("Failed: Category Deletion", data.msg);
                // Handle error message display if needed
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });


//=======================Default permissions By Admin to Roles=====================
document.addEventListener("DOMContentLoaded", async function () {
    async function fetchPermissionData() {
        try {
            const response = await fetch("/api/admin/get-permission", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Include any necessary authorization headers
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Data received:", data);
            populatePermissionTable(data.data);
        } catch (error) {
            console.error("There was a problem fetching permission data:", error);
        }
    }

    function populatePermissionTable(permissions) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        permissions.forEach((permission) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${permission._id}</td>
                <td>${permission.permission_name}</td>
                <td>${permission.is_default}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    fetchPermissionData();
});




// -----------------------------Create Default Permission
document.getElementById("addDeafultPermissionForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");

    const formData = new FormData(this);
    const permissionName = formData.get("permission_name");
    const isDefault = formData.get("default"); // assuming this is a boolean value

    try {
        const response = await fetch("/api/admin/add-permission", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ permission_name: permissionName, default: isDefault }), // Send data as JSON
        });

        const data = await response.json();
        if (data.success) {
            alert("Default Permission added successfully");
            // Optionally update the permission table or perform any other actions
        } else {
            console.error("Failed: Default Permission Creation", data.msg);
            // Handle error message display if needed
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
// --------------------Update Default Permission
async function updatePermission() {
    const id = document.getElementById('id').value;
    const permissionName = document.getElementById('permission_name').value;
    const defaultValue = document.getElementById('default').value;

    const data = {
        id,
        permission_name: permissionName,
        default: defaultValue
    };

    try {
        const response = await fetch('/api/admin/update-permission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer <your_access_token>' // Include your access token here
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        console.log(responseData); // Log the response from the API
        alert(responseData.msg); // Show a message to the user
    } catch (error) {
        console.error('Error:', error);
    }
}

// --------------------Delete Default Permission
async function deletePermission() {
    const permissionId = document.getElementById('id_delete').value;
    const token = localStorage.getItem("accessToken");

    try {
        const response = await fetch("/api/admin/delete-permission", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: permissionId }), // Send data as JSON
        });

        const data = await response.json();
        console.log("Delete Permission Response:", data);

        if (data.success) {
            alert("Permission deleted successfully");
            // Optionally update the permission table or perform any other actions
        } else {
            console.error("Failed: Permission Deletion", data.msg);
            // Handle error message display if needed
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


//============== Router Permissions / router end point Permission Table  =============
//-------------To get the router Table 

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/admin/routes-with-permissions");
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.msg);
        }

        const tableBody = document.getElementById("routerPermissionsBody");
        tableBody.innerHTML = ""; // Clear existing rows

        data.data.forEach(permission => {
            const row = tableBody.insertRow();
            row.innerHTML = `
          <td>${permission.router_id}</td>
          <td>${permission.routerEndpoint}</td>
          <td>${permission.role_that_can_access}</td>
          <td>${permission.permission_id}</td>
          <td>${permission.permission_name}</td>
          <td>${permission.is_default}</td>
          <td>${permission.Allowed_permissions_on_routes}</td>
        `;
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
});

//-------To Update or Add Router Endpoint

async function addUpdateRouterPermission() {
    const routerEndpoint = document.getElementById("routerEndpoint").value.trim();
    const permissionId = document.getElementById("permissionId").value.trim();
    const role = parseInt(document.getElementById("role").value.trim());
    const permissionsStr = document.getElementById("permissions").value.trim();
    const permissions = permissionsStr.split(",").map(item => parseInt(item.trim()));

    if (!routerEndpoint || !permissionId || isNaN(role) || permissions.length === 0) {
        alert("Please fill in all fields correctly");
        return;
    }

    const requestBody = {
        router_endpoint: routerEndpoint,
        permission_id: permissionId,
        role: role,
        permission: permissions
    };

    try {
        const response = await fetch("/api/admin/add-router-permissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.msg);
        }

        alert("Router Permission Added/Updated Successfully");
        // Optionally, you can redirect or update the UI here
    } catch (error) {
        console.error("Error adding/updating router permission:", error.message);
        alert("Error adding/updating router permission. Please try again.");
    }
}


//------- To Delete Router Endpoint 
async function deleteRouterPermission() {
    const routerPermissionId = document.getElementById("routerPermissionId").value.trim();

    if (!routerPermissionId) {
        alert("Please enter a valid Router Permission ID");
        return;
    }

    try {
        const response = await fetch("/api/admin/delete-router-permission", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ routerPermissionId }),
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.msg);
        }

        alert("Router Permission Deleted Successfully");
        // Optionally, you can redirect or update the UI here
    } catch (error) {
        console.error("Error deleting router permission:", error.message);
        alert("Error deleting router permission. Please try again.");
    }
}



//======================================= For rolls ===============================

// //---------------------Get roles and update in table
document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch roles from API
    async function fetchRoles() {
        const token = localStorage.getItem("accessToken"); // Get access token from localStorage

        try {
            const response = await fetch("/api/admin/get-role", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Add access token to headers
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            populateTable(data.data); // Call function to populate table
        } catch (error) {
            console.error("There was a problem fetching the roles:", error);
        }
    }

    // Function to populate table with role data
    function populateTable(data) {
        const tableBody = document.querySelector("#roleTable tbody");

        data.forEach((role) => {
            const row = tableBody.insertRow();
            const roleIdCell = row.insertCell(0);
            const roleNameCell = row.insertCell(1);
            const valueCell = row.insertCell(2);

            roleIdCell.textContent = role._id;
            roleNameCell.textContent = role.role_name;
            valueCell.textContent = role.value;
        });
    }

    fetchRoles(); // Call fetch roles function when page is loaded
});


//---------------------To Add Role 

// Function to add a new role
async function addRole() {
    const roleName = document.getElementById("roleName").value.trim();
    const roleValue = parseInt(document.getElementById("roleValue").value.trim());

    if (!roleName || isNaN(roleValue)) {
        alert("Please fill in all fields correctly");
        return;
    }

    const requestBody = {
        role_name: roleName,
        value: roleValue,
    };

    try {
        const response = await fetch("/api/admin/store-role", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.msg);
        }

        alert("Role Added Successfully");
        // Optionally, you can update the UI or reload roles data here
    } catch (error) {
        console.error("Error adding role:", error.message);
        alert("Error adding role. Please try again.");
    }
}


//---------------------To Delete Role 

// Function to delete a role
async function deleteRole() {
    const roleId = document.getElementById("roleId").value.trim();

    if (!roleId) {
        alert("Please enter a valid Role ID");
        return;
    }

    try {
        const response = await fetch("/api/admin/delete-role", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roleId }),
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.msg);
        }

        alert("Role Deleted Successfully");
        // Optionally, you can update the UI or reload roles data here
    } catch (error) {
        console.error("Error deleting role:", error.message);
        alert("Error deleting role. Please try again.");
    }
}
