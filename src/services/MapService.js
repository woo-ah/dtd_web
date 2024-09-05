export const searchNearbyPlaces = (map, currentPosition, query, setPlaces, setDistances) => {
    const service = new window.google.maps.places.PlacesService(map);
    
    const request = {
      location: currentPosition,
      radius: '5000',
      keyword: query,
    };
  
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces(results);
  
        const distancesObj = {};
        results.forEach((place) => {
          const destination = place.geometry.location;
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(currentPosition.lat, currentPosition.lng),
            destination
          );
          distancesObj[place.place_id] = (distance / 1000).toFixed(2);
        });
        setDistances(distancesObj);
      } else {
        console.error("Places search failed: " + status);
      }
    });
  };
  
  export const getDirections = (map, currentPosition, destination, setDirectionsSteps) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
  
    directionsRenderer.setMap(map);
  
    directionsService.route(
      {
        origin: currentPosition,
        destination: destination,
        travelMode: window.google.maps.TravelMode.TRANSIT,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
  
          const steps = result.routes[0].legs[0].steps.map((step) => ({
            distance: step.distance.text,
            duration: step.duration.text,
            instructions: step.instructions,
          }));
          setDirectionsSteps(steps);
        } else if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
          console.error("No routes found.");
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };
  