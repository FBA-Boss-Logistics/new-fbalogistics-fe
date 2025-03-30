import React from 'react';
import Linkify from 'react-linkify';
import { styled } from '@mui/material/styles';

const StyledLinkify = styled(Linkify)(({ theme }) => ({
  '& a': {
    color: 'red',
    backgroundColor: 'red',
    textDecoration: 'none',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      color: 'darkblue' 
    },
  },
}));

const MessageContainer = styled('div')(({ theme}) => ({
  paddingBottom: '15px',
  paddingRight: '17px',
  marginTop:"2px",
  wordBreak: 'break-word',
}));

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

export default function LinkifyContent({ content }) {
  return (
    <MessageContainer>
      <StyledLinkify componentDecorator={componentDecorator}>
        {content}
      </StyledLinkify>
    </MessageContainer>
  );
}
