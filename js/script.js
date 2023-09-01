// Define the subjects array
var subjects = 
    // Paste the generated JavaScript-friendly subjects array here
    [{ name: "H2 Comp", urls: [
        "https://www.tickcounter.com/widget/countdown/4419898",
        "https://www.tickcounter.com/widget/countdown/4419971"
    ] },
    { name: "H2 Phy", urls: [
        "https://www.tickcounter.com/widget/countdown/4419942",
        "https://www.tickcounter.com/widget/countdown/4420006",
        "https://www.tickcounter.com/widget/countdown/4420087",
        "https://www.tickcounter.com/widget/countdown/4420108"
    ] },
    { name: "H2 Chem", urls: [
        "https://www.tickcounter.com/widget/countdown/4419939",
        "https://www.tickcounter.com/widget/countdown/4419966",
        "https://www.tickcounter.com/widget/countdown/4419990",
        "https://www.tickcounter.com/widget/countdown/4420116"
    ] },
    { name: "H2 Bio", urls: [
        "https://www.tickcounter.com/widget/countdown/4419945",
        "https://www.tickcounter.com/widget/countdown/4420080",
        "https://www.tickcounter.com/widget/countdown/4420090",
        "https://www.tickcounter.com/widget/countdown/4420133"
    ] },
    { name: "H2 Math", urls: [
        "https://www.tickcounter.com/widget/countdown/4419962",
        "https://www.tickcounter.com/widget/countdown/4419968"
    ] },
    { name: "H2 FMath", urls: [
        "https://www.tickcounter.com/widget/countdown/4419997",
        "https://www.tickcounter.com/widget/countdown/4420084"
    ] },
    { name: "H2 Econs", urls: [
        "https://www.tickcounter.com/widget/countdown/4419978",
        "https://www.tickcounter.com/widget/countdown/4419993"
    ] },
    { name: "H1 GP", urls: [
        "https://www.tickcounter.com/widget/countdown/4419951",
        "https://www.tickcounter.com/widget/countdown/4419953"
    ] },
    { name: "H1 Phy", urls: [
        "https://www.tickcounter.com/widget/countdown/4420008",
        "https://www.tickcounter.com/widget/countdown/4420106"
    ] },
    { name: "H1 Chem", urls: [
        "https://www.tickcounter.com/widget/countdown/4420122",
        "https://www.tickcounter.com/widget/countdown/4420095"
    ] },
    { name: "H1 Bio", urls: [
        "https://www.tickcounter.com/widget/countdown/4420079",
        "https://www.tickcounter.com/widget/countdown/4420130"
    ] },
    { name: "H1 Econs", urls: [
        "https://www.tickcounter.com/widget/countdown/4419980"
    ] }
];

// Function to generate checkboxes for subjects
function generateCheckboxes() {
    var checkboxContainer = document.getElementById('checkbox-container');

    subjects.forEach(function (subject) {
        var subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');

        // Create a checkbox for the subject
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'subject';
        checkbox.value = subject.name;
        subjectDiv.appendChild(checkbox);

        // Create a label for the subject
        var label = document.createElement('label');
        label.textContent = subject.name;
        subjectDiv.appendChild(label);

        checkboxContainer.appendChild(subjectDiv);
    });
}

// Add an event listener to hide the form when the button is clicked
var hideFormButton = document.getElementById('hideFormButton');
hideFormButton.addEventListener('click', function () {
    var formContainer = document.getElementById('subjectSelectionForm');
    formContainer.style.display = 'none';
});



// Function to handle checkbox changes and store selection in cookies
function handleCheckboxChange() {
    // Get all selected checkboxes
    var selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    // Clear existing iframes and horizontal lines
    var iframeContainer = document.querySelector('.iframe-container');
    iframeContainer.innerHTML = '';

    // Iterate through selected checkboxes and group iframes by subject
    var subjectGroups = {};
    selectedCheckboxes.forEach(function (checkbox) {
        var subjectName = checkbox.value;

        // Find the subject in the subjects array
        var selectedSubject = subjects.find(function (subject) {
            return subject.name === subjectName;
        });

        // Group iframes by subject
        if (selectedSubject) {
            if (!subjectGroups[selectedSubject.name]) {
                subjectGroups[selectedSubject.name] = [];
            }
            subjectGroups[selectedSubject.name] = subjectGroups[selectedSubject.name].concat(selectedSubject.urls);
        }
    });

    // Insert iframes and horizontal lines for each subject group
    Object.keys(subjectGroups).forEach(function (subjectName, index) {
        var subjectUrls = subjectGroups[subjectName];

        // Create a div for the subject
        var subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-div');

        // Create iframes for the subject's URLs
        subjectUrls.forEach(function (url) {
            var iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.frameBorder = 0;
            subjectDiv.appendChild(iframe);
        });

        iframeContainer.appendChild(subjectDiv);

        // Add a horizontal line if there are more subject groups to come
        if (index < Object.keys(subjectGroups).length - 1) {
            var hr = document.createElement('hr');
            iframeContainer.appendChild(hr);
        }
    });

    // Store the selected subjects in cookies
    var selectedSubjects = selectedCheckboxes.length > 0 ? Array.from(selectedCheckboxes).map(function (checkbox) {
        return checkbox.value;
    }) : [];
    document.cookie = 'selectedSubjects=' + JSON.stringify(selectedSubjects);
}

// Function to load selected subjects from cookies
function loadSelectedSubjects() {
    var cookies = document.cookie.split(';');
    var selectedSubjectsCookie = cookies.find(function (cookie) {
        return cookie.trim().startsWith('selectedSubjects=');
    });

    if (selectedSubjectsCookie) {
        var selectedSubjectsString = selectedSubjectsCookie.split('=')[1];
        var selectedSubjects = JSON.parse(decodeURIComponent(selectedSubjectsString));

        // Check the corresponding checkboxes
        selectedSubjects.forEach(function (subjectName) {
            var checkbox = document.querySelector('input[type="checkbox"][value="' + subjectName + '"]');
            if (checkbox) {
                checkbox.checked = true;
            }
        });

        // Trigger the change event to display iframes
        handleCheckboxChange();
    }
}

// Find the hide disclaimer button
var hideDisclaimerButton = document.getElementById('hideDisclaimerButton');

// Find the disclaimer div
var disclaimer = document.getElementById('disclaimer');

// Add a click event listener to the button
hideDisclaimerButton.addEventListener('click', function () {
    // Hide the disclaimer by setting its display style to 'none'
    disclaimer.style.display = 'none';
});



// Call the generateCheckboxes function to create checkboxes
generateCheckboxes();

// Attach a change event listener to the checkboxes
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});

// Load selected subjects from cookies on page load
loadSelectedSubjects();