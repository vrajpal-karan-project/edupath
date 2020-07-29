import React from 'react';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
  Checkbox, List, ListItem, ListItemIcon, ListItemText, createMuiTheme, ThemeProvider
} from '@material-ui/core';

const theme = createMuiTheme({
  overrides: {
    MuiExpansionPanelDetails: {
      root: {
        paddingTop: 0,
      },
    },
    MuiList: {
      root: {
        width: '100%',
      },
    },
  },
});

const Categories = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  let category = props.category || "Dummy Category";
  let selected = [...props.selected] || ["Dummy Category"];
  const checkedItems = props.checkedItems;
  const handleCheck = props.handleCheck;

  return (
    <ThemeProvider theme={theme}>
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<i className="fa fa-angle-down"></i>}>
          {category}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List disablePadding>
            {props.subCategories.map(({ name }, index) => {
              const labelId = `checkbox-list-label-${name}`;
              const subcategory = name;

              return (
                <ListItem key={index} role={undefined} dense button onClick={() => handleCheck(subcategory)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={Boolean(checkedItems[subcategory])}
                      name={subcategory}
                      tabIndex={-1}
                      disableRipple
                      onChange={() => handleCheck(subcategory)}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={subcategory} />
                </ListItem>
              );
            })}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ThemeProvider>
  )
}

export default Categories
