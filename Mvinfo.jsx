import { useState, useEffect,useRef } from 'react';
import '../CSS/Boxoffice.css';
// useState Hook
function Mvinfo  (probs) {
  const mvinfo = probs.m.movieInfoResult.movieInfo;
console.log(probs);
  //화면에 출력할 정보를 오브젝트 생성
  const Myinfo = {};

  //필요한 정보키값 불러오기
  const key1 = ['movieNm', 'movieCd', 'openDt', 'prdtStatNm', 'showTm',];
  //key2는 배열값
  const key2 = ['audits', 'nations', 'directors', 'genres', 'companys',];
//영화 매출 관객 증감
//movieNm, salesAmt,  audiAcc, audiChange? audiInten?
  const keys = {
    'movieNm': '영화명: ',
    'movieCd': '영화코드: ',
    'openDt': '개봉일자: ',
    'prdtStatNm': '제작상태: ',
    'showTm': '상영시간: ',
    'audits': '관람등급: ',
    'nations': '제작국가: ',
    'directors': '감독: ',
    'genres': '장르: ',
    'companys': '배급사: ',
  }
  //key1에 해당하는 값 추출
  for (let k of key1) {
    Myinfo[keys[k]] = mvinfo[k];
  }

  //key2에 해당하는 값 추출: 배열에서 추출
  for (let k of key2) {
    switch (k) {
      case 'audits':
        Myinfo[keys[k]] = mvinfo[k].map((item) => item.watchGradeNm);
        break;
      case 'nations':
        Myinfo[keys[k]] = mvinfo[k].map((item) => item.nationNm);
        break;
      case 'directors':
        Myinfo[keys[k]] = mvinfo[k].map((item) => item.peopleNm);
        break;
      case 'genres':
        Myinfo[keys[k]] = mvinfo[k].map((item) => item.genreNm);
        break;
      default:
        Myinfo[keys[k]] = mvinfo[k].filter((item) => item.companyPartNm === "배급사");
        Myinfo[keys[k]] = Myinfo[keys[k]].map((item) => item.companyNm);
        break;


    }
  }

  // console.log(MyInfo);
  //화면에 출력할 내용을 jsx로 만들기
  let lis = [];

  for (let [k, v] of Object.entries(Myinfo)) {
    lis.push( <li key={Myinfo.movieCd + k} >
      <span className='mvinfo1'> {k} </span>
      <span className='mvinfo2'> {v} </span>
      </li>);
    // console.log(k);
    // console.log(v);
  }

useEffect(()=> {


  },[]);


  return (
    <>
      <div className='infomain'>
              {lis}
      </div>
    </>
  );
}

export default Mvinfo;
