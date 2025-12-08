const API_URL = "http://127.0.0.1:8000";

function addMore() {
    let div = document.createElement("div");
    div.className = "marks";
    div.innerHTML = `
        <input type="text" class="subject" placeholder="Subject">
        <input type="number" class="mark" placeholder="Marks">
    `;
    document.getElementById("marks-container").appendChild(div);
}


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
    })

    alert(res.status === 200 ? "Student Added!" : "Error adding student")
}


async function getStudents() {
    let res = await fetch(`${API_URL}/students/`);
    let data = await res.json();

    let ul = document.getElementById("student-list");
    ul.innerHTML = "";
    
    data.forEach(s => {
        let li = document.createElement("li");
        li.innerHTML = `${s.name} (${s.email}) - Marks: ${s.marks.map(m => m.subject + ":" + m.marks).join(", ")}`;
        ul.appendChild(li);
    });
}
