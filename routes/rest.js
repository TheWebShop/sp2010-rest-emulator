module.exports = function (app, lists, _) {
  app.get('/_vti_bin/listData.svc', main);
  app.get('/_vti_bin/listData.svc/:listName/:id', findById);
  app.get('/_vti_bin/listData.svc/:listName', find);

  // allow the user to see a collection of all available lists
  function main(req, res) {
    var available = [];

    for(var listName in lists){
      available.push(listName);
    }
    res.send({
      d: {
        EntitySets: available
      }
    });
  };


  // Single item in list
  function findById(req, res) {
    var list = lists[req.params.listName];
    var item = list? list[req.params.id]: null;

    if(!item) {
      res.send(noList(req.params.listName));
    }
    res.send({
      d: item
    });
  };


  // Contents of a list
  function find(req, res) {
    var list = lists[req.params.listName];
    var orderby = req.query.$orderby;
    var filter = req.query.$filter;
    var skip = parseInt(req.query.$skip, 10) || 0;
    var top = parseInt(req.query.$top, 10);

    if(!lists[req.params.listName]) res.send(noList(req.params.listName));

    if(filter) list = _.filter(list, function(record) {
      return true;
    });

    if(typeof orderby === 'string') {
      var re = /(\S+) ?(asc|desc)?/;
      var match = orderby.match(re);
      var direction = match[2];
      orderby = match[1];
      console.log({
        orderby: orderby,
        match: match
      })
      if(_.has(list[0], orderby)) {
        list = list.sort(function(a, b) {
          a = a[orderby] || '';
          b = b[orderby] || '';

          a = a.toString().toUpperCase();
          b = b.toString().toUpperCase();

          if(direction === 'asc') return  a>b? 1: a<b? -1: 0;
          return  a>b? -1: a<b? 1: 0;
        });
      } else {
        res.send(noProp(orderby));
      }
    }

    list = top? list.slice(skip, skip + top): list.slice(skip);

    res.send({
      d: {
        results: list
      }
    });

    function noList(listName){
      return {
        error: {
          code: '',
          message: {
            lang: 'en-US',
            value: "Resource not found for the segment '" + listName + "'."
          }
        }
      };
    }
    function noProp(prop){
      return {
        error: {
          code: '',
          message: {
            lang: 'en-US',
            value: "No property '" + prop + "' exists in type 'Microsoft.SharePoint.Linq.DataServiceEntity' at position 0."
          }
        }
      };
    }
  };
}