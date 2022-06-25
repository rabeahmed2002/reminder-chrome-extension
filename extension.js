let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("reminder"))
const tabBtn=document.getElementById("tab-btn")

// let myLeads=`["www.apple.com"]`

// myLeads=JSON.parse(myLeads) //converting into an array
// myLeads.push("Rabe") //adding new value to it
// myLeads=JSON.stringify(myLeads) //converting to string again
// console.log(myLeads) //printing the string

// myLeads=JSON.stringify(myLeads)

// localStorage.setItem("myName", "Rabe ahmed")
// let name=localStorage.getItem("myName")
// console.log(name)
// localStorage.clear()

// localStorage.clear()
// console.log(leadsFromLocalStorage)

// const tab=[
//     {url: "https://www.youtube.com/watch?v=Qwm6BSGrOq0&list=RDQwm6BSGrOq0&start_radio=1&ab_channel=AbdulHannan"}
// ]

if (leadsFromLocalStorage) {
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    // console.log(tab[0].url)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("reminder", JSON.stringify(myLeads))
        render(myLeads)
    // let activeTab = tabs[0]
    // let activeTabId = activeTab.id // or do whatever you need
    })
})

function render(leads) {
    let listItems=""
    for(let i=0; i<leads.length; i++) {
        listItems+="<li><a target='_blank' href='#'>"  + leads[i]+ "</a></li>" 
        // ulEl.innerHTML+="<li>" + myLeads[i] + "</li>"
        // console.log(myLeads[i])
        // const li =document.createElement("li")
        // li.textContent=myLeads[i]
        // ulEl.appendChild(li)
    }
    ulEl.innerHTML=listItems
}


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value=""
    
    localStorage.setItem("reminder", JSON.stringify(myLeads))
    render(myLeads)
    // console.log( localStorage.getItem("reminder") )
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})
