document.addEventListener("DOMContentLoaded", function () {
    var editableContainers = document.querySelectorAll(".editable-container");
  
    editableContainers.forEach(function (container) {
      var editableTexts = container.querySelectorAll(".editable"); // Modify this line
  
      editableTexts.forEach(function(editableText) { // Loop through all editableTexts
        var developerOptions = document.createElement("div");
        developerOptions.className = "developer-options";
  
        var optionsHTML = `
          <label for="fontSize">Font Size:</label>
          <input type="number" id="fontSize" class="property-input" value="16" min="10" max="30" />
  
          <label for="textColor">Text Color:</label>
          <input type="color" id="textColor" class="property-input" value="#000000" />
  
          <label for="textAlign">Text Alignment:</label>
          <select id="textAlign" class="property-input">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
  
          <label for="fontStyle">Font Style:</label>
          <select id="fontStyle" class="property-input">
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
            <option value="oblique">Oblique</option>
          </select>
  
          <label for="fontWeight">Font Weight:</label>
          <select id="fontWeight" class="property-input">
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="bolder">Bolder</option>
            <option value="lighter">Lighter</option>
          </select>
  
          <label for="textDecoration">Text Decoration:</label>
          <select id="textDecoration" class="property-input">
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
            <option value="line-through">Line Through</option>
          </select>
  
          <label for="textTransform">Text Transformation:</label>
          <select id="textTransform" class="property-input">
            <option value="none">None</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        `;
  
        developerOptions.innerHTML = optionsHTML;
        container.appendChild(developerOptions);
  
        var propertyInputs = container.querySelectorAll(".property-input");
  
        // Set content editable to true
        editableText.contentEditable = true;
  
        // Add event listener for content change
        editableText.addEventListener("input", function () {
          // Handle content change, you can update the content on your server if needed
          console.log("Content changed:", editableText.innerHTML);
        });
  
        // Add event listener for property change
        propertyInputs.forEach(function (input) {
          input.addEventListener("input", function () {
            if (input.id.startsWith("fontSize")) {
              editableText.style.fontSize = input.value + "px";
            } else if (input.id.startsWith("textColor")) {
              editableText.style.color = input.value;
            } else if (input.id.startsWith("textAlign")) {
              editableText.style.textAlign = input.value;
            } else if (input.id.startsWith("fontStyle")) {
              editableText.style.fontStyle = input.value;
            } else if (input.id.startsWith("fontWeight")) {
              editableText.style.fontWeight = input.value;
            } else if (input.id.startsWith("textDecoration")) {
              editableText.style.textDecoration = input.value;
            } else if (input.id.startsWith("textTransform")) {
              editableText.style.textTransform = input.value;
            }
            // Add more conditions for other properties
          });
        });
  
        // Show developer options when clicking on editable text
        editableText.addEventListener("click", function (e) {
          developerOptions.classList.add("active");
          e.stopPropagation(); // Prevent the click from reaching the body
        });
  
        // Hide developer options when clicking outside the developer options div
        document.addEventListener("click", function (e) {
          if (!developerOptions.contains(e.target)) {
            developerOptions.classList.remove("active");
          }
        });
      });
    });
  });
  
  //====================== Modification of text start==================================
  
  //--------------------------- Saving of text---------------------------------
  
  var editedText = {};
  
  // Add event listeners to all editable content elements
  var editableContents = document.querySelectorAll(".editable-content");
  
  editableContents.forEach(function (element) {
    element.addEventListener("input", function () {
      editedText[element.id] = this.innerText;
    });
  
    element.addEventListener("click", function () {
      this.classList.add("editing");
    });
  
    element.addEventListener("blur", function () {
      this.classList.remove("editing");
      displayStoredText();
    });
  });
  
  // Display the stored text separately for each ID
  function displayStoredText() {
    var storedTextElement = document.getElementById("storedText");
    storedTextElement.innerHTML = ""; // Clear previous content
  
    for (var id in editedText) {
      if (editedText.hasOwnProperty(id)) {
        var p = document.createElement("p");
        p.innerHTML = id + ": " + editedText[id];
        storedTextElement.appendChild(p);
      }
    }
  }
  