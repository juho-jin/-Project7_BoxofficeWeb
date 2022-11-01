import {useLocation, Link } from 'react-router-dom';
import { useEffect, useState, } from 'react';
import qs from 'query-string';
import Mvinfo from './Mvinfo';
import '../CSS/Boxoffice.css';

function Boxmv(){
  const loc = useLocation().search;
  const mvcd = qs.parse(loc).mvcd;
  console.log(mvcd)

//State
const [mv,setMv] =useState();
// const [mvinfo,setMvinfo]=useState();



//함수
const getMovie = async(mvcd) => {
  let url= 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?';
  url = url +'key='+ 'f5eef3421c602c6cb7ea224104795888';
  url = url + '&movieCd=' +mvcd;

  const resp = await fetch(url)
  const data = await resp.json();
  console.log('resp',resp)
  console.log('data',data)
  setMv(data);
}

//useEffect
  useEffect(()=>{
    getMovie(mvcd);
  },[])

  return(
    <>
    <h1>영화상세정보</h1>
    
    <ul>
      {mv && <Mvinfo m={mv} />}
    </ul>
    <Link to="/">
      <button>홈화면으로</button>
      </Link>
    </>
  );
}

export default Boxmv ;