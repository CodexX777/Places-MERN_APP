import React from 'react';
import './UserList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/Card/Card';

const UserList = (props) => {
    if(props.items.length===0){
        return (<div className='center'>
            <Card className="no-users">
            <h2>No users found</h2>
            </Card>
        </div>);
    }
    return (
        <ul className='users-list'>
        {props.items.map(user =>{
            return <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placecount={user.places.length}/>;
        })}
        </ul>
    );
}

export default UserList
