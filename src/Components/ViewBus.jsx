import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Group, SegmentedControl, Card, Title } from '@mantine/core';

function ViewBus() {
    const mapContainerRef = useRef(null);
    const [busMarkers, setBusMarkers] = useState({});
    const [selectedBus, setSelectedBus] = useState('1');

    const customIcon = L.icon({
        iconUrl: 'https://cdn3d.iconscout.com/3d/premium/thumb/school-bus-6874504-5628890.png',
        iconSize: [82, 82],
     
        popupAnchor: [0, -32],
    });

    useEffect(() => {
        const map = L.map(mapContainerRef.current).setView([11.8745, 75.3704], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
        }).addTo(map);

        const markers = {
            '1': L.marker([11.8675, 75.3554], { icon: customIcon }).bindPopup('Bus 1'),
            '2': L.marker([11.8567, 75.3579], { icon: customIcon }).bindPopup('Bus 2'),
            '3': L.marker([11.8632, 75.3631], { icon: customIcon }).bindPopup('Bus 3'),
            '4': L.marker([11.8745, 75.3704], { icon: customIcon }).bindPopup('Bus 4'),
            '5': L.marker([11.8806, 75.3577], { icon: customIcon }).bindPopup('Bus 5'),
            '6': L.marker([11.8952, 75.3662], { icon: customIcon }).bindPopup('Bus 6'),
        };

        setBusMarkers(markers);

        markers[selectedBus].addTo(map);

        return () => {
            map.remove();
        };
    }, [selectedBus]); 

    useEffect(() => {
        
        Object.keys(busMarkers).forEach((bus) => {
            if (bus === selectedBus) {
                busMarkers[bus].openPopup();
            } else {
                busMarkers[bus].closePopup();
            }
        });
    }, [selectedBus, busMarkers]);

    const handleBusChange = (value) => {
        setSelectedBus(value);
    };

    return (
        <div>
            <Group px={20} my={20} justify="space-between">
                <Title style={{ fontFamily: 'Uber move' }} order={2}>
                    Track Campus Bus
                </Title>
                <SegmentedControl
                    size="md"
                    fullWidth
                    data={['1', '2', '3', '4', '5', '6']}
                    value={selectedBus}
                    onChange={handleBusChange}
                />
            </Group>

            <Card mx={20} shadow="sm" padding="lg" radius="md" withBorder>
                <div ref={mapContainerRef} style={{ height: '500px', zIndex:'10' }} />
            </Card>
        </div>
    );
}

export default ViewBus;
