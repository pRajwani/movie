var express = require('express');
var router = express.Router();
var api = require('../public/api');
var { MovieDb} = require('moviedb-promise');
var movidb=  new MovieDb(api);

/* GET home page. */
router.get('/',(req,res,next)=>{
  movidb.movieTopRated()
  .then((topMovies)=>{
    movidb.tvTopRated()
    .then((topShows)=>{
        movidb.tvOnTheAir()
        .then((onAirTv)=>{
            res.json({topMovies:topMovies.results,topShows:topShows.results,onAirTv:onAirTv.results})
        })
    })
  })
})

/* Get with particular search keywoed*/
router.get('/search/:keyword', function(req, res, next) {
  movidb.searchKeyword({query:req.params.keyword})
  .then((result)=>{
    res.json(result);
  })
})

/*Get particular movie*/
router.get('/movie',(req,res,next)=>{
  movidb.movieInfo({id:req.body.id})
  .then((movie)=>{
    res.json(movie);
  })
})

/*Get particular Tv Show*/
router.get('/tv',(req,res,next)=>{
  movidb.tvInfo({id:req.body.id})
  .then((tvShow)=>{
    res.json(tvShow);
  })
})


router.get('/movie/:genre',(req,res,next)=>{
  movidb.discoverMovie({with_genres:req.params.id})
  .then((movies)=>{
    res.json(movies);
  })
})

module.exports = router;
