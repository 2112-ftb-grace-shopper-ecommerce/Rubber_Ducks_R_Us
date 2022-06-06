import React from 'react';
import { deleteUser, updateUser } from '../../axios-services/user';
import { Link } from 'react-router-dom';

/* this will show users on front end but only Admin accounts 
should be able to see it*/

const UsersList = (props) => {
    const { users, setUsers } = props
    const isAdmin = localStorage.getItem("isAdmin")



    return (
        <>
        { isAdmin === "true" ? <div>
            <h1>USERS</h1>
            <div> {users.map(user =>
                <div
                    className='userCard'
                    key={user.id}
                    style={{
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px",
                        maxWidth: "40vw"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "0px 10px",
                            justifyContent: "space-evenly"
                        }}>
                        <button
                            style={{
                                margin: "0px 10px"
                            }}
                            onClick={async () => {
                                if (window.confirm("Are you sure you want to change this user's admin status?") === true) {
                                    await updateUser(user.id, { isAdmin: !user.isAdmin })
                                    alert('User admin status has been updated');
                                    window.location.reload(false);
                                }
                            }}
                        >Change Admin Status
                        </button>

                        <button
                        style={{
                            margin: "0px 10px"
                        }}
                            onClick={async () => {
                                if (window.confirm("Are you sure you want to delete this user and all its data?") === true) {
                                    await deleteUser(user.id);
                                    alert('User has been deleted')
                                    setUsers(users.filter((filteredUser) => filteredUser.id !== user.id))
                                }
                            }}
                        >Delete User</button>
                    </div>
                    <h3>Username: {`${user.username}`}</h3>
                    <p>Email: {`${user.email}`}</p>
                    <p>Admin: {`${user.isAdmin}`}</p>
                </div>
            )}
            </div>
            <Link to='/admin'>
                <button>Back</button>
            </Link>
        </div> : <p>Administrator Access Required</p>}
        </>
    )
}


export default UsersList