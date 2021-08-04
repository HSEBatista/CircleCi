define(

  ['knockout', 'CCi18n'],

  function(ko, CCi18n) {

    "use strict";

    return {
      /*
       * Note that "this" is bound to the Widget View Model.
       */      
      
      
      americaTable: ko.observableArray([]),
      nationalTable: ko.observableArray([]),
      yearsOption : ko.observableArray([]),  
      selectedYear : ko.observable(),

      onLoad : function(widget) { 
        
      },

      yearOfTable: function () {
        var widget = this;
        widget.yearsOption([]);
        var options = [];
        var elements = function (titleYear, value) {
          this.titleYear = titleYear;
          this.value = value;
        };
        options.push(new elements('año 2018', '2018'));
        options.push(new elements('año 2019', '2019'));
        options.push(new elements('año 2020', '2020'));
        widget.yearsOption(options);
      },

      showTeams: function(viewModel, event) {
        var widget = this;
        if (event !== undefined && (event.originalEvent || event == '')) {
          var selectElement = event.currentTarget;
          var year = selectElement.options[selectElement.selectedIndex].getAttribute("value");
    
          var nationalLeague = false;
          var arrayAmerica=[];
          var arrayNational= [];
          widget.americaTable('');
          widget.nationalTable('');

          var settings = {
            "url": "https://v1.baseball.api-sports.io/teams?league=1&season=" + year,
            "method": "GET",
            "timeout": 0,
            "headers": {
              "x-rapidapi-key": "c6c14a54e6d13a5a739f91ff3adf963c",
              "x-rapidapi-host": "v1.basketball.api-sports.io"
            },
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
            for (var i = 0; i <= response.response.length - 1; i++) {
              if (response.response[i].name == "National League") {
                nationalLeague = true; 
              }
              if (nationalLeague) {
                arrayNational.push(response.response[i]);
                
              } else {
                arrayAmerica.push(response.response[i]);
                
              }
            }
            arrayAmerica.sort(function (a, b) {
              if (a.id > b.id) {
                return 1;
              }
              if (a.id < b.id) {
                return -1;
              }
           
              return 0;
            });
            arrayNational.sort(function (a, b) {
              if (a.id > b.id) {
                return 1;
              }
              if (a.id < b.id) {
                return -1;
              }
             
              return 0;
            });
            
            widget.americaTable(arrayAmerica);
            widget.nationalTable(arrayNational);

          });
        }
      },

      beforeAppear : function(page) {
        var widget = this;
        widget.yearOfTable();
      },
    }
  }
);
