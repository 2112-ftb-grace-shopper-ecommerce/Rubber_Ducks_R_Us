import axios from 'axios';

export async function getAllUsers() {
    try {
      const { data: users } = await axios.get('/api/users');
      return users;
    } catch (err) {
      console.error(err);
    }
  }

export async function register (userToRegister) {
    try{
        const { data } = await axios.post('/api/users/register',{
            email: userToRegister.email,
            username: userToRegister.username,
            password: userToRegister.password
        })
        localStorage.setItem("token", data.token)
        localStorage.setItem("isAdmin", data.user.isAdmin)
        localStorage.setItem("username", data.user.username)
        return data
    }catch(err){
        console.error(err)
    }
}

export async function login (userToLogin) {
    try{
        const { data } = await axios.post('/api/users/login',{
            username: userToLogin.username,
            password: userToLogin.password
        })
        localStorage.setItem("token", data.token)
        localStorage.setItem("isAdmin", data.user.isAdmin)
        localStorage.setItem("username", data.user.username)
        return data
    }catch(err){
        console.error(err)   
    }
}

export async function updateUser (userId, updatedUserValues) {
    try {
        const { data } = await axios.patch(`api/users/${userId}`, updatedUserValues);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function deleteUser (userId) {
    try {
        const { data } = await axios.delete(`/api/users/${userId}`)
        return data;
    } catch (err) {
        console.error(err);
    }
} 