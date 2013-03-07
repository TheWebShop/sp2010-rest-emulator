$.getJSON('/_vti_bin/listData.svc/Browsers', function(data) {

  // Translate the returned data into something DataTables can digest, an array of arrays
  var browsers = $.map(data.d.results, function(record) {

    // we have to double wrap in order to return an array
    // since $.map flattens arrays by default http://api.jquery.com/jQuery.map/
    return [[
      record.RenderingEngine,
      record.Browser,
      record.Platforms,
      record.Version,
      record.CSSGrade
    ]];
  });

  // This is an example of using DataTables with a javascript source
  // http://www.datatables.net/release-datatables/examples/data_sources/js_array.html
  $('#example').dataTable({
    'aaData': browsers,
    'aoColumns': [
      { 'sTitle': 'Rendering Engine' },
      { 'sTitle': 'Browser' },
      { 'sTitle': 'Platform(s)' },
      { 'sTitle': 'Version', 'sClass': 'center' },
      { 'sTitle': 'Grade', 'sClass': 'center' }
    ]
  });
});
