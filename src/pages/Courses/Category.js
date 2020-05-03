import React from 'react';
import {
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
    Checkbox, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';


const Categories = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    let category = props.category || "Dummy Category";
    let selected = [...props.selected] || ["Dummy Category"]

    const [checked, setChecked] = React.useState("");

    const handleToggle = (subcategory) => {
        setChecked(checked === subcategory ? "" : subcategory);
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<i className="fa fa-angle-down"></i>}>
                {category}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List>
                    {[1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        const subcategory = "sub" + category + value;
                        return (
                            <ListItem key={value} role={undefined} dense button onClick={() => handleToggle(subcategory)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked === subcategory}
                                        name={subcategory}
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={() => handleToggle(subcategory)}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={subcategory} />

                            </ListItem>
                        );
                    })}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Categories
