import useDeleteConversation from "@/libs/tanstack/conversation/useDeleteConversations";
import useDeleteMessage from "@/libs/tanstack/message/useDeleteMessage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

interface IDeleteConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  messageId?: string;
  conversationId: string;
}

export default function DeleteConfirmModel({
  open,
  handleClose,
  messageId,
  conversationId
}: IDeleteConfirmModalProps) {
    const deleteMessage = useDeleteMessage({conversationId, handleClose});
    const deleteConversation = useDeleteConversation({handleClose})

    const handleDelete = () => {
       if(messageId) deleteMessage.mutate(messageId);
       else deleteConversation.mutate(conversationId);
    }
    
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Delete!?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
