import useDeletePost from '@/libs/tanstack/post/useDeletePost';
import { IPost } from '@/libs/types/post.types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface IDeletePostModal {
    initialValue: IPost | null;
    open: boolean;
    handleClose: () => void;
};

export default function DeletePostModal({initialValue, open, handleClose}: IDeletePostModal) {
  
    const deleteMutation = useDeletePost({handleClose});
    const handleDelete = () => {
            //call api to delete
            deleteMutation.mutate(initialValue?._id ?? '');
        }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Delete Post"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  );
}
