var headers;

var name1;
var name2;
var name3;
var type1;;
var type2;
var type3;

var n1;
var n2;
var n3;
var t1;
var t2;
var t3;


$("#btn1").click(function() {
  localStorage.clear();
  name1 = $("#input1").val();
  name2 = $("#input2").val();
  name3 = $("#input3").val();
  type1 = $("#dropdown1").val();
  type2 = $("#dropdown2").val();
  type3 = $("#dropdown3").val();

  localStorage.setItem('table', headers);
  var tableInfo = localStorage.getItem('titles');
  headers = {
      titleA: name1,
      titleB: name2,
      titleC: name3,
      typeA: type1,
      typeB: type2,
      typeC: type3,
    }

  localStorage.setItem('titleA', name1);
  localStorage.setItem('titleB', name2);
  localStorage.setItem('titleC', name3);
  localStorage.setItem('typeA', type1);
  localStorage.setItem('typeB', type2);
  localStorage.setItem('typeC', type3);
});

// get localStorage at table.html:
  n1 = localStorage.getItem('titleA');
  n2 = localStorage.getItem('titleB');
  n3 = localStorage.getItem('titleC');
  t1 = localStorage.getItem('typeA');
  t2 = localStorage.getItem('typeB');
  t3 = localStorage.getItem('typeC');

  // specify table titles
  $(".title1").text(n1);
  $(".title2").text(n2);
  $(".title3").text(n3);

  // Disable boolean input
  if (t1 == 'boolean') {
    $("#inputA").prop('disabled', true);
  } else if (t2 == 'boolean') {
    $("#inputB").prop('disabled', true);
  } else if (t3 == 'boolean') {
    $("#inputC").prop('disabled', true);
  };

  // specify types of inputs
  $("#inputA").prop('type', t1);
  $("#inputB").prop('type', t2);
  $("#inputC").prop('type', t3);

  // variables to store data from inputs
  var a;
  var b;
  var c;


  var elements; // array to store objects with data

  var chunk;
  var chunkLength;
  var pageNumber;
  var start;
  var info;
  var presentPage;

  // rows per page:
  var select = $("#select[name=selector]");
  var selected;

  var chunksPerPage;
  chunksPerPage = 15;
  var itemsPerPage;
  var itemsLength;

// Get data from local storage or create an empty array
  if (localStorage.getItem('items')) {
  elements = JSON.parse(localStorage.getItem('items'));
  } else {
  elements = [];
  }

  // store array in localStorage - convert to string and back to data
  localStorage.setItem('items', JSON.stringify(elements));
  var data = JSON.parse(localStorage.getItem('items'));



  // Adding new row to the table

  $("#newButton").click(function() {
    // geting values from inputs
    a = $("#inputA").val();
    b = $("#inputB").val();
    c = $("#inputC").val();
    // cleaning inputs
    $("#inputA").val("");
    $("#inputB").val("");
    $("#inputC").val("");

  // Adding checkbox in boolean column
    if (t1 == 'boolean') {
      a = '<input class="checkbox" type="checkbox">';
    } else if (t2 == 'boolean') {
      b = '<input class="checkbox" type="checkbox">';
    } else if (t3 == 'boolean') {
      c = '<input class="checkbox" type="checkbox">';
    }

    // Storing data in object
    var object = {
      first: a,
      second: b,
      third: c,
    }

    // Adding new object into array & saving array in local storage
    elements.unshift(object);
    localStorage.setItem("items", JSON.stringify(elements));

    // Adding row to the table
    $(".rows").append("<div>"+elements[0].first+"</div>");
    $(".rows").append("<div>"+elements[0].second+"</div>");
    $(".rows").append("<div class='cell'>"+elements[0].third+"</div>");

    chunk = $(".rows").children(); // all divs stored in the table
    chunkLength = chunk.length;
    pageNumber = Math.ceil(chunkLength / chunksPerPage);



    if (presentPage = 1 && chunkLength > chunksPerPage) {
      var first = chunksPerPage * (pageNumber -1);
      var last = first + chunksPerPage;
      chunk.hide();
      chunk.slice(first, last).show();
      pageNumber = Math.ceil(chunkLength / chunksPerPage);
      presentPage = pageNumber;
    }

     else if (presentPage < pageNumber) {
      var first = chunksPerPage * (pageNumber -1);
      var last = first + chunksPerPage;
      chunk.hide();
      chunk.slice(first, last).show();
      presentPage = pageNumber;
    }  else if (presentPage === pageNumber) {
      var first = chunksPerPage * pageNumber;
      var last = first + chunksPerPage;
      chunk.hide();
      chunk.slice(first, last).show();
      presentPage = pageNumber;
    }
    info();
  });


  var newRow = function(item) {
    $(".rows").prepend("<div class='cell'>"+item.third+"</div>");
    $(".rows").prepend("<div>"+item.second+"</div>");
    $(".rows").prepend("<div>"+item.first+"</div>");
  }

  //
    data.forEach(function(item) {
    newRow(item);
  });

  chunk = $(".rows").children();
  chunkLength = chunk.length;
  presentPage = 1;


  var pagination = function() {
    if (chunkLength > chunksPerPage) {
      chunk.hide();
      chunk.slice(0, chunksPerPage).show();
      pageNumber = Math.ceil(chunkLength / chunksPerPage);
    } else {
      chunk.show();
    }
  }

  start = function() {
    chunksPerPage = 15;
    pagination();
  };

