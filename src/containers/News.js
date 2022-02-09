import React from 'react';
import { useTranslation, Trans } from 'react-i18next';


async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "6dc21b904amsh37628cbf7c30ad9p136646jsn18462051ad59",
      "x-bingapis-sdk": "true"
    }
  });
  const body = await response.json();
  return body.value;
}

function News() {
  const {t, i18n} = useTranslation();
  const [query, setQuery] = React.useState("docker");
  const [list, setList] = React.useState(null);

  const search = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
  };

  return (
    <div className="app">

      <form onSubmit={search}>
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button>{t('contact.search')}</button>
      </form>

      {!list
        ? null
        : list.length === 0
          ? <p><i>{t('contact.noresults')}</i></p>
          : <ul>
            {list.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </ul>
      }
    </div>
  );
}

function Item({ item }) {
  const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
  const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

  return (
    <li className="item">
      {item.image &&
        <img className="thumbnail"
          alt=""
          src={item.image?.thumbnail?.contentUrl}
        />
      }

      <h2 className="title">
        <a href={item.url}>{item.name}</a>
      </h2>

      <p className="description">
        {item.description}
      </p>

      <div className="meta">
        <span>{formatDate(item.datePublished)}</span>

        <span className="provider">
          {item.provider[0].image?.thumbnail &&
            <img className="provider-thumbnail"
              alt=""
              src={item.provider[0].image.thumbnail.contentUrl + '&w=16&h=16'}
            />
          }
          {item.provider[0].name}
        </span>

        {item.category &&
          <span>{separateWords(item.category)}</span>
        }
      </div>
    </li>
  );
}

export default News;