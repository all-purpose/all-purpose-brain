$(function () {
  // Start with your project-level client-side javascript here.
  // JQuery and lodash (_) are both included with Apostrophe, so no need to
  // worry about including them on your own.
  
  console.log('Hello world.');
  var header = $('#page-header');
  var headerText = $.trim($('#header-title').text());
  var body = $('#article-container');
  var search = $('#header-search-bar');
  var headerHeight = header.outerHeight();
  var userHeight = $('#header-user').outerHeight();
  var scrollBp = headerHeight - userHeight;
  var stuck = false;

  var stickHeader = function () {
    header.addClass('stuck');
    body.css('marginTop', headerHeight);
    search.attr('placeholder', headerText);
    stuck = true;
  }

  var unstickHeader = function () {
    header.removeClass('stuck');
    body.css('marginTop', 'unset');
    search.attr('placeholder', 'I\'m looking for')
    // search.css('bottom', '0');
    stuck = false;
  }

  // var scrollSearch = function () {
  //   var margin_top = ($(window).scrollTop() - scrollBp);
  //   console.log(margin_top);
  //   search.css('bottom', margin_top);
  // }
  
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > scrollBp) {
      // console.log($(window).scrollTop());
      if (stuck == false) {
        window.requestAnimationFrame(stickHeader);
      }
      // if ($(window).scrollTop() < headerHeight - (userHeight / 2)) {
      //   window.requestAnimationFrame(scrollSearch);
      // }
    } else if ($(window).scrollTop() < scrollBp && stuck == true) {
      window.requestAnimationFrame(unstickHeader);
    }
  });
});
