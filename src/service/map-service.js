export function geocoding(adressToCoordinate){
    let geocoder = new window.google.maps.Geocoder();
    console.log(geocoder)
    let coordinates = {
        lat:null,
        lng:null
    }
    return geocoder.geocode({
        address: adressToCoordinate,
        
    }, (results, status) => {
                if (status == window.google.maps.GeocoderStatus.OK) {
                    console.log(results[0].geometry.location.lat());
                    console.log(results[0].geometry.location.lng());
                    coordinates.lat = (Number(results[0].geometry.location.lat()))
                    coordinates.lng = (Number(results[0].geometry.location.lng()))
                    console.log("geocoding:" + JSON.stringify(coordinates))
                    return coordinates
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            
}