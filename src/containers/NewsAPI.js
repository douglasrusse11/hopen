import React from 'react';
import { useEffect } from 'react';
import { NEWS_API_KEY } from '../config';
import { Grid, Button, Card, CardContent, CardActions, Typography, CardMedia, CardActionArea, Box} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

function NewsAPI(){
    const [query, setQuery] = React.useState("displaced");
    const [list, setList] = React.useState([]);

    useEffect(() => {
        getArticles(query).then(setList);
    }, [])

    const search = (e) => {
        e.preventDefault();
        getArticles(query).then(setList);
    };

async function getArticles () {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${query}&pageSize=5&sortBy=popularity&apiKey=${NEWS_API_KEY}`);
            const body = await response.json();
            console.log(body);
            return body.articles;

};

    return (
        <div>
            <form onSubmit={search}>
                <TextField style={{ padding: 24 }}
                    value={query}
                    placeholder="Search for news"
                    margin="normal"
                    onChange={e => setQuery(e.target.value)}

                />
            </form>
            <Grid container spacing={24} style={{ padding: 24 }}>
                {!list
                    ? null
                    : list.length === 0
                        ? <p><i>Searching</i></p>
                        : <ul>
                            {list.map((item, i) => (
                                <Item key={i} item={item} />
                            ))}
                        </ul>
                }
                <Typography>
                <p style={{ textAlign: "center" }}>
          Powered by <a href="https://newsapi.org/">NewsAPI.org</a>
        </p>
                </Typography>
            </Grid>
        </div>
        );
}

function Item({ item }) {
    // const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
    // const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

    return (
        <Card style={{width: 400}}>
            <CardActionArea>  
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <a href={item.url}></a>{item.name}
                    </Typography>
                    <Typography>
                        {item.title}
                    </Typography>
                    {/* <Typography component="p">
                        {item.description}
                    </Typography> */}
                    <CardMedia
                    component="img"
                    height="140"
                    image={item.urlToImage}
                />
                </CardContent>
                
            </CardActionArea>
           
            <CardActions>
                <Button size="small" color="primary" href={item.url} target="_blank">
                    Read more
                </Button>
            </CardActions>
        </Card>
    )
}

export default NewsAPI;