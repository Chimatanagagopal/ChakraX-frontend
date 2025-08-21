import React, { useEffect, useRef, useState, useCallback } from 'react';

const GoogleMap = ({ rideConfirmed, origin, destination, duration }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const directionsRendererRef = useRef(null);
  const vehicleMarkerRef = useRef(null);

  const [routePath, setRoutePath] = useState([]);
  const animationProgressRef = useRef(0);
  const animationStartTimeRef = useRef(0);
  const polylineLengthRef = useRef(0); 

  const pointA = origin;
  const pointB = destination;

  const getPointAtFractionOfPolyline = useCallback((path, fraction) => {
    if (!window.google || !window.google.maps || !window.google.maps.geometry || !path || path.length < 2) {
      return null;
    }

    const totalLength = polylineLengthRef.current;
    if (totalLength === 0) return path[0];

    const targetDistance = totalLength * fraction;
    let accumulatedDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
      const segmentStart = path[i];
      const segmentEnd = path[i + 1];
      const segmentLength = window.google.maps.geometry.spherical.computeDistanceBetween(segmentStart, segmentEnd);

      if (accumulatedDistance + segmentLength >= targetDistance) {
        
        const segmentFraction = (targetDistance - accumulatedDistance) / segmentLength;
        return window.google.maps.geometry.spherical.interpolate(segmentStart, segmentEnd, segmentFraction);
      }
      accumulatedDistance += segmentLength;
    }

    return path[path.length - 1]; 
  }, []);


  const calculateAndDisplayRoute = useCallback(() => {
    if (!mapInstance.current || !window.google || !window.google.maps || !pointA || !pointB) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    if (directionsRendererRef.current) {
        directionsRendererRef.current.setMap(null);
        directionsRendererRef.current = null;
    }
    directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
      map: mapInstance.current,
      polylineOptions: {
        strokeColor: '#4285F4',
        strokeOpacity: 0.8,
        strokeWeight: 6,
      },
      suppressMarkers: true,
    });

    directionsService.route(
      {
        origin: pointA,
        destination: pointB,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(response);
          const path = response.routes[0].overview_path;
          setRoutePath(path);

        
          if (window.google.maps.geometry) {
            polylineLengthRef.current = window.google.maps.geometry.spherical.computeLength(path);
          }

          new window.google.maps.Marker({
            position: pointA,
            map: mapInstance.current,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/green.png', // Using a standard green marker
            },
            label: {
                text: 'A',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
            }
          });
          new window.google.maps.Marker({
            position: pointB,
            map: mapInstance.current,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red.png', // Using a standard red marker
            },
            label: {
                text: 'B',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
            }
          });

        } else {
          console.error('Directions request failed due to ' + status);
          directionsRendererRef.current.setDirections({ routes: [] });
          setRoutePath([]);
          polylineLengthRef.current = 0;
        }
      }
    );
  }, [pointA, pointB]);

  useEffect(() => {
    if (window.google && window.google.maps && mapRef.current && !mapInstance.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: pointA || { lat: 17.4497, lng: 78.3752 },
        disableDefaultUI: false, // CHANGE THIS LINE TO FALSE
      });
      mapInstance.current = map;
    }

    if (mapInstance.current && pointA && pointB) {
      calculateAndDisplayRoute();
    }
  }, [calculateAndDisplayRoute, pointA, pointB]);

  useEffect(() => {
    let animationFrameId;

    const SPEED_FACTOR = 0.5;

    const animateVehicle = (currentTime) => {
      if (!animationStartTimeRef.current) {
        animationStartTimeRef.current = currentTime;
      }
      const elapsedTime = currentTime - animationStartTimeRef.current;

      let totalDurationMs = 0;
      const durationParts = duration?.match(/(\d+)\s*hour(?:s)?\s*(\d+)\s*min(?:s)?/);
      if (durationParts) {
        const hours = parseInt(durationParts[1], 10) || 0;
        const minutes = parseInt(durationParts[2], 10) || 0;
        totalDurationMs = (hours * 60 + minutes) * 60 * 1000;
      } else {
        const minutesMatch = duration?.match(/(\d+)\s*min(?:s)?/);
        if (minutesMatch) {
            totalDurationMs = parseInt(minutesMatch[1], 10) * 60 * 1000;
        }
        const hoursMatch = duration?.match(/(\d+)\s*hour(?:s)?/);
        if (hoursMatch) {
            totalDurationMs = parseInt(hoursMatch[1], 10) * 60 * 60 * 1000;
        }
      }

      const effectiveAnimationDuration = totalDurationMs * SPEED_FACTOR;

      const progress = effectiveAnimationDuration > 0 ? elapsedTime / effectiveAnimationDuration : 1;
      animationProgressRef.current = Math.min(progress, 1);

      if (animationProgressRef.current < 1) {
        const currentPosition = getPointAtFractionOfPolyline(routePath, animationProgressRef.current);
        if (currentPosition && vehicleMarkerRef.current) {
            vehicleMarkerRef.current.setPosition(currentPosition);
        }
        animationFrameId = requestAnimationFrame(animateVehicle);
      } else {
        if (vehicleMarkerRef.current) {
            vehicleMarkerRef.current.setMap(null);
            vehicleMarkerRef.current = null;
        }
        animationProgressRef.current = 0;
        animationStartTimeRef.current = 0;
      }
    };

    if (rideConfirmed && routePath.length > 0 && mapInstance.current && window.google.maps.geometry) {
      if (!vehicleMarkerRef.current) {
        vehicleMarkerRef.current = new window.google.maps.Marker({
          position: routePath[0],
          map: mapInstance.current,
          icon: {
            url: 'https://png.pngtree.com/png-clipart/20200224/original/pngtree-motorcycle-transportation-icons-vector-png-image_5224053.jpg',
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });
      } else {
           vehicleMarkerRef.current.setMap(mapInstance.current);
           vehicleMarkerRef.current.setPosition(routePath[0]);
      }
      animationProgressRef.current = 0;
      animationStartTimeRef.current = 0;
      animationFrameId = requestAnimationFrame(animateVehicle);
    } else if (!rideConfirmed && vehicleMarkerRef.current) {
        cancelAnimationFrame(animationFrameId);
        if (vehicleMarkerRef.current) {
            vehicleMarkerRef.current.setMap(null);
            vehicleMarkerRef.current = null;
        }
        animationProgressRef.current = 0;
        animationStartTimeRef.current = 0;
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [rideConfirmed, routePath, mapInstance, duration, getPointAtFractionOfPolyline]);

  return (
    <div
      id="map"
      ref={mapRef}
      style={{
        height: '400px',
        width: '100%',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    />
  );
};

export default GoogleMap;