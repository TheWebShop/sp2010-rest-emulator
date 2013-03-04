# SharePoint 2010 REST emulation in nodejs

A bare bones implementation of the [SharePoint 2010 REST interface][rest intro] designed to help in developing rich web interfaces without requiring a live SP environment. For detailed installation and usage instructions please see the [wiki](http://thewebshop.github.com/sp2010-rest-emulator/).

## [Documentation][docs]

## Installation

 1. [Install latest 0.8.x NodeJS][node home].
 2. `git clone https://github.com/TheWebShop/sp2010-rest-emulator.git` clone this repository to your workspace.
 3. `npm install` install its dependencies using the [Node Package Manager][node home] (don't worry, this came with node.js).
 4. `node server.js` start up the emulator.

You should now be able to make REST requests from [http://localhost:8080/\_vti\_bin/listData.svc/][local rest]

## Build the example project

This repository comes with an included example project, a derivative of the [DataTables dynamic creation example][dt ex1]. It demonstrates a pattern we have found foundational to simple use of the REST interface to create custom data visualizations.

 1. `npm install bower -g` you will need Twitter's [Bower][bower home] package manager for this example.
 2. `cd public` all files here are served as static content, just like normal media is in a SP2010 (eg: .html, .css, .js, etc.).
 3. `bower install` to fetch the vendor libraries we've used ([jQuery][jQuery home], [DataTables][dt home]).

You should now be able to access the example project from [http://localhost:8080/][local root]

## Deploy to SharePoint site

When you've finished developing locally and it's time to move your work to the server the only thing that needs to make the journey is the contents of your `/public` folder.

 1. Copy any dependencies you need from `/public` to your SharePoint site.
 2. Verify the paths to your resources (eg: `/css`, `/js`, `/components`, etc.) in case they are no longer accessible from where you have placed your html.
 3. Verify your REST target within any javascript your have written. If you have made a request to something like `/_vti_bin/listData.svc/Browsers` be sure that this still works in the context of your server. You may need to include the paths of sub-sites (eg: `SubSite/_vti_bin/listData.svc/Browsers`).

## API

The following filters and operators have been implemented int he simulation so far. The descriptions are from the MSDN's [Using Microsoft ADO.NET Data Services][rest docs].

<table>
  <tr>
    <th>Option</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>orderby</td>
    <td>Sort the results by the criteria given in this value. Multiple properties can be indicated by separating them with a comma. The sort order can be controlled by using the “asc” (default) and “desc” modifiers.</td>
    <td>/Customers?$orderby=City
/Customers?$orderby=City desc
/Customers?$orderby=City desc,CompanyName asc</td>
  </tr>
  <tr>
    <td>skip</td>
    <td>Skip the number of rows given in this parameter when returning results. This is useful in combination with “top” to implement paging (e.g. if using 10-entity pages, saying $skip=30&top=$10 would return the fourth page). NOTE: Skip only makes sense on sorted sets; if an orderby option is included, ‘skip’ will skip entities in the order given by that option. If no orderby option is given, ‘skip’ will sort the entities by primary key and then perform the skip operation.</td>
    <td>--return all customers except the first 10
/Customers?$skip=10
--return the 4th page, in 10-row pages
/Customers?$skip=30&$top=10</td>
  </tr>
  <tr>
    <td>top</td>
    <td>Restrict the maximum number of entities to be returned. This option is useful both by itself and in combination with skip, where it can be used to implement paging as discussed in the description of ‘skip’.</td>
    <td>--top 5 sales orders
/Customers?$top=5
--top 5 sales orders with the highest TotalDue
/Orders?$orderby=TotalDue&$top=5</td>
  </tr>
</table>

[bower home]: http://twitter.github.com/bower/
[docs]: https://github.com/TheWebShop/sp2010-rest-emulator/wiki
[dt ex1]: http://www.datatables.net/release-datatables/examples/data_sources/js_array.html
[dt home]: http://www.datatables.net/
[jQuery home]: http://jquery.com/
[local rest]: http://localhost:8080/_vti_bin/listData.svc/
[local root]: http://localhost:8080/
[node home]: http://nodejs.org
[rest docs]: http://msdn.microsoft.com/en-us/library/cc907912.aspx
[rest intro]: http://msdn.microsoft.com/en-ca/library/ff521587(v=office.14).aspx
