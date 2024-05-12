const subjects = ["Additional Mathematics", "Accounting", "Agricultural Science", "Animation and Game Design", "Applied Mathematics", "Art and Design", "Biology", "BMED", "Building Technology", "Caribbean History", "Caribbean Studies", "Chemistry", "Clothing and Textiles", "Communication Studies", "Computer Science", "Design and Technology", "Digital Media", "Economics", "Electrical and Electronic Technology", "Entrepreneurship", "Environmental Science", "EDPM", "English A", "English B", "French", "Food and Nutrition", "Geography", "History", "Human and Social Biology", "Information Technology", "Integrated Science", "Integrated Mathematics", "Law", "Literatures in English", "Management of Business", "Mathematics", "Music", "Office Administration", "Performing Arts", "Physical Education and Sport", "Physics", "Principles of Accounts", "Principles of Business", "Pure Mathematics", "Religious Education", "Sociology", "Social Studies", "Spanish", "Tourism", "Technical Drawing", "Theatre Arts", "Visual Arts"];

function generateSubjects() {
	const dropdown = document.getElementById('subject-dropdown');
	dropdown.innerHTML = ""; // Clear existing dropdown items
	const searchInput = document.getElementById('subject');
	const filter = searchInput.value.toUpperCase();

	for (let i = 0; i < subjects.length; i++) {
		if (filter === '' || subjects[i].toUpperCase().indexOf(filter) > -1) {
			const anchor = document.createElement('a');
			anchor.textContent = subjects[i];
			dropdown.appendChild(anchor);
		}
	}
}
generateSubjects();

function generateYear() {
	const dropdown = document.getElementById('year-dropdown');
	dropdown.innerHTML = ""; // Clear existing dropdown items
	for (let i = 2023; i >= 2000; i--) {
		const anchor = document.createElement('a');
		anchor.textContent = i;
		dropdown.appendChild(anchor);
	}
}
generateYear();


