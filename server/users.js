const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //check if user already exist
    const isAlreadyExist = users.find((user) => user.room === room && user.name === name)

    if(isAlreadyExist){
        return {error: 'This user name already used in this room.'};
    }

    const user = {id, name, room};

    users.push(user);

    return { user };
}

const deleteUser = (id) => {
    const index = users.findIndx( (user) => user.id === id )
    if(index > -1){
        return users.splice(index, 1)[0];
    }
}

const getUsers = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)


module.exports = {addUser, deleteUser, getUsers, getUsersInRoom}