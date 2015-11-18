var request 		= require('superagent'),
		Q       		= require('q'),
		configAuth 	= require('./auth'),
		async				= require('async'),
		_ 					= require('underscore');

module.exports = {

	getMovieInfo: function(movieTitle) {
		var defer = Q.defer();
		request.get({
			uri: 'http://www.omdbapi.com/?',
			t: movieTitle,
			tomatoes: true,
			plot: 'full'
		}, function (error, res, movieInfo) {
			if (error) {
				defer.reject(err);
			} else {
				defer.resolve(movieInfo);
			}
		});
		return defer.promise;
	},

	populateMovieList: function(movieList){
		var movies = JSON.parse(JSON.stringify(movieList));
		for (var i = 0; i < movies.length; i++) {
			var currentMovie = movies[i];
			var currentTitle = currentMovie['Name'];
			delete currentMovie['wTeaser'];
			delete currentMovie['Name'];
			var currentInfo = getMovieInfo(currentTitle);
			_.extend(currentMovie, currentInfo);
			movies[i] = currentMovie;
		}
		return movies;
	},

	getRecommendations: function(title) {
		var defer = Q.defer();
		request
			.get('https://www.tastekid.com/api/similar?')
			.query({k: '178217-MovieRec-N8M9T31S'})
			.query({q: title})
			.query({info: 1})
			.end(function(err, res) {
				if (err) {
					defer.reject(err);
				} else {
					defer.resolve(res)
				}
			});
		return defer.promise;
		// }, function (error, res, movies) {
		// 	if (error) { 
		// 		defer.reject(error); 
		// 	} else {
		// 		// var results = movies['Similar']['Results'];
		// 		// results = populateMovieList(results);
		// 		defer.resolve(movies);
		// 	}
		// });
		// return defer.promise;
	}
};

