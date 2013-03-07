(function(){
  $(function() {
    /*var $lists = $('#lists');
    $.getJSON('/_vti_bin/listData.svc', function(data) {
      var lists = data.d.EntitySets;
      $.each(lists, function(i, name) {
        $('<li><a href="/_vti_bin/listData.svc/' + name + '">' + name + '</a></li>')
          .appendTo($lists);
      });
    });*/
    
    $('#demo-root').on('click', function() {
      $.getJSON('/_vti_bin/listData.svc', function(data) {
        $('#result-root').text( JSON.stringify(data, null, 2) );
        console.log(data);
        Prism.highlightAll();
        $('#demo-root').text('Ya way!');
      });
    });
  });
}(jQuery));