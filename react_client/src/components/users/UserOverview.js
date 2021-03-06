import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Divider, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  }
}));

const UserOverview = (props) => {
    const classes = useStyles();
    const { firstname, lastname, username } = props.userData;

    return (

        <Container maxWidth={"md"}>
            <List className={classes.root}>
                <ListItem>
                    <ListItemText primary="Username" secondary={username} />
                </ListItem>
                <Divider component="li" />
                <li>
                    <Typography
                        className={classes.dividerFullWidth}
                        color="textSecondary"
                        display="block"
                        variant="caption"
                    >
                    </Typography>
                </li>
                <ListItem>
                    <ListItemText primary="Full Name" secondary={firstname + " " + lastname} />
                </ListItem>
                <Divider component="li" />
            </List>
        </Container>
    )
};

// Exporting the component
export default UserOverview;
