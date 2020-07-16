import React, { FunctionComponent } from 'react';
import { Button, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
interface ItemObject {
  images?: string[];
  title?: string;
  description?: string;

}
interface InitialProps {
  handleDeletePost?: (e) => void;
  handleAddDataUpdate?: (e) => void;
  item?: ItemObject;
}
export const PostItem: FunctionComponent<InitialProps> =
({
  item= {
    images: [],
    title: '',
    description: '',
  },
  handleDeletePost ,
  handleAddDataUpdate,
}) => {

  return(
    <Card className='post__card'>
      <div className='images__card'>
        <CardMedia
          className='post--height--images'
          image={item.images && item.images.length > 0 ? item.images[0] : 'static/images/no-image.png'}
          title='Contemplative Reptile'
        />
        <label className='icon--upload' onClick={handleAddDataUpdate}>
          <IconButton color='primary' aria-label='upload picture' component='span'>
            <EditIcon />
          </IconButton>
        </label>
      </div>
      <CardContent>
        <Typography
          className='post--name'
          gutterBottom
          variant='h5'
          component='h2'
          onClick={handleAddDataUpdate}
        >
          {item.title}
        </Typography>
        <Typography  className='post--description' variant='body2' color='textSecondary' component='p'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className='btn__card'>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
        <Button
          className='deletePost'
          size='small'
          color='secondary'
          onClick={handleDeletePost}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
