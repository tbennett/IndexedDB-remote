(async function () {
  "use strict";
  
  let movies_list = document.querySelector(".movies");
  let char_list = document.querySelector(".characters");

  // create new indexDB database
  var db = new Dexie("StarWarsDatabase2");

  // Define the database schema, which includes tables and their key indices
  db.version(1).stores({
    movies: `++, &title`,
    characters: `++, &name`
  });

  // go get the people info
  const people_data = await fetch('https://swapi.dev/api/people/?format=json');
  const people = await people_data.json();
  const people_array = people.results;

  // go get the movie info
  const movie_data = await fetch('https://swapi.dev/api/films/?format=json');
  const movies = await movie_data.json();
  const movies_array = movies.results;
  
  // populate the tables
  db.characters.bulkPut(people_array);
  db.movies.bulkPut(movies_array);

  // make a queries of the database
  const folks =  await db.characters.toArray();
  const films = await db.movies.toArray();
   
      folks.forEach((character) => {
        const li = document.createElement("LI");
        li.textContent = character.name;
        char_list.append(li);
      });

      films.forEach((film) => {
        const li = document.createElement("LI");
        li.textContent = film.title;
        movies_list.append(li);
      });
   
    
} ()); // end IIFE