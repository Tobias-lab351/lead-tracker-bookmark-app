

//Building chrome extension

let myLeads = []
const inputEL = document.getElementById("input-el")
const InputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
const inputField = document.getElementById ("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let copyrightEl = document.getElementById("copyright-el")

  if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
  }

  tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    })

})
   
  function render(leads) {
    let listItems = ""
    for (let i = 0;i < leads.length; i += 1) {
        listItems += `
        <li>
             <a href="${leads[i]}" target="_blank">
                 ${leads[i]}
             </a>
        </li>`
  }
  ulEl.innerHTML = listItems
  
}

   deleteBtn.addEventListener("dblclick",function() {
        if (confirm('Clear localStorage?') == true) {
        localStorage.clear()
        myLeads = []
        render(myLeads)
        }
        else {
        alert('Nothing happened')
        }
 })


 InputBtn.addEventListener("click", function() {
    myLeads.push(inputEL.value)
    inputEL.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )

    render(myLeads)  
   
})

function copyright() {
    copyrightEl.innerHTML = `<hr><strong>Privacy Policy </strong> - Copyright ©2024 shunkyz Software Ltd. 
    Proudly serving our clients for over 2 years.`
}

copyright()

