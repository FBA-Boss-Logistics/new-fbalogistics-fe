import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { styled } from '@mui/material/styles';

const IconBase = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: theme.palette.grey[500],
    position: 'absolute',
    bottom: theme.spacing(0.5),
    right: theme.spacing(1),
}));

const StyledDoneIcon = styled(DoneIcon)(({ theme }) => ({
    fontSize: 'inherit',
    marginLeft: theme.spacing(0.5),
}));

const StyledDoneAllIcon = styled(DoneAllIcon)(({ theme }) => ({
    fontSize: 'inherit',
    marginLeft: theme.spacing(0.5),
}));

const BlueDoneAllIcon = styled(DoneAllIcon)(({ theme }) => ({
    fontSize: 'inherit',
    color: '#3d5afe',
    marginLeft: theme.spacing(0.5),
}));

const TimeText = styled('span')(({ theme, color }) => ({
    fontSize: 'inherit',
    color: color,
}));

const CheckIcon = ({ readBy, time, isCurrentUser, color = 'grey.500' }) => {
    let IconComponent = <StyledDoneIcon />;
    if (readBy === 3) {
        IconComponent = <BlueDoneAllIcon />;
    } else if (readBy === 2) {
        IconComponent = <StyledDoneAllIcon />;
    }

    return (
        <IconBase>
            <TimeText color={color}>{time}</TimeText>
            {!isCurrentUser && IconComponent}
        </IconBase>
    );
};

export default CheckIcon;