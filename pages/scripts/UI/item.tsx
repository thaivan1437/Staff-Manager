import React, { FunctionComponent } from 'react';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

interface DataType {
  t: TFunction;
}

interface ItemObject {
  title?: string;
  content?: string;
}
interface InitialProps {
  item?: ItemObject;
  handleDelete?: (e) => void;
  handleUpdate?: (e) => void;
}

export const ScriptsItem: FunctionComponent<InitialProps> =
({
  item= {
    images: [],
    title: '',
    description: '',
  },
  handleDelete,
  handleUpdate,
}) => {
  const { t }: DataType = useTranslation();

  return (
    <React.Fragment>
      <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <p className='script__item--title'>{item.title}</p>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <p className=''>{item.content}</p>
              <div className='script__action'>
                <div className='ml-2'>
                <Button
                  variant='contained'
                  onClick={handleUpdate}
                  endIcon={<EditIcon />}
                  className='script__edit ml-2'
                >
                    <span>{t('scripts:edit')}</span>
                </Button>
                </div>
                <Button
                  variant='contained'
                  onClick={handleDelete}
                  endIcon={<DeleteIcon />}
                  className='script__delete'
                >
                    <span>{t('scripts:delete')}</span>
                </Button>
              </div>
            </div>
          </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};
export default ScriptsItem;
