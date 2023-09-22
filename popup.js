const body = document.body;
let attented = document.querySelectorAll(".attented");
let totalattendance = document.querySelectorAll(".total");
const plus = document.querySelectorAll(".plus-btn");
const minus = document.querySelectorAll(".minus-btn");

var showclasses = document.getElementById("show-classes");

var appbody = document.getElementById("appBody");
const createBtn = document.getElementById("create-btn");
var bottomBtns = document.getElementById("bottom-btns");

// Function to create a new class component
function createClassComponent(className, initialAttendance, totalAttendance) {
  const component = document.createElement("div");
  component.className = "class-component"; // Use a class instead of an ID
  component.setAttribute("data-class", className); //set an unique attribute
  // Generate unique IDs or classes for the elements within each component
  const nameElement = document.createElement("li");
  nameElement.className = "class-name";
  nameElement.textContent = className;

  const plusButton = document.createElement("button");
  plusButton.className = "plus-btn";
  plusButton.textContent = "Present";

  const percentageElement = document.createElement("span");
  percentageElement.className = "percentage";
  percentageElement.textContent = initialAttendance + "%";

  const minusButton = document.createElement("button");
  minusButton.className = "minus-btn";
  minusButton.textContent = "Absent";

  const attentedElement = document.createElement("span");
  attentedElement.className = "attented";
  attentedElement.textContent = initialAttendance;

  const slashElement = document.createTextNode(" / ");

  const totalElement = document.createElement("span");
  totalElement.className = "total";
  totalElement.textContent = totalAttendance;

  const delbtn = document.createElement("button");
  delbtn.textContent = "del";
  delbtn.className = "del-btn";

  const editbtn = document.createElement("button");
  editbtn.className = "edit-btn";
  editbtn.textContent = "edit";

  component.appendChild(nameElement);
  component.appendChild(plusButton);
  component.appendChild(percentageElement);
  component.appendChild(minusButton);
  component.appendChild(attentedElement);
  component.appendChild(slashElement);
  component.appendChild(totalElement);
  component.appendChild(delbtn);
  component.appendChild(editbtn);
  const percentage = calculatePercentage(initialAttendance, totalAttendance);
  percentageElement.textContent = percentage.toFixed(2) + "%";

  // Add event listeners for the plus and minus buttons
  plusButton.addEventListener("click", () => {
    initialAttendance++;
    totalAttendance++;
    attentedElement.textContent = initialAttendance;
    totalElement.textContent = totalAttendance;
    const percentage = calculatePercentage(initialAttendance, totalAttendance);
    percentageElement.textContent = percentage.toFixed(2) + "%";
    saveClassToLocalStorage(className, initialAttendance, totalAttendance);
  });

  minusButton.addEventListener("click", () => {
    totalAttendance++;
    totalElement.textContent = totalAttendance;
    const percentage = calculatePercentage(initialAttendance, totalAttendance);
    percentageElement.textContent = percentage.toFixed(2) + "%";

    saveClassToLocalStorage(className, initialAttendance, totalAttendance);
  });

  delbtn.addEventListener("click", () => {
    localStorage.removeItem(className); // Call the deleteItem function with the class name
    const classComponent = document.querySelector(
      `.class-component[data-class="${className}"]`
    );
    if (classComponent) {
      classComponent.remove();
      // console.log("executed");
    }
  });

  editbtn.addEventListener("click", () => {
    showclasses.style.display = "none";
    bottomBtns.style.display = "none";
    const createEditComp = document.createElement("div");
    createEditComp.id = "create-comp1";

    // Create a label and input for Class Name
    const classNameLabel = document.createElement("label");
    classNameLabel.textContent = "Class Name:";
    const editClassNameInput = document.createElement("input");
    editClassNameInput.id = "inputClassName";
    editClassNameInput.value = className; //setting value of input field
    // Create a label and input for Present Classes
    const editPresentClasses = document.createElement("label");
    editPresentClasses.textContent = "Classes Attented:";
    const editPresentClassesInput = document.createElement("input");
    editPresentClassesInput.id = "inputPresent";
    editPresentClassesInput.value = initialAttendance;

    // Create a label and input for Total Classes
    const editTotalClassesLabel = document.createElement("label");
    editTotalClassesLabel.textContent = "Total Classes:";
    const editTotalClassesInput = document.createElement("input");
    editTotalClassesInput.id = "inputTotal";
    editTotalClassesInput.value = totalAttendance;

    const editOkBtn = document.createElement("button");
    editOkBtn.id = "editOkBtn";

    const divzero = document.createElement("div");
    const divone = document.createElement("div");

    editOkBtn.textContent = "Ok";

    appbody.appendChild(createEditComp);

    createEditComp.appendChild(classNameLabel);
    createEditComp.appendChild(editClassNameInput);

    createEditComp.appendChild(divzero);

    createEditComp.appendChild(editPresentClasses);
    createEditComp.appendChild(editPresentClassesInput);

    createEditComp.appendChild(divone);

    createEditComp.appendChild(editTotalClassesLabel);
    createEditComp.appendChild(editTotalClassesInput);

    createEditComp.appendChild(editOkBtn);

    editOkBtn.addEventListener("click", () => {
      createEditComp.style.display = "none";
      showclasses.style.display = "block";
      bottomBtns.style.display = "block";
      // Get the values entered by the user
      const className = classNameInput.value;
      const presentClasses = presentClassesInput.value;
      const totalClasses = totalClassesInput.value;
      // Call your 'createClassComponent' function with the values
      createClassComponent(className, presentClasses, totalClasses);
      saveClassToLocalStorage(className, presentClasses, totalClasses);
    });
  });

  showclasses.appendChild(component);
}

