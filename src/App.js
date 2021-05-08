import React, { useState, useRef } from 'react';
import axios from 'axios';
import {parseString} from 'xml2js'
import './App.css';

function Book(props) {
  return (
    <div>
      {props.bookInfo.title}: {props.bookInfo.price}
    </div>
  )
}

function Search() {
  const [query, setQuery] = useState("")
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const bookId = useRef(0)

  const searchQuery = async () => {
    const URL = '/v1/search/book.xml'
    const KEY_ID = process.env.REACT_APP_NAVER_ID
    const KEY_SECRET = process.env.REACT_APP_NAVER_SECRET

  
    if(query === ""){
      setIsLoading(false)
      setMessage("검색어를 입력해주세요.")
    } else {
      //const {data: { items }} 
      await axios.get(URL, {
        params: {
          query: query,
          display: 5
        },
        headers: {
          'X-Naver-Client-Id': KEY_ID, 
          'X-Naver-Client-Secret': KEY_SECRET
        }
      })
      .then(function(response) {
        // handle success

        parseString(response.data,
          function(err, result) {

            console.log(result.rss.channel[0].item);
            if(result.rss.channel[0].total == 0) {
              console.log(result.rss.channel[0].total)

              setIsLoading(false)
              setMessage("검색 결과가 없습니다.")
            }
            else {
              setBooks(result.rss.channel[0].item)
              setIsLoading(true)
              setMessage("")
            }
          }
        );
      })
      .catch(function (error) {
        //handle error
        setIsLoading(false)
        setMessage("API 오류 발생")

        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error.message);
        }
        else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못함
          console.log(error.request);
        }
        else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    }
  }

  return (
    <div className="inputQuery">
      <input className="query"
        type="text" placeholder="검색할 책의 이름을 입력하세요."
        value={query} onChange={(e)=> {setQuery(e.target.value)}} 
        onKeyPress={(e)=>{if(e.key === "Enter") searchQuery()}}>
      </input>
      <button className="queryBtn" onClick={searchQuery}>Search</button>
      
      <h5>검색 결과</h5>
      <hr></hr>
      <div className="searchResult">
        {
          isLoading ?
            books.map(book => <Book key={bookId.current++} bookInfo={book}></Book>)
            : message
        }
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
      </header>
    </div>
  );
}

export default App;
