// Instantiate map, map tiles, other variables
var mapTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/pjleonard37.mal9bi3m/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoic2YyV2luUSJ9.lPoix24JhyR8sljAwjHg9A', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
      id: 'pjleonard37.mal9bi3m',
      accessToken: 'pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoic2YyV2luUSJ9.lPoix24JhyR8sljAwjHg9A'
});
var map = L.map('map').setView([39.9500, -75.1667], 13);
//var crimepoints;
//var geojson;

// Pull in crime data from Philly Gov
// function crimeRequest(requestpolygon, geography){
//   var crimedataurl = 'http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents_Part1_Part2_Last30/MapServer/0/query?geometry={"rings":' + requestpolygon + ',"spatialReference":{"wkid":4326}}&&geometryType=esriGeometryPolygon&spatialRel=esriSpatialRelContains&outFields=*&inSR=4326&outSR=4326&f=pjson&pretty=true';
//   var violentcrimedataurl = 'http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents_Part1_Part2_Last30/MapServer/0/query?geometry={rings:' + requestpolygon + ',spatialReference:{wkid:4326}}&&geometryType=esriGeometryPolygon&where=UCR_GENERAL%3D%27400%27+OR+UCR_GENERAL%3D%27300%27+OR+UCR_GENERAL%3D%27200%27+OR+UCR_GENERAL%3D%27100%27&spatialRel=esriSpatialRelContains&outFields=*&inSR=4326&outSR=4326&f=pjson&pretty=true';
//   var crimedata = [];
//   var crime;
//   var marker;
//
//   crimepoints = L.layerGroup();
//   $.getJSON(crimedataurl, function(data) {
//     var i;
//     var l = data.features.length;
//     for(i = 0; i < l; i++) {
//       crime = data.features[i].attributes;
//       marker = L.marker([data.features[i].geometry.y, data.features[i].geometry.x], {title: crime.UCR_GENERAL});
//       crimepoints.addLayer(marker);
//       crimedata.push(data.features[i]);
//     }
//   });
//   if (geography){
//     $.getJSON(violentcrimedataurl, function(data) {
//       var i;
//       var l = data.features.length;
//       for (i = 0; i < l; i++) {
//         crime = data.features[i].attributes;
//         marker = L.marker([data.features[i].geometry.y, data.features[i].geometry.x], {title: crime.UCR_GENERAL});
//         crimepoints.addLayer(marker);
//         crimedata.push(data.features[i]);
//       }
//     });
//   }
//   return crimedata;
// };

// //Build geography based upon user selection
// $('#zoneSelect').on('change', function() {
//   var that = this;
//   var geography = true;
//   var requestpolygon = '[[[-75.0252,40.1331],[-75.0143,40.1385],[-74.9650,40.1166],[-74.9759,40.0509],[-75.0581,39.9907],[-75.1348,39.9523],[-75.1402,39.8866],[-75.2114,39.8647],[-75.2607,39.8757],[-75.2334,39.9359],[-75.2772,39.9742],[-75.2060,40.0126],[-75.2662,40.0564],[-75.2224,40.0947],[-75.1074,40.0454]]]';
//
//   crimeRequest(requestpolygon, geography);
//   $('#locationinfobox').text("Locations loading . . .");
//   if(geojson){
//     map.removeLayer(geojson);
//     $('#name').text("");
//     $('#address').text("");
//     $('#neighborhood').text("");
//     $('#crime').text("");
//     $('#crimedetails').text("");
//   }
//   $(document).one("ajaxStop", function() {
//     switch(that.value){
//       case "apartments":
//         buildGeography('link[rel="buildings"]',600,"apartments");
//         break;
//       case "neighborhoods":
//         buildGeography('link[rel="neighborhoods"]',0,"neighborhoods");
//         break;
//       case "zipcodes":
//         buildGeography('link[rel="zipcodes"]',0,"zipcodes");
//         break;
//       default:
//         $('#locationinfobox').text("");
//     }
//   });
// });

