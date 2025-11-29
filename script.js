
document.getElementById("loginBtn").addEventListener("click",function(){
    const email=document.getElementById("email").value.trim();
    const password=document.getElementById("password").value;

    if(email==="admin@gmail.com" || password==="admin123"){
        alert("Login Successful");
        window.location.href="admin.html";
    }else{
        alert("Invalid Credentials , wrong password");
    }

});


const SAMPLE_IMG="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";

//elements

const regInp=document.getElementById("regInp");
const modelInp=document.getElementById("modelInp");
const capacityInp=document.getElementById("capacityInp");
const imgInp=document.getElementById("imgInp");
const driverInp=document.getElementById("driverInp");
const isAvailInp=document.getElementById("isAvailInp");

const addBtn=document.getElementById("addBtn");
const grid=document.getElementById("grid");

const filtercat=document.getElementById("filtercat");
const filterAvail=document.getElementById("filterAvail");
const clearFilter=document.getElementById("clearFilter");

//data storage

let fleets=[];

//load from local storage
function load(){
    fleets=JSON.parse(localStorage.getItem("fleet_vi")) || [];
}

function save(){
    localStorage.setItem("fleet_vi",JSON.stringify(fleets));
}

load();

//validation form
function validation(){
    if(!regInp.value.trim()) return alert("Reg No required");
    if(!categoryInp.value.trim()) return alert("Category required");
    if(!driverInp.value.trim()) return alert("Driver name required");
    return true;
}

//all fleet

addBtn.addEventListener("click",() =>{
    if(!Validate()) return;

    const data={
        id:Date.now(),
        reg:regInp.value.trim(),
        category:categoryInp.value,
        driver:driverInp.value.trim(),
        avalibility:isAvailInp.value,
    
    };

    fleets.push(data);
    save();
    clearForm();
    TextRenderingMode();
    
});

//clear form

function clearForm(){
    regInp.value="";
    categoryInp.value="";
    driverInp.value="";
    isAvailInp.value="";
}

//render
function render(){
    const cat =filtercat.value;
    const avail=filterAvail.value;

    grid.innerHTML=" ";

    let filtered = fleets.filter((f) => {
        if(cat !== "all" && f.category !== cat) return false;
        if(avail !== "all" & f.avalibility !== avail) returnfalse;
        return true;
    });

    if(filtered.length === 0){
        grid.innerHTML ="<p>No fleet found </p>";
        return;
    }

    filtered.forEach((f) => {
        const card =document.createElement("div");
        card.className="card";

        card.innerHTML = `
        <img src=${SAMPLE_IMG}">
        <h4>${f.reg}</h4>
        <p>category : ${f.category}</p>
        <p>Driver: <span class="driver-name">${f.driver}</span></p>
        <p>Avalibility: <span class="avail">${f.avalibility}</span></p>
        `;
        

        //action button

        const actions=document.createElement("div");
        actions.className="actions";

        //update driver

        const up=document.createElement("button");
        up.className="smallbtn";
        up.innerText="update Driver";
        up.click=() => {
            const newName = promt("Enter the name",f.driver);
            if(!newName ||newName.trim()===""){
                alter("Driver name cannot be emptry");
                return;
            }
            f.driver=newName.trim();
            save();
            render();
        };
        
    });
}