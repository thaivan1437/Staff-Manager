import React, { useEffect } from 'react';
import { Grid, Button,
  Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'i18n';
import { TFunction } from 'i18next';
import { getPostsThunkAction, deletedPost, getPostsPaginationThunkAction } from '../logic/post_reducer';
import { addPostDataUpdate, deletePost } from '../logic/post_actions';
import { UpdatePost } from './update_post';
import AddIcon from '@material-ui/icons/Add';
import { CreatePost } from './create_post';
import Alert from '@material-ui/lab/Alert';
import { Waypoint } from 'react-waypoint';
import Loading from '../../../components/loading/loading';
import { PostItem } from './post_item';

interface DataType {
  t: TFunction;
}
export const GetPost = () => {
  const { t }: DataType = useTranslation();
  const post = useSelector((state) => state.post);
  const [open, setOpen] = React.useState({ postAdd: false, postUpdate: false, postDelete: false });

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchDataPosts() {
      await dispatch(getPostsThunkAction());
    }
    void fetchDataPosts();
  }, []);

  const handleLoadPaginationPosts = async() => {
    await dispatch(getPostsPaginationThunkAction());
  };
  const handleAddDataUpdate = async(item, index) => {
    await dispatch(addPostDataUpdate(
      { selectedPost: {
        index,
        title: item.title,
        images: item.images,
        postID: item.postID,
        region: item.region,
        type: item.type,
        description: item.description,
        workingTime: item.workingTime,
      } },
    ));
    setOpen({ ...open, postUpdate: true });
  };
  const handleDeletePost = async(item, index) => {
    await dispatch(deletePost({ deletedPost: { index, postID: item.postID } }));
    setOpen({ ...open, postDelete: true });
  };
  const handleConfirmDeletePost = async() => {
    await dispatch(deletedPost());
  };

  return (
    <React.Fragment>
      <Dialog
        open={open.postUpdate}
        onClose={() => setOpen({ ...open, postUpdate: false })}
        aria-labelledby='form-dialog-title'
        fullWidth={true}
        maxWidth='lg'
      >
        <DialogContent>
          <UpdatePost />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open.postAdd}
        onClose={() => setOpen({ ...open, postAdd: false })}
        aria-labelledby='form-dialog-title'
        fullWidth={true}
        maxWidth='lg'
      >
        <DialogContent>
          <CreatePost />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open.postDelete}
        onClose={() => setOpen({ ...open, postDelete: false })}
        aria-labelledby='form-dialog-title'
        fullWidth={true}
        maxWidth='md'
      >
        <DialogContent>
          <DialogTitle id='alert-dialog-title' className='title--delete'>{t('post:warning')}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {t('post:descWarning')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className=''>
              {(post.loading['result'] === 200) &&
                <Alert variant='filled' severity='success'>
                  <div className='success'>{t('post:deleteSuccess')}</div>
                </Alert>
              }
              {(post.loading['result'] === 1) &&
                <Alert variant='filled' severity='error'>
                  <div className='success'>{t('post:deleteNotSuccess')}</div>
                </Alert>
              }
            </div>
            <Button onClick={() => setOpen({ ...open, postDelete: false })} color='primary'>
              {t('post:cancle')}
            </Button>
            <Button className='confirmDeletePost' onClick={() => handleConfirmDeletePost()} color='primary' autoFocus>
              {t('post:yes')}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className='post'>
        <Grid container justify='center' alignItems='flex-start' className='wrap--fields'>
          <div className='root-pages'>
            <p className='companies__title'>{t('post:Posts')}</p>
            <Button
              variant='contained'
              color='primary'
              className='addPost'
              endIcon={<AddIcon />}
              onClick={() => setOpen({ ...open, postAdd: true })}
            >
              {t('post:add')}
            </Button>
          </div>
          <Grid
            item
            xs={12}
            sm={12}
            container
            justify='flex-start'
            alignItems='flex-start'
            className='content--fields'
            spacing={3}
          >
            {post.list &&
              post.list.map((item, index) => {
                return(
                  <Grid item xs={12} sm={4} key={index}>
                    <PostItem
                      item={item}
                      handleAddDataUpdate={() => handleAddDataUpdate(item, index)}
                      handleDeletePost={() => handleDeletePost(item, index)}

                    />
                    {index === post.list.length - 1  &&
                      <Waypoint onEnter={() => handleLoadPaginationPosts()} />
                    }
                  </Grid>
                );
              })
            }
            <Loading loading={post.loading['loadingPagination']}/>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
