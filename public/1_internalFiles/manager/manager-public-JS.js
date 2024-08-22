
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
document.getElementById("updateUserForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
        console.error("Access token not found.");
        return;
    }

    const formData = new FormData(this);
    const id = formData.get("id");
    const newName = formData.get("name");
    const newRole = formData.get("role");

    try {
        const response = await fetch("/api/update-user", {
            method: "PUT", // Use PUT method for update request
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id, name: newName, role: newRole }),
        });

        const data = await response.json();
        if (data.success) {
            alert("User updated successfully");
            // Optionally, update the UI or perform other actions
        } else {
            console.error("Failed: User Updation", data.msg);
            // Display error message if needed
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle fetch errors if necessary
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



