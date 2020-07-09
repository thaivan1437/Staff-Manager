import React, { useEffect } from 'react';
import { TFunction } from 'next-i18next';
import { useTranslation } from 'i18n';
import { Grid } from '@material-ui/core';
import { getConversationsThunkAction, getConversationsPaginationThunkAction } from '../logic/conversations_reducer';
import { useSelector, useDispatch } from 'react-redux';
import { convertDateFormat } from 'helpers/date';
import { addConversationsData } from '../logic/conversations_actions';
import { Waypoint } from 'react-waypoint';
import Loading from '../../../components/loading/loading';
import { TimelineItem } from './timeline_item';

interface DataType {
  t: TFunction;
}
const filedsConversations = [
  { attribure : 'startedAt' , isDate : true },
  { attribure : 'endedAt' , isDate : true },
  { attribure : 'email' , isDate : false },
  { attribure : 'points' , isDate : false },
  { attribure : 'status' , isDate : false },
];
export const GetConverSations: React.FunctionComponent = () => {
  const { t }: DataType = useTranslation();
  const conversations = useSelector((state) => state.conversations);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchDataConversations = async() => {
    await dispatch(getConversationsThunkAction());
  };

  useEffect(() => {
    void fetchDataConversations();
  }, [auth.companyID, auth.departmentID]);

  const handleLoadPaginationConversations = async() => {
    await dispatch(getConversationsPaginationThunkAction());
  };
  const handleClickTimeline = async(item) => {
    await dispatch(addConversationsData({
      ['conversationID']: item.conversationID,
      ['startedAt']: item.startedAt,
      ['endedAt']: item.endedAt,
      ['email']: item.createdBy.email,
      ['status']: item.createdBy.status,
      ['points']: item.createdBy.points,
    }));
  };

  return (
    <React.Fragment>
      <div className='root-page'>
        <Grid container justify='space-between' spacing={3}>
          <Grid item xs={12} sm={8}>
            <div className='root-pages mb-4'>
              <p className='conversation__title'>{t('converSations:conversations')}</p>
            </div>
            <div className='timeline-wrap'>
              {conversations.notification &&
                conversations.notification
              }
              {conversations.list && conversations.totalCount > 0 &&
                <div className='timeline-list mb-4'>
                  {conversations.list.map((item, index) => {
                    return(
                      <div key={index}>
                        <TimelineItem
                          item={item}
                          handleClickTimeline={() => handleClickTimeline(item)}
                          conversationID={conversations.conversationID}
                        />
                        {index === conversations.list.length - 1  &&
                          <Waypoint onEnter={() => handleLoadPaginationConversations()} />
                        }
                      </div>
                    );
                  })}
                </div>
              }
              <Loading loading={conversations.loading['loading']}/>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className='conversation__card'>
              <div className='card--header'>
                <div className='root-pages'>
                  <p className='conversation__title'>{t('converSations:detail')}</p>
                </div>
              </div>
              <div className='card--body'>
                <div className='body--wrap'>
                  <div className='wrap--item'>
                    {filedsConversations &&
                      filedsConversations.map((item, index) => {
                        return(
                          <div className='row--item' key={index}>
                            <div className='item--name'>
                              {t(`converSations:${item.attribure}`)}:
                            </div>
                            <div className='item--des'>
                              {item.isDate ?
                                convertDateFormat(new Date(conversations[item.attribure])) :
                                conversations[item.attribure]
                              }
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
                <Loading loading={conversations.loading['loading']}/>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
