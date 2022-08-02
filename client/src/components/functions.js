import { filterGames } from "../redux/actions";

//Busqueda
export const filterBySearch = (dispatch, games, input) => {
    let result = games.filter(game => game.name.toLowerCase().includes(input.toLowerCase()));

    dispatch(filterGames(result));
}

//Filtrar por genero
export const filterByGenres = (dispatch, games, genre) => {
  let result = games;

  if(genre !== 'none'){
    result = games.filter(game => game.genres.toString().includes(genre.toString()));
  }

    dispatch(filterGames(result));
};

//Filtrar por plataforma
export const filterByPlatforms = (dispatch, games, platform) => {
  let result = games;

  if(platform !== 'none'){
    result = games.filter(game => game.platforms.toString().includes(platform.toString()));
  }
    dispatch(filterGames(result));
};

//Filtrar por storage
export const filterByDb = (dispatch, games, mode) => {
    let result = games;

    if(mode === 'Database'){
        result = games.filter(game => game.isDb);
    }else if(mode === 'API'){
        result = games.filter(game => !game.isDb);
    }

    dispatch(filterGames(result));
};

//Sort by name
export const sortByName = (dispatch, games, mode) => {
    const gamesForSort = [...games];
    let result = gamesForSort;

    if(mode === 'A-Z'){
        result = gamesForSort.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
    }else if(mode === 'Z-A'){
        result = gamesForSort.sort(function (a, b) {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
    }

    dispatch(filterGames(result));
};


//Sort by rating
export const sortByRating = (dispatch, games, mode) => {
    const gamesForSort = [...games];
    let result = gamesForSort;

    if(mode === 'worst'){
        result = gamesForSort.sort(function (a, b) {
            if (a.rating > b.rating) {
              return 1;
            }
            if (a.rating < b.rating) {
              return -1;
            }
            return 0;
          });
    }else if(mode === 'best'){
        result = gamesForSort.sort(function (a, b) {
            if (a.rating < b.rating) {
              return 1;
            }
            if (a.rating > b.rating) {
              return -1;
            }
            return 0;
          });
    }

    dispatch(filterGames(result));
};
