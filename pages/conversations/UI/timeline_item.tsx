import { FunctionComponent } from 'react';
import { convertDateFormat } from 'helpers/date';

interface ObjectItem {
  conversationID: string;
  startedAt: Date;
  endedAt: Date;
  createdBy: string[];
}
interface InitialProps {
  item?: ObjectItem[];
  handleClickTimeline?: (e) => void;
  conversationID?: string;
}

export const TimelineItem: FunctionComponent<InitialProps> = (
{
  item= [],
  handleClickTimeline,
  conversationID = '',
}) => {

  return(
    <div className='timeline-item'>
      <div className='timeline-item--content'>
        <div className='timeline-item--icon' />
        <h4
          className={`timeline-item--label
          ${item['conversationID'] === conversationID ? 'active' : ''}`}
          onClick={handleClickTimeline}
        >
          {convertDateFormat(new Date(item['startedAt']))} - {convertDateFormat(new Date(item['endedAt']))}
        </h4>
        <p>Email: {item['createdBy'].email}.</p>
      </div>
    </div>
  );
};
