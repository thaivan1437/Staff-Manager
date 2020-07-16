import React, { } from 'react';
import { Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import { createImagesLinkAction, updatePost } from '../logic/post_reducer';
import InputForm from '@components/input/input';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ReactRRuleGenerator from 'react-rrule-generator';
import { addPostDataUpdate } from '../logic/post_actions';
import SelectForm from '@components/input/select';
import { listRegion } from '../../../constants/region';
import { UploadImage } from '@components/input/upload_image';
import Alert from '@material-ui/lab/Alert';
interface DataType {
  t: TFunction;
}
const ListFieldsCreatePost = [
  { sm: 6, atrName: 'title' , name: 'Title', type: 'text' },
  { sm: 6, atrName: 'description' , name: 'Description', type: 'text' },
  { sm: 6, atrName: 'rate' , name: 'Rate', type: 'number' },
  { sm: 6, atrName: 'region' , name: 'Region', type: 'select' },
  { sm: 12, atrName: 'images' , name: 'Images', type: 'file' },
];

export const UpdatePost = () => {
  const { t }: DataType = useTranslation();
  const post = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const checkTypes = (e, type) => {
    let TypeValue = e.target.value;
    if (type === 'number') {
      TypeValue = parseInt(TypeValue, 10);
    }

    return (
      dispatch(addPostDataUpdate({ selectedPost:
        { [e.target.name]: TypeValue },
      }))
    );
  };
  const handleSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(addPostDataUpdate({ selectedPost :
      { region : e.target.value },
    }));
  };
  const handleUploadImage = async(e) => {
    await dispatch(addPostDataUpdate({ addedPost: { [e.target.name]: e.target.files[0] } }));
    await dispatch(createImagesLinkAction());
  };

  const handleRruleChange = async (newRRule) => {
    await dispatch(addPostDataUpdate(
      { selectedPost: {
        workingTime : newRRule,
      } },
    ));
  };

  return (
    <React.Fragment>
      <div className='post root-page'>
        <Grid container justify='center' alignItems='center' className='wrap--post'>
          <div className='root-pages update--title'>
            <p className='companies__title'>{t('post:updatePost')}</p>
            <Button
              variant='contained'
              color='primary'
              className='updatePost'
              endIcon={<CloudUploadIcon />}
              onClick={() => dispatch(updatePost())}
            >
              {t('post:save')}
            </Button>
          </div>
          <Grid
            item
            xs={12}
            sm={12}
            container
            justify='space-between'
            alignItems='center'
            className='content--post'
            spacing={3}
          >
            {ListFieldsCreatePost &&
              ListFieldsCreatePost.map((item, index) => {
                switch (item.type){
                  case 'number':
                  case 'text':
                    return(
                      <Grid item xs={12} sm={6} key={index}>
                        <InputForm
                          className='post__number'
                          id={item.atrName}
                          name={t(`post:${item.atrName}`)}
                          onChange={(e) => checkTypes(e, item.type)}
                          type={item.type}
                          value={post.selectedPost[item.atrName]}
                        />
                      </Grid>
                    );
                  case 'select':
                    return(
                      <Grid item xs={12} sm={6} key={index}>
                        <SelectForm
                          key={item.atrName}
                          attribute={item.atrName}
                          name={t(`post:${item.atrName}`)}
                          options={listRegion}
                          className='post__select'
                          onChange={handleSelect}
                          value={post.selectedPost[item.atrName]}
                        />
                      </Grid>
                    );
                }
              })
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <UploadImage
              id='files'
              onChange={(e) => handleUploadImage(e)}
              src={post.selectedPost.images && post.selectedPost.images[0]}
              alt={post.selectedPost.title}
              loading={post.loading['loading'] && post.loading['loading']}
            />
          </Grid>
          <Grid item xs={12} sm={6} className='overflow'>
            <ReactRRuleGenerator
              onChange={(rrule) => handleRruleChange(rrule)}
              value={post.selectedPost.workingTime}
              config={{
                hideStart: false,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className=''>
              {(post.loading['result'] === 200) &&
                <Alert variant='filled' severity='success'>
                  <div className='success'>{t('post:updateSuccess')}</div>
                </Alert>
              }
              {(post.loading['result'] === 1) &&
                <Alert variant='filled' severity='error'>
                  <div className='success'>{t('post:updateNotSuccess')}</div>
                </Alert>
              }
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
