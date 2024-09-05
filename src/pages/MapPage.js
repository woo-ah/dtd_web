import React, { useEffect, useRef, useState } from 'react';
import '../css/MapPage.css'; // CSS 파일 임포트
import { searchNearbyPlaces, getDirections } from '../services/MapService'; // MapService.js에서 함수들 임포트
import SearchBar from '../components/MapPage/SearchBar';
import PlacesList from '../components/MapPage/PlacesList';
import DirectionsList from '../components/MapPage/DirectionsList';

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
  const [showDirections, setShowDirections] = useState(false); // DirectionsList를 보여줄지 여부

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

      if (query.length > 2) {
        searchNearbyPlaces(map, currentPosition, query, setPlaces, setDistances);
      }
    }
  }, [mapLoaded, currentPosition, query]);

  const handlePlaceSelect = (place) => {
    const destination = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setShowPlacesList(false);

    const map = new window.google.maps.Map(mapRef.current, {
      center: currentPosition,
      zoom: 12,
    });

    getDirections(map, currentPosition, destination, setDirectionsSteps);
    setShowDirections(true); // DirectionsList를 보여줌
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start(); // 음성 인식 시작
    }
  };

  const handleCloseDirections = () => {
    setShowDirections(false); // DirectionsList 닫기
  };

  return (
    <div className="map-page">
      <SearchBar
        query={query}
        setQuery={(value) => {
          setQuery(value);
          setShowPlacesList(true);
        }}
        handleVoiceInput={handleVoiceInput}
        isListening={isListening}
        autocompleteRef={autocompleteRef}
      />

      {showPlacesList && places.length > 0 && (
        <PlacesList places={places} handlePlaceSelect={handlePlaceSelect} distances={distances} />
      )}

      <div ref={mapRef} className="map-container" />

      {showDirections && directionsSteps.length > 0 && (
        <DirectionsList directionsSteps={directionsSteps} onClose={handleCloseDirections} />
      )}
    </div>
  );
};

export default MapPage;
