import React from 'react';

export const CUD = (props) => (
    <div>
        <button className="button" onClick={props.jumpToCreateForm}>Create</button>
        <button className="button" onClick={props.jumpToUpdateForm}>Update</button>
        <button className="button" onClick={props.deleteEmployee}>Delete</button>
        <button className="button" onClick={props.loginOut}>Login out</button>
    </div>
    );