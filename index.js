const search = document.getElementById("search");

// Defining async function
async function getapi() {
	let url = 'files.json';
	// Storing response
	const response = await fetch(url);

	// Storing data in form of JSON
	var data = await response.json();
	//console.log(data);
	if (response) {
		hideloader();
	}
	show(data);
}
// Calling that async function
getapi();

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
	let tab =
		`<tr>
		<th>Name</th>
		<th>Size</th>
		<th>LastModified</th>
		</tr>`;
	// Loop to access all rows
	for (var i = 0; i < data.files.length; i++) {
		tab += `<tr> <td>${data.files[i].Name}</td> 
		            <td>${data.files[i].Size}</td> 
					<td>${data.files[i].LastModified}</td> 
				</tr>`;
	}
	// Setting innerHTML as tab variable
	document.getElementById("employees").innerHTML = tab;
}

var search_term = "";

async function showList() {
	let tab =
		`<tr>
	<th>Name</th>
	<th>Size</th>
	<th>LastModified</th>
	</tr>`;
	let url = 'files.json';
	const response = await fetch(url);
	var data = await response.json();
	data.files
		.filter((item) => {
			return (
				item.Name.toLowerCase().includes(search_term)
			);
		})
		.forEach((e) => { //console.warn(e.Name)
			//console.log(data.files[0].Name.toLowerCase().includes(search_term))
			tab += `<tr> <td>${e.Name}</td> 
		            <td>${e.Size}</td> 
					<td>${e.LastModified}</td> 
				</tr>`;
			document.getElementById("employees").innerHTML = tab;
		});
};

showList();

search && search.addEventListener("input", (event) => {
	//search.textContent = this.value;
	search_term = event.target.value.toLowerCase();
	//	console.warn("search",event.target.value.toLowerCase());
	showList();
});

//pagination
var current_page = 1;
var obj_per_page = 5;
async function totNumPages() {
	let url = 'files.json';
	const response = await fetch(url);
	var data = await response.json();
	//console.warn("numberofPages", Math.ceil(data.files.length / obj_per_page))
	return Math.ceil(data.files.length / obj_per_page);

}
function prevPage() {
	console.warn("next")
	if (current_page > 1) {
		current_page--;
		change(current_page);
	}
}

function firtPage() {
	console.warn("firstPage")
	 current_page = 1; 
	 change(1);
}

async function nextPage() {
	console.warn("next")

    const pageCount = await totNumPages();

	if (current_page < pageCount) {
		current_page++; console.log(current_page)
		change(current_page);
	}
}

function lastPage() {
	console.warn("lastPage");	
}
async function change(page) { //page=1
	let url = 'files.json';
	const response = await fetch(url);
	var data = await response.json();
	let tab =
		`<thead>
		<tr>
<th>Name</th>
<th>Size</th>
<th>LastModified</th>
</tr></thead> `;

	var btn_next = document.getElementById("btn_next");
	var btn_prev = document.getElementById("btn_prev");
	var listing_table = document.getElementById("employees");
	var page_span = document.getElementById("page");
	if (page < 1) page = 1;
	if (page > totNumPages()) page = totNumPages();
	for (var i = (page - 1) * obj_per_page; i < (page * obj_per_page) && data.files.length; i++) {
		//1*25; 25<2*25; 
		tab += `<tr> <td>${data.files[i].Name}</td> 
		            <td>${data.files[i].Size}</td> 
					<td>${data.files[i].LastModified}</td> 
				</tr>`;
				console.log(employees);
		// Setting innerHTML as tab variable
		document.getElementById("employees").innerHTML = tab;
		//row count
		var totalRowCount = 0;
        var rowCount = 0;
        var rows = employees.getElementsByTagName("tr")
        for (var i = 0; i < rows.length; i++) {
            totalRowCount++;
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
				console.log("rows[i]", rows[i]);
            }
        }
        var message = "Total Row Count: " + totalRowCount;
		console.log("totalRowCount", totalRowCount)
        message += "\nRow Count: " + rowCount;
       // alert(message);
	
	}
	page_span.innerHTML = page;
}
window.onload = function () {
	change(1);
};

//sorting

///model
