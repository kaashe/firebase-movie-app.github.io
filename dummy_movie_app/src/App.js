import React, { useState,useEffect,useCallback } from 'react';
import { Fragment } from 'react';
import classes from './App.css';
import AddMovie from './components/AddMovie';
import MovieList from './components/MovieList';
function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);


 const fetchMovieHandler = useCallback(async ()=> {
    setisLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-http-e053e-default-rtdb.firebaseio.com/movies.json')
      if (!response.ok) {
        throw new Error('Something went Wrong!');
      }
      const data = await response.json();
      const loadedMovies=[];
      for(const key in data ){
        loadedMovies.push({
          id:key,
          title: data[key].title, 
          openingText: data[key].openingText, 
          releaseDate: data[key].releaseDate,  
        })
      }
      
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setisLoading(false);
  },[]);
  //useffect to fetch movies by each render
  useEffect(()=>{
    fetchMovieHandler();  
  },[fetchMovieHandler]);

  let content = <p>Found No Movies</p>
  if (movies.length > 0) {
    content = <MovieList movies={movies} />
  }
  if (error) {
    content = <p>{error}</p>
  }
  if (isLoading) {
    content = <p>Loading Movies...</p>
  }
   async function addMovieHandler(movie){
      //send data
   const response=  await fetch('https://react-http-e053e-default-rtdb.firebaseio.com/movies.json',{
        method:'POST',
        body:JSON.stringify(movie),
        headers:{
          'Content-type':'application/json'
        }
      });
      const data = response.json();
      console.log(data);
  };
  return (
    
    <Fragment> 
    
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler} className='movie'>Fetch Movie</button>
      </section>
      <section>
        {content}
      </section>
    </Fragment>
  );
}

export default App;
