import React from 'react';

export const ThreatMap: React.FC = () => {
    return (
        <div className="threat-map-container">
            <h3>Bản đồ mối đe dọa</h3>
            <div className="threat-map">
                <div className="map-placeholder">
                    <div className="threat-marker" style={{ top: '30%', left: '75%' }}>
                        <div className="pulse"></div>
                        <div className="marker-label">China (15)</div>
                    </div>
                    <div className="threat-marker" style={{ top: '45%', left: '15%' }}>
                        <div className="pulse"></div>
                        <div className="marker-label">USA (8)</div>
                    </div>
                    <div className="threat-marker" style={{ top: '35%', left: '45%' }}>
                        <div className="pulse"></div>
                        <div className="marker-label">Russia (12)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
