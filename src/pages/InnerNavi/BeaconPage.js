import React, { useState, useEffect } from 'react';

const beaconUUIDs = {
  door: 'B64D4F63-FA29-95DB-4C54-CDFE2AD953F4',
  left: 'C9C3BED7-4A01-4329-EA0F-F6F34A2E63FF',
  right: 'CDF4FF55-2DF5-A147-B969-9A45387B07D4',
};

const BeaconPage = () => {
  const [distances, setDistances] = useState({
    door: null,
    left: null,
    right: null,
  });

  const [error, setError] = useState(null);

  const calculateDistance = (rssi) => {
    const txPower = -59; // 일반적인 TxPower 값, 비콘에 따라 다를 수 있음
    if (rssi === 0) {
      return -1.0; // 측정 불가
    }
    const ratio = rssi / txPower;
    if (ratio < 1.0) {
      return Math.pow(ratio, 10);
    } else {
      const accuracy = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
      return accuracy;
    }
  };

  const handleScan = async () => {
    try {
      setError(null);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'], // 필터링 서비스 예시
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('battery_service');
      const characteristic = await service.getCharacteristic('battery_level');
      const rssi = await device.watchAdvertisements(); // 광고 수신을 감시하여 RSSI를 받아옴

      device.addEventListener('advertisementreceived', (event) => {
        const distance = calculateDistance(event.rssi);
        setDistances((prevDistances) => ({
          ...prevDistances,
          [device.id]: distance,
        }));
      });
    } catch (error) {
      console.error('Error: ', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!navigator.bluetooth) {
      setError('Web Bluetooth is not supported in this browser.');
    }
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Beacon Scanner</h1>
      <button onClick={handleScan} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Scan for Beacons
      </button>

      <div style={{ marginTop: '20px' }}>
        <h2>Distances:</h2>
        <p>Door: {distances.door ? `${distances.door.toFixed(2)} meters` : 'Not detected'}</p>
        <p>Left: {distances.left ? `${distances.left.toFixed(2)} meters` : 'Not detected'}</p>
        <p>Right: {distances.right ? `${distances.right.toFixed(2)} meters` : 'Not detected'}</p>
      </div>

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default BeaconPage;
