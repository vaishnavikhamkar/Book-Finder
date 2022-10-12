import './App.css';
import Search from './Search'
import {useEffect,useState} from 'react';

function App() {

  const [data,setData]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [search,setSearch]=useState("");
  const [searchResults, setSearchResults]=useState([]);

  useEffect(()=>{
    fetch("http://openlibrary.org/search.json?author=tolkien")
    .then((response)=>response.json())
    .then((data)=>setData(data))
    .then(()=>setLoading)
    .catch(setError);

  },[]);

  
 console.log(data);
 
 if(loading){
  return <h1 style={{textAlign:"center"}}>Loading...</h1>;
 }

 if(error){
  return <pre>{JSON.stringify(error,null,2)}</pre>;
 }

 if(!data){
  return null;
 }

 let array=data.docs;
const searchHandler=(search)=>{
  setSearch(search);
  if(search!==""){
    const newBookList=array.filter((book)=>{
      return Object.values(book)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    });
    setSearchResults(newBookList);
  }
   else{
    setSearchResults(array);
   }
};

console.log(searchResults);

 return(
     <div className="container">
      <Search term={search} searchKeyword={searchHandler}/>
      {search.length < 1 ? (
      <ul className='list'>
        {array.map((item,i)=>{
          return <li key={i} className='list-item'>
            <i className='fa fa-book'></i>
            &nbsp;
            {item.title}
          </li>;
        })}
      </ul>
      ):(
        <ul className='list'>
        {searchResults.map((item,i)=>{
          return <li key={i} className='list-item'>
            <i className='fa fa-book'></i>
            &nbsp;
            {item.title}
          </li>;
        })}
      </ul>
      )}
     </div>
 );

//  return <h1>Hello</h1>
  
}

export default App;
