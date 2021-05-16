import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {parseString} from 'xml2js'
import './App.css';


function BookStore(props) {
  // 책장 Component  
  const MAX = 5
  const numberOfBook = props.imgSrcs.imgs.length
  return (
    <div className="BookStore">
      {
        props.imgSrcs.imgs.map((src) => <img id="BookImg" src={src.img}/>)
      }
      {
         (function() {
          if(numberOfBook < 5){
            return <img id="BookImg"/>
          }
         }
        )()
      }
    </div>
  )
}

function Book(props) {
  // 책 Compoent 
  // 책 검색 결과에서 사용

  // 책 이미지 선택 시, 부모 Component 에 책장에 책 이미지 추가할 것을 요청
  // 즉 부모 Compoennt 로부터 받은 CallBack 함수 사용
  const onBookSeleted = () => {
    props.select({img: props.bookInfo.image})
  }

  // title, author 은 제목에서 검색어와 일치하는 부분은 태그로 감싸져 있다.
  // 따라서, 각종 tag 제거
  const title = props.bookInfo.title.toString().replace(/(<([^>]+)>)/ig, "")
  const author = props.bookInfo.author.toString().replace(/(<([^>]+)>)/ig, "")
  
  return (
    <div className="Book">
      <img src={props.bookInfo.image} onClick={onBookSeleted}/>
      <div className="BookInfo">
        <span className="BookTitle">{title}</span><br></br>
        <span className="BookDetails">
        {author} / {props.bookInfo.price} / {props.bookInfo.link}
        </span>
      </div>
    </div>
  )
}

function Search() {
  // 메인 Component 

  // 각 책장의 최대 저장 가능한 수
  const MAX = 5

  const [query, setQuery] = useState("") // 책 검색 query
  const [books, setBooks] = useState([]) // 검색 결과 저장
  const [isLoading, setIsLoading] = useState(false) // 검색 결과가 있는지, 없는지
  const [message, setMessage] = useState("") // 검색을 할 수 없거나, 검색 결과가 없을 때 오류 메시지 저장

  const bookId = useRef(0) // 검색 결과의 id 관리

  // Seleted Book Image Src 
  const [current, setCurrent] = useState("기본") // 책장 이름
  const [bookImgs, setBookImgs] = useState([{id: current, imgs: []}]) // 책장에 저장하는 책 이미지
 

  // 책 검색 수행
  const searchQuery = async () => {
    // Naver 책 검색 API 사용
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
            if(result.rss.channel[0].total == 0) {
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

  // 책 선택 시, 책 이미지를 책장에 추가
  const setBookImgsCallBack = (img) => {
    let oldData = bookImgs.find((src) => src.id == current)

    // MAX 까지 찼으면 더 이상 추가 x
    if(oldData.imgs.length != MAX) {
      let newData = {id: current, imgs: [...oldData.imgs, img]}
      let tmpList = bookImgs.map((src) => 
        current === src.id ? {...src, ...newData} : src)
      setBookImgs(tmpList);
    }
  }

  // 책장 변경 시, 책장 변경
  // 처음 사용하는 책장의 경우 초기화 수행
  const setBookStore = (e) => {
    setCurrent(e.target.value)

    // 처음 등록하는 책장인 경우
    if(bookImgs.find((src) => src.id == e.target.value) == undefined){
      let newData = {id: e.target.value, imgs: []}
      setBookImgs((imgs) => [...imgs, newData])
    }
  }

  return (
    <div>
      {/* 책장 선택. 기본 3가지 */}
      <p>나만의 책장</p>
      <select id="selectBookStore" onChange={(e)=> setBookStore(e)}>
         <option value="기본" selected="selected">기본</option>
         <option value="소설">소설</option>
         <option value="공부">공부</option>
      </select>
      
      {/* 현재 선택된 책장의 imgs 를 넘겨줌 */}
      <BookStore imgSrcs={bookImgs.find((src) => src.id == current)}/>

      {/* 책 검색 */}
      <div className="inputQuery">
        <input className="query"
          type="text" placeholder="검색할 책의 이름을 입력하세요."
          value={query} onChange={(e)=> {setQuery(e.target.value)}} 
          onKeyPress={(e)=>{if(e.key === "Enter") searchQuery()}}>
        </input>
        <button className="queryBtn" onClick={searchQuery}>Search</button>

        {/* 책 검색 결과 */}
        <h5>검색 결과</h5>
        <hr></hr>
        <div className="searchResult">
          {/* 검색 결과가 있으면 결과 출력
            * 없으면 오류 메시지 출력 
            * - 검색어를 입력해주세요.
            * - 검색 결과가 없습니다.
            * - API 오류 발생
          */}
          {
            isLoading ?
              books.map(book => 
              <Book key={bookId.current++} 
                bookInfo={book} select={setBookImgsCallBack}>
              </Book>)
              : message
          }
        </div>
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
