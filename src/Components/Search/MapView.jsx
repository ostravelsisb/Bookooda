import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import AgentPopup from './AgentPopup';
import { defaultCenter, defaultZoom } from './searchData';

// Fix leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Pakistan map bounds (tighter to minimize visibility of neighboring countries)
const pakistanBounds = L.latLngBounds(
    L.latLng(23.6, 60.8),  // Southwest
    L.latLng(37.1, 77.2)   // Northeast
);

// Create a circular avatar icon for agents
const createCircleIcon = (initials, isHovered, isSelected) => {
    const size = isHovered || isSelected ? 48 : 42;
    const bgColor = isSelected ? '#1e40af' : isHovered ? '#3b82f6' : '#2563eb';
    const borderColor = isSelected ? '#fff' : isHovered ? '#fff' : '#e0e7ff';
    const borderWidth = isSelected ? 3 : 2;
    const shadow = isSelected
        ? 'box-shadow: 0 0 0 4px rgba(37,99,235,0.25), 0 4px 12px rgba(0,0,0,0.2);'
        : isHovered
            ? 'box-shadow: 0 0 0 3px rgba(59,130,246,0.2), 0 4px 10px rgba(0,0,0,0.15);'
            : 'box-shadow: 0 2px 8px rgba(0,0,0,0.18);';

    return L.divIcon({
        className: 'custom-circle-marker',
        html: `
            <div style="
                width: ${size}px;
                height: ${size}px;
                background: ${bgColor};
                border: ${borderWidth}px solid ${borderColor};
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: ${size > 44 ? 14 : 12}px;
                font-weight: 700;
                font-family: 'Poppins', sans-serif;
                ${shadow}
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
            ">
                ${initials}
                <div style="
                    position: absolute;
                    bottom: -7px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 6px solid ${bgColor};
                "></div>
            </div>
        `,
        iconSize: [size, size + 7],
        iconAnchor: [size / 2, size + 7],
        popupAnchor: [0, -(size + 10)],
    });
};

// Component to fly map to selected agent & enforce bounds
const MapController = ({ selectedAgent, mapCenter }) => {
    const map = useMap();

    // Enforce Pakistan bounds
    useEffect(() => {
        map.setMaxBounds(pakistanBounds);
        map.setMinZoom(6);
        map.setMaxZoom(15);
    }, [map]);

    useEffect(() => {
        if (selectedAgent) {
            map.flyTo(
                [selectedAgent.coordinates.lat, selectedAgent.coordinates.lng],
                12,
                { duration: 1.5, easeLinearity: 0.25 }
            );
        } else {
            // Close all popups when no agent is selected
            map.closePopup();
            if (mapCenter) {
                map.flyTo([mapCenter.lat, mapCenter.lng], defaultZoom, { duration: 1 });
            }
        }
    }, [selectedAgent, mapCenter, map]);

    return null;
};

const MapView = ({
    agents,
    hoveredAgent,
    selectedAgent,
    onHoverAgent,
    onLeaveAgent,
    onSelectAgent,
    onClosePopup,
}) => {
    const markerRefs = useRef({});

    // Open popup when agent is selected
    useEffect(() => {
        if (selectedAgent && markerRefs.current[selectedAgent.id]) {
            markerRefs.current[selectedAgent.id].openPopup();
        }
    }, [selectedAgent]);

    return (
        <MapContainer
            center={[defaultCenter.lat, defaultCenter.lng]}
            zoom={defaultZoom}
            className="w-full h-full"
            zoomControl={false}
            attributionControl={false}
            style={{ background: '#f2efe9' }}
            maxBounds={pakistanBounds}
            maxBoundsViscosity={1.0}
            minZoom={6}
            maxZoom={15}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            <MapController selectedAgent={selectedAgent} />

            {agents.map(agent => (
                <Marker
                    key={agent.id}
                    position={[agent.coordinates.lat, agent.coordinates.lng]}
                    icon={createCircleIcon(
                        agent.avatar,
                        hoveredAgent === agent.id,
                        selectedAgent?.id === agent.id
                    )}
                    ref={(ref) => {
                        if (ref) markerRefs.current[agent.id] = ref;
                    }}
                    eventHandlers={{
                        mouseover: () => onHoverAgent(agent.id),
                        mouseout: () => onLeaveAgent(),
                        click: () => onSelectAgent(agent),
                    }}
                >
                    <Popup
                        closeButton={false}
                        className="agent-popup-container"
                        offset={[0, -5]}
                        autoPan={true}
                        autoPanPadding={[50, 50]}
                    >
                        <AgentPopup agent={agent} onClose={onClosePopup} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;
