import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const Articles = (props) => {
    
  return (
      
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      
        <List>
            {props.articles.map((article, index) => {
                <ListItem key={article.title + index}>{article.title}</ListItem>
            })}
        </List>
      
    </Box>
  );
}

export default Articles;
