import React from 'react';
import { updateUser } from '../../axios-services/user';
import { Link } from 'react-router-dom';


const updateUser = () => {
    // used reg as a prefix for these in case we need to differentiate them from login stuff
    const [editFirstName, setEditFirstName] = useState("")
    const [editLastName, setEditLastName] = useState("")
    const [editEmail, setEditEmail] = useState("")
    const [editUsername, setEditUsername] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editAddress, setEditAddress] = useState("")
    const [editAddress2, setEditAddress2] = useState("")
    const [editCity, setEditCity] = useState("")
    const [editState, setEditState] = useState("");
    const [editZipCode, setEditZipCode] = useState("");


    const userToEdit = {
        firstName: editFirstName, 
        lastName: editLastName,
        email: editEmail,
        username: editUsername,
        password: editPassword,
        address: editAddress,
        address2: editAddress2,
        city: editCity,
        state: editState,
        zipcode: editZipCode

    }

    const handleEdit = async (event) => {
        event.preventDefault()
        if (editFirstName === '' || editLastName === '' || editEmail === '' || editUsername === '' || editPassword === '' || editAddress === ''
            || editAddress2 === '' || editCity === '' || editState === '' || editZipCode === '')
        {
            alert('Please complete all fields')
            return;
        }
        const waitEdit = await edit(userToEdit)
        if (waitEdit) alert(`Welcome, ${waitEdit.user.editFirstName}. ${waitEdit.message}`)
        setEditFirstName('');
        setEditLastName('');
        setEditEmail('');
        setEditUsername('');
        setEditPassword('');
        setEditAddress('');
        setEditAddress2('');
        setEditCity('');
        setEditState('');
        setEditZipCode('');
        
    }

    return (
        <form className="editPage" onSubmit={handleEdit}>
            <h2>Update User Profile</h2>
            <label>First Name</label>
            <br />
            <input type={"text"}
                id='editFirstNameInput'
                value={editFirstName}
                onChange={(event) => {
                    setEditFirstName(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Last Name</label>
            <br />
            <input type={"text"}
                id='editLastNameInput'
                value={editLastName}
                onChange={(event) => {
                    setEditLastName(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Email</label>
            <br />
            <input type={"text"}
                id='editEmailInput'
                value={editEmail}
                onChange={(event) => {
                    setEditEmail(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Username</label>
            <br />
            <input type="text"
                id='editUsernameInput'
                value={editUsername}
                onChange={(event) => {
                    setEditUsername(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input type="text"
                id='editPasswordInput'
                min="8"
                value={editPassword}
                onChange={(event) => {
                    setEditPassword(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Address</label>
            <br />
            <input type={"text"}
                id='editAddressInput'
                value={editAddress}
                onChange={(event) => {
                    setEditAddress(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Address (line 2)</label>
            <br />
            <input type={"text"}
                id='editAddress2Input'
                value={editAddress2}
                onChange={(event) => {
                    setEditAddress2(event.target.value)
                }}
            />
            
            <br />
            <br />
            <label>City</label>
            <br />
            <input type={"text"}
                id='editCityInput'
                value={editCity}
                onChange={(event) => {
                    setEditCity(event.target.value)
                }}
            />
            <br />
            <br />
            <label>State</label>
            <br />
            <input type={"text"}
                id='editStateInput'
                value={editState}
                onChange={(event) => {
                    setEditState(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Zip Code</label>
            <br />
            <input type={"text"}
                id='editZipCodeInput'
                value={editZipCode}
                onChange={(event) => {
                    setEditZipCode(event.target.value)
                }}
            />
            <Link to='/login'>
                <button>Update User Profile</button>
            </Link>
        </form>
    )
}

export default updateUser