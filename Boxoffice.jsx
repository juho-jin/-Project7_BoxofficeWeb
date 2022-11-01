import {useEffect,useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Boxoffice.css';

function Boxoffice(){
  //then catch 구문
  // const getBoxoffice = ()=>{
  //   let url='https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
  //   url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888';
  //   url = url + '&targetDt=' + '20120101';
    
  //   //비동기 통신
  //   //return을 쓰려면 {}넣고 resp.jon() 으로 써도됨
  //   // .then((resp)=> resp.json())
    
  //   fetch(url)
  //   .then((resp)=> {return resp.json()})
  //   .then((data)=>{console.log('data=>',data)})
  //   .catch((err)=>{console.log(err)})


  //fetch 말고 async,await로 구현하는방법 결과물은 같음
  //await 기다렸다 정상적으로 돌면 await로 값 추출

  //랜더링이 일어나야 하는 상황, 날짜 선택했을때 재 랜더링이 있어나야 하므로 usestate사용
  const [viewDay, setViewDay]= useState();
  const [viewDayF, setViewDayF]= useState();
  const [officeList,setOfficeList] = useState([]);
  //ref변수
  const refDateIn = useRef();

  const getBoxoffice = async(d)=>{
  
    let url='https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    url = url + 'key=' + 'f5eef3421c602c6cb7ea224104795888';
    url = url + '&targetDt=' + d;
    
    //비동기 통신 (err를 잡고 싶으면 try,catch 사용 안써도됨)
    try{
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log('data=>',data)
    
    //확인하고 콘솔 없애고 대입 기니까 새로운 배열로
    // console.log(data.boxOfficeResult.dailyBoxOfficeList);
    let dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
    setOfficeList(
      dailyBoxOfficeList.map((item) => <li key={item.movieCd}>
      <Link to ={ '/mv?mvcd=' + item.movieCd}>
      {item.rank}
      {item.movieNm}
      {item.rankInten > 0 ? '🔼' :item.rankInten<0? '🔽' :''}
      {Math.abs(Number(item.rankInten))}
      </Link>
      </li>)
    )
  }

    catch (err){
      // console.log(err);
    }

  }


  //이벤트 함수
  const handleChange = (e) => {
    e.preventDefault();
    //확인하고 콘솔 없애고 대입
    // console.log(refDateIn.current.value.replaceAll("-",""));
    setViewDay(refDateIn.current.value.replaceAll("-",""));
  }

  useEffect (()=>{
    (viewDay&&setViewDayF(viewDay.substring(0,4)+'년 '+viewDay.substring(4,6)+'월 '+viewDay.substring(6,8)))
    getBoxoffice(viewDay);
  }
  ,[viewDay])

  //페이지가 처음 랜더링되었을때 실행하기위에 useEffect사용
  useEffect(()=>{
    //어제 날짜 추출
    const yesterday = new Date();
    yesterday.setDate(new Date().getDate()-1);
    //어제 날짜 추출해서 substring으로 필요한부분 앞10자추출후 replace로 -제거
    let d = yesterday.toISOString().substring(0,10).replaceAll('-','');
    console.log(viewDay);

    //state변수 변경
    setViewDay(d);

    //박스포이스 open API 호출
    getBoxoffice(d);
  },[]);
  return(
    <>
      <h1>박스오피스</h1>
      <h3>{viewDayF}일자</h3>
      <form>
        <input type="date" name ="dateIn" ref={refDateIn} onChange={handleChange} />
      </form>
      <ul>
      {officeList}
      </ul>
    </>
  );
}

export default Boxoffice ;