const BASE_URL = 'https://jsonplaceholder.typicode.com';

const userList = document.getElementById('userList');
const userDetails = document.getElementById('userDetails');
const loadUsersBtn = document.getElementById('loadUsersBtn');


loadUsersBtn.addEventListener('click', async () => {
    const users = await loadUsers();
    displayUsers(users);
})

userList.addEventListener('click', async (e) => {
    const user = e.target.innerText;
    console.log(user);
    const details = await loadUsers();
    console.log(details);
    displayDetails(details, user);
})

async function loadUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = response.json();
        console.log(users);
        return users;
    } catch (error) {
        console.log(`Error fetching users: ${error}`);
    }
}

function displayUsers(users) {
    userList.innerHTML = '';
    users.forEach(({ name, phone, address: { geo: { lat, lng }, city } }) => {
        const li = document.createElement('li');
        li.textContent = name;
        userList.appendChild(li);
    })
}


function displayDetails(details, user) {
    userDetails.innerHTML = '';
    const div = document.createElement('div');
    details.forEach((userd) => {
        if (userd.name === user) {
            const str =
                `User name: ${userd.username}
                 \nEmail:  ${userd.email}
                 \nAddress:  street: ${userd.address.street}
                 \nsuite: ${userd.address.suite}
                 \ncity: ${userd.address.city}
                 \nPhone:  ${userd.phone}`;
            div.textContent = str;
            userDetails.appendChild(div);
        }

    })


}