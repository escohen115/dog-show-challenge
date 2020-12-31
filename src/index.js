document.addEventListener('DOMContentLoaded', () => {

const dogTable = document.querySelector('#table-body')
const dogForm = document.querySelector('#dog-form')
let currentDogId 

fetchDogs()

function fetchDogs(){    
    dogTable.innerHTML = ''
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogArray => dogArray.forEach(dog => renderDog(dog)))

    function renderDog (dog)
    {
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdBreed = document.createElement('td')
        let tdSex = document.createElement('td')
        let tdButton = document.createElement('td')
        let editButton = document.createElement('button')

        tr.classList.add('dog')
        tdName.classList.add('name')
        tdBreed.classList.add('breed')
        tdSex.classList.add('sex')

        tdName.textContent = dog.name
        tdBreed.textContent = dog.breed
        tdSex.textContent = dog.sex
        editButton.textContent = 'Edit'
        editButton.dataset.id = dog.id

        tdButton.append(editButton)
        tr.append (tdName, tdBreed, tdSex, tdButton)
        dogTable.append(tr)

    }
}

    dogTable.addEventListener('click', function (event) {
        let dogNodes = event.target.closest('.dog').childNodes
        dogForm.name.value =  dogNodes[0].textContent
        dogForm.breed.value =  dogNodes[1].textContent
        dogForm.sex.value =  dogNodes[2].textContent
        currentDogId = event.target.dataset.id
    })


    dogForm.addEventListener('submit', function (event) {
        event.preventDefault()
        dogObj = 
        {
            name: dogForm.name.value,
            breed: dogForm.breed.value,
            sex: dogForm.sex.value
        }
        
        confObj = 
        {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(dogObj),

        }

        fetch(`http://localhost:3000/dogs/${currentDogId}`, confObj)
        .then(response => response.json())
        .then(data => fetchDogs())
        
    })




















})