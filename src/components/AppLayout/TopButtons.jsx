// export default function TopButtons(){

//     return(

//     )

// }

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';

import Box from '@mui/material/Box';






function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}




export default function FloatingActionButtonZoom() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary' ,
  
      label: 'Add',
    },
    {
      color: 'secondary',
     
      label: 'Edit',
    },
    {
      color: 'inherit',
     
      label: 'Expand',
    },
  ];

  return (
    <Box bgcolor={"white"}  boxShadow={"none"} padding={"16px"} sx={{
        boxShadow: 'none'
    }}>
      <AppBar position="static" color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Booking" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      
    {/* <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>  */}
        
    
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          sx={{
            boxShadow: 'none',
            background: '#FFF'
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
          
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
