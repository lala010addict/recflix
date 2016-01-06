'use strict';


var key = 'api_key=2c8a02fa36fb5299dcd97bbc84609899';
var ImgPath = "http://image.tmdb.org/t/p/";
var urls = ["", "/cgi-bin/LWP.pl?url=http://en.wikipedia.org", ""];
var RTkey = "pfwh96pvezces4nybpv7qf8f";

angular.module('yoMovieApp')
  .directive('autocomplete', ['$http', function($http) {
    return function(scope, elem, attrs) {
      //    var element = angular.element(elem)[0];
      // console.log(elem)
      elem.autocomplete({

        minLength: 2,
        delay: 200,
        source: function(request, response) {
          // var url = "https://api.themoviedb.org/3/search/tv?api_key=2c8a02fa36fb5299dcd97bbc84609899&query=" 
          // + request.term;
          // console.log(request.term)
          $http({
            method: "JSONP",
            url: "https://api.themoviedb.org/3/search/movie?api_key=2c8a02fa36fb5299dcd97bbc84609899&query=" + request.term + '&callback=JSON_CALLBACK'

          }).success(function(data) {
            response(data.results);
          });
        },
        messages: {
          results: function() {},
          noResults: ''
        },

        focus: function(event, ui) {

          elem.val(ui.item.original_title);

          // console.log(ui.item)
          return false;
        },
        select: function(event, ui) {
          scope.query = ui.item.original_title;
          console.log(scope.query)
          scope.getMovies(ui.item.original_title)
            //  console.log( ui.item.original_title)
            //  scope.$apply;
          return false;
        },
        change: function(event, ui) {
          if (ui.item === null) {
            scope.queryId.selected = null;
          }
        }
      }).data("ui-autocomplete")._renderItem = function(ul, item) {
        //  console.log(item)

        if (item.poster_path) {
          var inner_html = "<a><img width='45' height='68' src=" + ImgPath + "w92" + item.poster_path + "> <strong>" + item.original_title + "</strong>  " + item.release_date + " </a>";
          return $("<div class='searchres'></div>")
            .data("ui-autocomplete-item", item)
            .append(inner_html)
            .appendTo(ul);
        } else {

          var inner_html = "<a> <strong>" + item.original_title + "</strong>  " + item.release_date + " </a>";
          return $("<div class='searchres'></div>")
            .data("ui-autocomplete-item", item)
            .append(inner_html)
            .appendTo(ul);
        }


      };


    }
  }]);
