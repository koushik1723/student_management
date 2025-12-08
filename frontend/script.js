// ===== Replace Local with Azure API =====
const API_URL = "https://studentmanagement-azcyf5ahfqcxbuas.westeurope-01.azurewebsites.net";


// Dynamically add more marks input fields
function addMore() {
    let div = document.createElement("div");
    div.className = "marks";
    div.innerHTML = `
        <input type="text" class="subject" placeholder="Subject">
        <input type="number" class="mark" placeholder="Marks">
    `;
    document.getElementById("marks-container").appendChild(div);
}


// =========== SUBMIT STUDENT TO API ===========
async function submitStudent() {
    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let email = document.getElementById("email").value;

    let marks = [];
    document.querySelectorAll(".marks").forEach(row => {
        marks.push({
            subject: row.querySelector(".subject").value,
            marks: Number(row.querySelector(".mark").value)
        });
    });

    const body = {
        name: name,
        age: age,
        email: email,
        marks: marks
    };

    let res = await fetch(`${API_URL}/students/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });

    if (res.ok) {
        alert("🎉 Student Added Successfully!");
        getStudents();
    } else {
        alert("❌ Error Adding Student");
    }
}



// =========== GET & DISPLAY STUDENTS ===========
async function getStudents() {
    let res = await fetch(`${API_URL}/students/`);
    if (!res.ok) {
        alert("Error fetching students!");
        return;
    }

    let data = await res.json();
    let ul = document.getElementById("student-list");
    ul.innerHTML = "";

    data.forEach(s => {
        let li = document.createElement("li");
        li.innerHTML = `
            <b>${s.name}</b> (${s.email}) - 
            Marks: ${s.marks.map(m => m.subject + ":" + m.marks).join(", ")}
        `;
        ul.appendChild(li);
    });
}


// Auto load students when the page opens
window.onload = getStudents;
