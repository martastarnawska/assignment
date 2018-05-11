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


  n1 = localStorage.getItem('titleA');
  n2 = localStorage.getItem('titleB');
  n3 = localStorage.getItem('titleC');
  t1 = localStorage.getItem('typeA');
  t2 = localStorage.getItem('typeB');
  t3 = localStorage.getItem('typeC');
  console.log(t3);

  // specify table titles
  $(".title1").text(n1);
  $(".title2").text(n2);
  $(".title3").text(n3);
    // $(".heading1").text(n1);
    // $(".heading2").text(n2);
    // $(".heading3").text(n3);

  // specify inputs titles
    $("#titleA").text(n1);;
    $("#titleB").text(n2);
    $("#titleC").text(n3);

  // Hide boolean input
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



  // variables wich will be properties of an object;
  var a;
  var b;
  var c;


  var elements;

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


  if (localStorage.getItem('items')) {
  elements = JSON.parse(localStorage.getItem('items'));
  } else {
  elements = [];
  }

  // store array in localStorage - convert to string and back to data
  localStorage.setItem('items', JSON.stringify(elements));
  var data = JSON.parse(localStorage.getItem('items'));

  // Adding new rows to table
  $("#newButton").click(function() {
    // geting values from inputs and puting them into object
    a = $("#inputA").val();
    b = $("#inputB").val();
    c = $("#inputC").val();
    // czyszczenie inputów
      $("#inputA").val("");
      $("#inputB").val("");
      $("#inputC").val("");

      if (t1 == 'boolean') {
        a = '<input class="checkbox" type="checkbox">';
      } else if (t2 == 'boolean') {
        b = '<input class="checkbox" type="checkbox">';
      } else if (t3 == 'boolean') {
        c = '<input class="checkbox" type="checkbox">';
      }

    var object = {
      first: a,
      second: b,
      third: c,
    }
    // Adding new object into array

    elements.unshift(object);
    localStorage.setItem("items", JSON.stringify(elements));



    $(".rows").append("<div>"+elements[0].first+"</div>");
    $(".rows").append("<div>"+elements[0].second+"</div>");
    $(".rows").append("<div class='cell'>"+elements[0].third+"</div>");

    chunk = $(".rows").children();
    chunkLength = chunk.length;
    pageNumber = Math.ceil(chunkLength / chunksPerPage);


    if (presentPage = 1 && chunkLength > 15) {
      var first = chunksPerPage * (pageNumber -1);
      var last = first + chunksPerPage;

      chunk.hide();
      chunk.slice(first, last).show();

      pageNumber = Math.ceil(chunkLength / chunksPerPage);
      presentPage = pageNumber;

    } else if (presentPage < pageNumber) {
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
console.log(presentPage);
console.log(pageNumber);
info();


  });

    var newRow = function(item) {
      $(".rows").prepend("<div class='cell'>"+item.third+"</div>");
      $(".rows").prepend("<div>"+item.second+"</div>");
      $(".rows").prepend("<div>"+item.first+"</div>");
    }

  // odtwarzanie przy odświeżaniu
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
      // presentPage = 1;
      console.log(presentPage);
    } else {
      chunk.show();
    }
  }




  start = function() {
    chunksPerPage = 15;
    pagination();
  };

  var info = function() {
    itemsPerPage = chunksPerPage / 3
    itemsLength = chunkLength / 3;
    var first = ((presentPage - 1) * itemsPerPage) + 1;
    if (presentPage === pageNumber) {
      var last = itemsLength;
    } else {
      var last = (first + itemsPerPage) - 1;
    }
    var comunicat = first + "-" + last + " of " + itemsLength;
    $(".info").text(comunicat);

  }
  info();

  $(".select").on('change', function(){
    // select = $("#select[name=selector]");'
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
    console.log(presentPage);
    info();
  })




  $(".nextPage").click(function() {
    // selected = select.val();
    // chunksPerPage = selected * 3;
    if (pageNumber !== presentPage) {
      var first = chunksPerPage * presentPage;
      var last = first + chunksPerPage;
      // var first = chunksPerPage * presentPage;
      // var last = first + chunksPerPage;
      chunk.hide();
      chunk.slice(first, last).show();
      presentPage++;
      pageNumber = Math.ceil(chunkLength / chunksPerPage);
      console.log(presentPage);
      console.log(pageNumber)
      info();
    }
  });



  $(".previous").click(function() {
    if (presentPage !== 1) {
      presentPage--;
      var first = chunksPerPage * (presentPage - 1);
      var last = first + chunksPerPage
      chunk.hide();
      chunk.slice(first, last).show();
      pageNumber = Math.ceil(chunkLength / chunksPerPage);
      console.log(presentPage);
      console.log(pageNumber)
      info();
    }
  });

  start();
  console.log(chunkLength)


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

    // $(".dropdown").hide();

    // $(".sort").hide();


    $(".heading1").click(function() {
      $("#sort1").show();
    });

    $(".heading2").click(function() {
      $("#sort2").show();
    });

    $(".heading3").click(function() {
      $("#sort3").show();
    });

    //
    // $("#ascending1").click(function() {
    //   sort('first');
    //   $("#sort1").hide();
    //   $(".t1").css('text-decoration', 'underline');
    //
    // });
    //
    // $("#ascending2").click(function() {
    //   sort('second');
    //   $("#sort2").hide();
    //   $(".t2").css('text-decoration', 'underline');
    // });
    //
    // $("#ascending3").click(function() {
    //   sort('third');
    //   $("#sort3").hide();
    //   $(".t3").css('text-decoration', 'underline');
    // });
    //
    // $("#descending1").click(function() {
    //   sortDescending('first');
    //   $("#sort1").hide();
    //   $(".t1").css('text-decoration', 'underline');
    // });
    //
    // $("#descending2").click(function() {
    //   sortDescending('second');
    //   $("#sort2").hide();
    //   $(".t2").css('text-decoration', 'underline');
    //
    // });
    // $("#descending3").click(function() {
    //   sortDescending('third');
    //   $("#sort2").hide();
    //   $(".t3").css('color', 'orange');
    // });

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
