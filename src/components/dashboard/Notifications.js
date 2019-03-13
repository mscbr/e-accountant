import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
    const {notifications} = props;
    //console.log(props)
    return (
       <div className="section notifications">
           <div className="card z-depth-0">
               <div className="card-content">
                   <span className="card-title">Notifications</span>
                   <ul className="notifications-list">
                       { notifications && notifications.map((item) => {
                           return (
                               <li key={item.id}>
                                    <span>{item.content}  </span> 
                                   <span className="red-text">{item.user}</span>
                                   
                                   <div className="grey-text note-date">
                                        {moment(item.time.toDate()).fromNow()}
                                   </div>
                               </li>
                           );
                       })}
                   </ul>
               </div>
           </div>
       </div>
    );
}
export default Notifications;