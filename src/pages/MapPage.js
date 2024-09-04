import React, { useEffect, useRef, useState } from 'react';

const MapPage = () => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [places, setPlaces] = useState([]);
  const [showPlacesList, setShowPlacesList] = useState(true);
  const [query, setQuery] = useState("");
  const [distances, setDistances] = useState({});
  const [directionsSteps, setDirectionsSteps] = useState([]);
  const [isListening, setIsListening] = useState(false); // 음성 인식 상태
  const recognitionRef = useRef(null); // 음성 인식 참조

  window.initMap = () => {
    setMapLoaded(true);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current position:", error);
          alert("현재 위치를 가져올 수 없습니다. 위치 서비스를 활성화해 주세요.");
        }
      );
    } else {
      alert("Geolocation API를 지원하지 않는 브라우저입니다.");
    }
  };

  useEffect(() => {
    getUserLocation();

    const loadGoogleMapsScript = () => {
      const existingScript = document.getElementById('googleMaps');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCzx-t7oxFd2X4i9tBxgDucOyTZXWHW05I&libraries=places,geometry&callback=initMap`;
        script.id = 'googleMaps';
        script.async = true;
        script.defer = true;

        script.onerror = () => {
          console.error("Failed to load the Google Maps script.");
        };

        document.body.appendChild(script);
      } else {
        if (window.google && window.google.maps) {
          setMapLoaded(true);
        } else {
          console.error("Google Maps API failed to load properly.");
        }
      }
    };

    loadGoogleMapsScript();

    // Web Speech API 설정
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ko-KR'; // 한국어 설정
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript); // 음성으로 받아온 텍스트를 검색어로 설정
        setShowPlacesList(true); // 검색 결과 리스트를 다시 표시
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (mapLoaded && currentPosition) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: currentPosition,
        zoom: 12,
      });

      const service = new window.google.maps.places.PlacesService(map);

      const searchNearbyPlaces = (query) => {
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

      if (query.length > 2) {
        searchNearbyPlaces(query);
      }
    }
  }, [mapLoaded, currentPosition, query]);

  const handlePlaceSelect = (place) => {
    const destination = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setShowPlacesList(false);

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(mapRef.current, {
      center: currentPosition,
      zoom: 12,
    });
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

  const handleVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start(); // 음성 인식 시작
    }
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#1d1d1d', color: '#fff', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          ref={autocompleteRef}
          type="text"
          placeholder="여기서 검색하세요..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowPlacesList(true);
          }}
          style={{
            width: 'calc(100% - 50px)', // 검색바가 음성 버튼을 제외한 공간을 차지하게 조정
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            marginRight: '10px',
            backgroundColor: '#2c2c2c',
            color: '#fff',
          }}
        />
        <button
          onClick={handleVoiceInput}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: isListening ? '#ffaa00' : '#2c2c2c',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          🎤
        </button>
      </div>

      {showPlacesList && places.length > 0 && (
        <div style={{
          backgroundColor: '#2c2c2c',
          borderRadius: '8px',
          padding: '8px',
          zIndex: 1,
          position: 'relative',
          width: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
            {places.map((place, index) => (
              <li
                key={index}
                onClick={() => handlePlaceSelect(place)}
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #3d3d3d',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <strong>{place.name}</strong>
                  <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>{place.vicinity}</p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>
                    {distances[place.place_id] ? `거리: ${distances[place.place_id]} km` : '계산 중...'}
                  </p>
                </div>
                <button style={{
                  backgroundColor: '#ffaa00',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  color: '#000',
                  fontWeight: 'bold'
                }}>선택</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div ref={mapRef} style={{ width: '100%', height: '400px', marginTop: '20px' }} />

      {directionsSteps.length > 0 && (
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#2c2c2c', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto' }}>
          <h3>가는 길</h3>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0', color: '#fff' }}>
            {directionsSteps.map((step, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <div dangerouslySetInnerHTML={{ __html: step.instructions }} style={{ fontSize: '14px', marginBottom: '4px' }} />
                <small style={{ color: '#aaa' }}>{step.distance} - {step.duration}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapPage;