// information about pagination
  var info = function() {
    itemsPerPage = chunksPerPage / 3
    itemsLength = chunkLength / 3;
    if (chunkLength === 0) {
      var first = 0;
      var last = 0;
    } else {
      var first = ((presentPage - 1) * itemsPerPage) + 1;
      if (presentPage === pageNumber) {
        var last = itemsLength;
      } else {
        var last = (first + itemsPerPage) - 1;
      }
    }

    var comunicat = first + "-" + last + " of " + itemsLength;
    $(".info").text(comunicat);
  }
  info();

// Seting number rows per pager
  $(".select").on('change', function(){
    presentPage = 1;
    selected = select.val();
    $(".number").text("rows per page: " + selected);
    chunksPerPage = selected * 3;
    if (chunkLength > chunksPerPage) {
      chunk.hide();
      chunk.slice(0, chunksPerPage).show();
    } else {
      chunk.show();
    }
    pageNumber = Math.ceil(chunkLength / chunksPerPage);
    info();
  })

// change page for next:
  $(".nextPage").click(function() {
    if (pageNumber > presentPage) {
      var first = chunksPerPage * presentPage;
      var last = first + chunksPerPage;
      chunk.hide();
      chunk.slice(first, last).show();
      presentPage++;
      pageNumber = Math.ceil(chunkLength / chunksPerPage);
      console.log(presentPage);
      console.log(pageNumber)
      info();
    }
  });

// change page for previous
  $(".previous").click(function() {
    if (presentPage !== 1) {
      presentPage--;
      var first = chunksPerPage * (presentPage - 1);
      var last = first + chunksPerPage
      chunk.hide();
      chunk.slice(first, last).show();
      pageNumber = Math.ceil(chunkLength / chunksPerPage);
      info();
    }
  });

  start();

  // Function sort Ascending
  var sort = function(column) {
  function compare(x, y) {
    if (x[column] < y[column]) {
      return - 1;
    } else if (x[column] > y[column]) {
      return  1;
    } else {
      return 0;
    }
  }
  elements.sort(compare);

  $(".rows").empty();
  for (var i = 0; i < elements.length; i++) {
    $(".rows").append("<div>"+elements[i].first+"</div>");
    $(".rows").append("<div>"+elements[i].second+"</div>");
    $(".rows").append("<div>"+elements[i].third+"</div>");
  }
  chunk = $(".rows").children();
  chunkLength = chunk.length;
  pagination();
  };

    // function sort Descending
  var sortDescending = function(column) {
    function compare(x, y) {
      if (x[column] < y[column]) {
        return - 1;
      } else if (x[column] > y[column]) {
        return  1;
      } else {
        return 0;
      }
    }
    elements.sort(compare);
    elements.reverse();

    $(".rows").empty();
    for (var i = 0; i < elements.length; i++) {
      $(".rows").append("<div>"+elements[i].first+"</div>");
      $(".rows").append("<div>"+elements[i].second+"</div>");
      $(".rows").append("<div>"+elements[i].third+"</div>");
    }
    chunk = $(".rows").children();
    chunkLength = chunk.length;
    pagination();
  };



    var sort1= $("#sort1[name=sort1]");
    var sort2= $("#sort2[name=sort2]");
    var sort3= $("#sort3[name=sort3]");

    $("#sort1").on('change', function(){
      var sorted = sort1.val();
      sort2.val("no");
      sort3.val("no");
      if (sorted == 'ascending') {
        sort('first');
      } else if (sorted == 'descending') {
        sortDescending('first');
      }
    });

    $("#sort2").on('change', function(){
      var sorted = sort2.val();
      sort1.val("no");
      sort3.val("no");
      if (sorted == 'ascending') {
        sort('second');
      } else if (sorted == 'descending') {
        sortDescending('second');
      }
    });

    $("#sort3").on('change', function(){
      var sorted = sort3.val();
      sort1.val("no");
      sort2.val("no");
      if (sorted == 'ascending') {
        sort('third');
      } else if (sorted == 'descending') {
        sortDescending('third');
      }
    });
