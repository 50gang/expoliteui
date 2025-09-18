import { reactionObj } from "@/libs/constants/reaction.constant";
import useGetPostReaction from "@/libs/tanstack/reaction/useGetPostReaction";
import { IPost } from "@/libs/types/post.types";
import { IReactionTypes } from "@/libs/types/reaction.types";
import { Cloud } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

interface IReactionViewerProps {
  open: boolean;
  handleClose: () => void;
  post: IPost;
  //   reactionCount: Record<IReactionTypes, number>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  current: IReactionTypes | "all";
  value: IReactionTypes | "all";
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, current, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== current}
      id={`simple-tabpanel-${current}`}
      aria-labelledby={`simple-tab-${current}`}
      {...other}
    >
      {value === current && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ReactionModal({
  open,
  handleClose,
  post,
}: IReactionViewerProps) {
  const [value, setValue] = useState<IReactionTypes | "all">("all");

  const handleChange = (
    event: React.SyntheticEvent,
    newType: IReactionTypes
  ) => {
    setValue(newType);
  };

  const availableReactions = Object.entries(post.reactionCount).filter(
    ([, count]) => count > 0
  ) as [IReactionTypes, number][];

  const { data: userReactions } = useGetPostReaction({ postId: post._id });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab value={"all"} label={"ALL"} />
            {availableReactions.map(([type]) => {
              return <Tab value={type} key={type} label={reactionObj[type]} />;
            })}
          </Tabs>
        </Box>
        {/* <CustomTabPanel value={value} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel> */}
      </DialogTitle>
      <DialogContent>
        <CustomTabPanel value={"all"} current={value}>
          <MenuList>
            {userReactions.map((user) => {
              return (
                <MenuItem
                    key={user._id}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Avatar src={user.userAvatarUrl ?? ''}></Avatar>
                  <ListItemText>{user.userName}</ListItemText>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ⌘X
                  </Typography>
                </MenuItem>
              );
            })}
          </MenuList>
        </CustomTabPanel>

        {availableReactions.map(([type]) => {
          return (
            <CustomTabPanel key={type} value={type} current={value}>
              <MenuList>
                {userReactions.filter(userReaction => userReaction.type === type).map((user) => {
              return (
                <MenuItem
                    key={user._id}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Avatar src={user.userAvatarUrl ?? ''}></Avatar>
                  <ListItemText>{user.userName}</ListItemText>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    ⌘X
                  </Typography>
                </MenuItem>
              );
            })}
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
              </MenuList>
            </CustomTabPanel>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
