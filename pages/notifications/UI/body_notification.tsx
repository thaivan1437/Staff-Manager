import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateFormat } from 'helpers/date';
import { Waypoint } from 'react-waypoint';
import { getNotificationsPagination } from '../logic/notification_reducer';
import Loading from '../../../components/loading/loading';

const Notification: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const loadingList = notifications.loadingList;

  const handleLoadMember = async() => {
    await dispatch(getNotificationsPagination());
  };

  return (
    <React.Fragment>
      {notifications.list && notifications.list.map((item, index) => {
        return(
          <div key={index}>
            <div className='notification-item d-flex mb-3'>
              <img src={item.images && item.images.length > 0 ? item.images : '../../../static/images/avatar.jpg'} className='rounded-circle mr-3' width='56' height='56'/>
              <div className='notification-item__content'>
                <p className='notification-item__title font-weight-bold text-capitalize'>{item.title}</p>
                <p className='notification-item__body'>
                  {item.body}
                </p>
                <p className='notification-item__time mt-2 text-primary'>{convertDateFormat(new Date(item.createdAt))}</p>
              </div>
            </div>
            {index === notifications.list.length - 1  &&
              <div><Waypoint onEnter={() => handleLoadMember()} /></div>
            }
          </div>
        );
      })
      }
      <div className='notification__loading'>
        <Loading loading={loadingList}/>
      </div>
    </React.Fragment>
  );
};

export default (Notification);