// // Build geography layers
// function buildGeography (geojsonlink, buffer, geographytype){
//   var crimecountarray = [];
//   var crimepointsgeo = crimepoints.toGeoJSON();
//   var geographyid = 0;
//
//   // Pull in information from correct GeoJSON
//   $.getJSON($(geojsonlink).attr("href"), function(data) {
//     var buffered;
//     geojson = L.geoJson(data, {
//       onEachFeature: function (feature, layer) {
//         buffered = turf.buffer(feature, buffer, 'meters');
//         var countPt = turf.count(buffered, crimepointsgeo, 'crimecount');
//         feature.properties.Crime_Count = countPt.features[0].properties.crimecount;
//         feature.properties.BufferPolygon = countPt.features[0].geometry.coordinates[0];
//         feature.properties.geographyid = geographyid;
//         crimecountarray.push(feature.properties.Crime_Count);
//         geographyid++;
//       },
//       // Style apartment markers
//       pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, {
//             radius: 8,
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.8
//         });
//       }
//     });
//     $('#locationinfobox').text("Select a location to learn more");
//
//     // Build safety rating for geography
//     safetyRating(crimecountarray);
//
//     // Add information and functionality to layers
//     geojson.eachLayer(function (layer) {
//         layer.feature.properties.WeightedCrimeCount = crimecountarray[layer.feature.properties.geographyid];
//         layer.on('click', function(e) {
//           geography = false;
//           var locationgeography = layer.feature.properties.BufferPolygon;
//           var locationjoined = locationgeography.join("],[");
//           var locationjoinedformatted = "[[[" + locationjoined + "]]]"
//           var datareturned = crimeRequest(locationjoinedformatted, geography);
//
//           // Fill in information
//           switch (geographytype){
//             case "apartments":
//               $('#name').html("<b>Property name: </b>" + layer.feature.properties.Building_Name);
//               $('#address').html("<b>Address: </b>" + layer.feature.properties.Street);
//               $('#neighborhood').html("<b>Neighborhood: </b>" + layer.feature.properties.Neighborhood);
//               $('#crime').html("<b>Safety rating: </b>" + layer.feature.properties.WeightedCrimeCount);
//               break;
//             case "neighborhoods":
//               $('#name').html("<b>Neighborhood name: </b>" + layer.feature.properties.mapname);
//               $('#crime').html("<b>Safety rating: </b>" + layer.feature.properties.WeightedCrimeCount);
//               break;
//             case "zipcodes":
//               $('#name').html("<b>Zip Code: </b>" + layer.feature.properties.CODE);
//               $('#crime').html("<b>Safety rating: </b>" + layer.feature.properties.WeightedCrimeCount);
//           }
//
//           // Call for expanded list of local reported crimes
//           $(document).one("ajaxStop", function() {
//             var crimecount = {
//               Homicide  : 0,
//               Rape  : 0,
//               Robbery : 0,
//               Assault : 0,
//               Burglary  : 0,
//               Theft : 0
//             };
//             var i = 0;
//             var l = datareturned.length;
//
//             // Build reported crime count
//             for (i = 0; i < l; i++){
//                switch (datareturned[i].attributes.UCR_GENERAL) {
//                   case "100":
//                       crimecount.Homicide++;
//                       break;
//                   case "200":
//                       crimecount.Rape++;
//                       break;
//                   case "300":
//                       crimecount.Robbery++;
//                       break;
//                   case "400":
//                       crimecount.Assault++;
//                       break;
//                   case "500":
//                       crimecount.Burglary++;
//                       break;
//                   case "600":
//                       crimecount.Theft++;
//                       break;
//                   default:
//                       crimecount.Theft++;
//                       break;
//               }
//             }
//
//             // Add in crimes; plural modifications
//             var recentcrimedescription = "<ul>"
//             $.each(crimecount, function(key, value) {
//               if (value > 1){
//                 if(key === "Robbery")
//                 {
//                   recentcrimedescription += "<li>" + value + " Robberies</li>";
//                 }
//                 else if(key === "Burglary")
//                 {
//                   recentcrimedescription += "<li>" + value + " Burglaries</li>";
//                 }
//                 else
//                 {
//                   recentcrimedescription += "<li>" + value + " " + key + "s</li>";
//                 }
//               }
//               else if (value === 1){
//                 recentcrimedescription += "<li>" + value + " " + key + "</li>";
//               }
//             })
//             recentcrimedescription += "</ul>"
//             $('#crimedetails').html("<b>Reported crimes in the past month: </b>");
//             $('#crimedetails').append(recentcrimedescription);
//           });
//         });
//         layer.setStyle({
//           color: getColor(layer.feature.properties.WeightedCrimeCount),
//           fillOpacity: 0.5,
//           weight: 5
//         });
//     });
//     geojson.addTo(map);
//   });
// }
//
// // Color selection
// function getColor(d) {
//     return d > 98 ? '#4575b4' :
//            d > 84  ? '#91bfdb' :
//            d > 50  ? '#e0f3f8' :
//            d > 16   ? '#fee090' :
//            d > 2   ? '#fc8d59' :
//                       '#d73027';
// }
//
// // Safety weighting method
// function safetyRating (crimecountarray){
//   var ratio = Math.max.apply(this, crimecountarray) / 100;
//   var l = crimecountarray.length;
//   var i;
//
//   for ( i = 0; i < l; i++ )
//   {
//       crimecountarray[i] = (100 - Math.round( crimecountarray[i] / ratio ));
//   }
//   return crimecountarray;
// }
//
// // Build map legend
// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function (map) {
//
//     var div = L.DomUtil.create('div', 'info legend');
//     var ranks = [0, 2, 16, 50, 84, 98];
//
//     div.innerHTML += "<h4>Safety Score</h4>";
//     for (var i = 0; i < ranks.length; i++) {
//         div.innerHTML += '<i style="background:' + getColor(ranks[i] + 1) + '"></i> ' + ranks[i] + (ranks[i + 1] ? '&ndash;' + ranks[i + 1] + '<br>' : '+');
//     }
//     return div;
// };

// Add necessary things to map
//legend.addTo(map);
mapTiles.addTo(map);
L.control.scale().addTo(map);
