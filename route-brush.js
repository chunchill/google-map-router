function RouteBrush () {
    var map;
    var markerIndex = 1;
    var markers = {};
    var router ={};
    //自定义地图样式
    var customMapType = new window.google.maps.StyledMapType([{
        stylers: [{
            hue: '#84969d'
        }, {
            visibility: 'simplified'
        }, {
            gamma: 1.2
        }, {
            weight: 0.7
        }]
    }, {
        elementType: 'labels',
        stylers: [{
            hue: '#84969d'
        }, {
            visibility: 'simplified'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
                hue: '#84969d'
            },


            {
                lightness: 5
            }
        ]
    }, {
        featureType: 'water',
        stylers: [{
            color: '#84969d'
        }]
    }], {
        name: 'iTMS视图'
    });
    var customMapTypeId = 'custom_style';
    //自定义地图样式


    this.setMap = function(mapId,center) {
        map = new window.google.maps.Map(document.getElementById(mapId), {
            zoom: 14,
            center: center,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
            }
        });
        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
    };


    this.addMarker = function(Lat, Lng, markerName,iconIndex) {
        markers[markerName] = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(Lat, Lng),
            map: map,
            icon: 'marker_sprite' + iconIndex + ".png"
        });
        markerIndex++;
    };

    this.setMarkerContentInfo = function(markerName, contentString) {
        var underlyingMarker = markers[markerName];
        var infowindow = new window.google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(underlyingMarker, 'click', function() {
            infowindow.open(map, underlyingMarker);
        });
    };

    this.drawOnePolyLine = function(strokeColor, strokeOpacity, strokeWeight, origin, destination, waypoints) {
        var poly = new window.google.maps.Polyline({
            strokeColor: strokeColor,
            strokeOpacity: strokeOpacity,
            strokeWeight: strokeWeight
        });
        poly.setMap(map);

        //自定义路线规划作图
        var directionsDisplay = new window.google.maps.DirectionsRenderer({
            polylineOptions: poly,
            suppressMarkers: true,
        });

        var directionsService = new window.google.maps.DirectionsService;
        //自定义路线规划作图
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {

            directionsService.route({
                origin: origin, //出发地
                destination: destination, //返回地
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    }
}