function calculatePercentage(presentValue, totalValue) {
  const percentage = (presentValue / totalValue) * 100;
  return percentage;
}

createBtn.addEventListener("click", () => {
  createNewClass();
});

function createNewClass() {
  showclasses.style.display = "none";
  bottomBtns.style.display = "none";
  const createComp = document.createElement("div");
  createComp.id = "create-comp";

  // Create a label and input for Class Name
  const classNameLabel = document.createElement("label");
  classNameLabel.textContent = "Class Name:";
  const classNameInput = document.createElement("input");
  classNameInput.id = "inputClassName";

  // Create a label and input for Present Classes
  const presentClassesLabel = document.createElement("label");
  presentClassesLabel.textContent = "Classes Attented:";
  const presentClassesInput = document.createElement("input");
  presentClassesInput.id = "inputPresent";

  // Create a label and input for Total Classes
  const totalClassesLabel = document.createElement("label");
  totalClassesLabel.textContent = "Total Classes:";
  const totalClassesInput = document.createElement("input");
  totalClassesInput.id = "inputTotal";

  const okBtn = document.createElement("button");
  okBtn.id = "okBtn";

  const divzero = document.createElement("div");
  const divone = document.createElement("div");

  okBtn.id = "okBtn";
  okBtn.textContent = "Ok";

  appbody.appendChild(createComp);

  createComp.appendChild(classNameLabel);
  createComp.appendChild(classNameInput);

  createComp.appendChild(divzero);

  createComp.appendChild(presentClassesLabel);
  createComp.appendChild(presentClassesInput);

  createComp.appendChild(divone);

  createComp.appendChild(totalClassesLabel);
  createComp.appendChild(totalClassesInput);

  createComp.appendChild(okBtn);

  okBtn.addEventListener("click", () => {
    createComp.style.display = "none";
    showclasses.style.display = "block";
    bottomBtns.style.display = "block";

    // Get the values entered by the user
    const className = classNameInput.value;
    const presentClasses = presentClassesInput.value;
    const totalClasses = totalClassesInput.value;

    // Call your 'createClassComponent' function with the values
    createClassComponent(className, presentClasses, totalClasses);
    saveClassToLocalStorage(className, presentClasses, totalClasses);
  });
}

// Function to save class data to localStorage
function saveClassToLocalStorage(className, presentClasses, totalClasses) {
  const classData = {
    className,
    presentClasses,
    totalClasses,
  };
  localStorage.setItem(className, JSON.stringify(classData));
}

// Function to retrieve class data from localStorage
function getClassFromLocalStorage(className) {
  const classData = localStorage.getItem(className);
  if (classData) {
    return JSON.parse(classData);
  }
  return null; // Return null if the class data is not found
}

// Create a class component using data from localStorage, if available
function createClassComponentFromLocalStorage(className) {
  const classData = getClassFromLocalStorage(className);
  if (classData) {
    createClassComponent(
      classData.className,
      classData.presentClasses,
      classData.totalClasses
    );
  }
}

// creation of items from local storage
for (let i = 0; i < localStorage.length; i++) {
  const className = localStorage.key(i);
  createClassComponentFromLocalStorage(className);
}
