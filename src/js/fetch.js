const hTxt = document.querySelector('.header-text'), hDesc = document.querySelector('.header-description');
const hArrow = document.querySelector('.arrow'), form = document.querySelector('.form');
fadeIn(hTxt, 200); fadeIn(hDesc, 800); fadeIn(form, 200);

if (window.innerWidth < 1000) fadeIn(hArrow, 1000);

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => dropdown.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', updateDropdown)))

dropdowns.forEach((dropdown) => {
    dropdown.querySelector('input').addEventListener('focus', () => {dropdown.querySelector('input').nextElementSibling.classList.add('show');})
    dropdown.querySelector('input').addEventListener('blur', async () => {await sleep(200); dropdown.querySelector('input').nextElementSibling.classList.remove('show');})
});
  

function updateDropdown() {
    let dropdownInput = this.parentElement.previousElementSibling;
    dropdownInput.value = this.textContent;
    this.parentElement.classList.remove('show');
}

function filterFunction() {
    let input = event.target;
    let content = input.nextElementSibling;
    let a = content.querySelectorAll("a");
    let filter = input.value.toUpperCase();
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

// Paper fetch, dom elements
const searchButton = document.querySelector('#search-btn');
const typeInput = document.querySelector('.type.switch input');
const tierInput = document.querySelector('.tier.switch input');
const typeSwitch = document.querySelector('.type.switch');
const tierSwitch = document.querySelector('.tier.switch');
const switches = [[typeSwitch, typeInput], [tierSwitch, tierInput]];
const tSwitch = [tierSwitch, tierInput];

// variables
let FILE = {
    'year': '',
    'subject': '',
    'paper': '',
    'tier': 'CSEC',
    'type': 'QP'
}

// functions
function getFileData() {
    FILE.subject = document.querySelector('#subject').value.charAt(0).toUpperCase() + document.querySelector('#subject').value.slice(1).toLowerCase();
    FILE.year = document.querySelector('#year').value;
    FILE.paper = document.querySelector('#paper').value;
    
        if (typeInput.checked) {
            FILE.type = 'MS';
        } else {
            FILE.type = 'QP';
        }
    
    if (tierInput.checked) {
        FILE.tier = 'CAPE';
        FILE.unit = document.querySelector('#unit').value;
        FILE.unit = `U${FILE.unit}`;
    } else {
        FILE.tier = 'CSEC';
        FILE.unit = document.querySelector('#month').value.charAt(0).toUpperCase() + document.querySelector('#month').value.slice(1).toLowerCase();
    }
}

function loadPDF() {
    getFileData();
    fetch('/generate-pdf-url?' + new URLSearchParams(FILE))
        .then(response => response.json())
        .then(data => {
            const pdfURL = data.pdfURL;
            window.open(pdfURL, '_blank');
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// listeners
searchButton.addEventListener('click', loadPDF);
const month = document.querySelector('.month');
const unit = document.querySelector('.unit');
unit.style.display = 'none';

tierSwitch.addEventListener('change', () => {
    const isTierChecked = tierSwitch.querySelector('input').checked;
    month.style.display = isTierChecked ? 'none' : 'inline-block';
    unit.style.display = isTierChecked ? 'inline-block' : 'none';
});

switches.forEach(([input, checkbox]) => {
    input.addEventListener('change', () => {
        const labels = input.querySelectorAll('span');
        labels[2].classList.toggle('active', checkbox.checked);
        labels[0].classList.toggle('active', !checkbox.checked);
    });
});