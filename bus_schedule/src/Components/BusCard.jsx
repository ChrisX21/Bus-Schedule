import React from 'react';
import styled from 'styled-components';

function BusCard({ busStation }) {
    return (
        <CardContainer>
            <CardTitle>{busStation.name}</CardTitle>
            <BusList>
                {Object.entries(busStation.buses).map(([busNumber, busTime]) => (
                    <BusListItem key={busNumber}>
                        Bus {busNumber} - {busTime} minutes
                    </BusListItem>
                ))}
            </BusList>
        </CardContainer>
    );
}

const CardContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background-color: #f9f9f9;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const BusList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const BusListItem = styled.li`
    margin-bottom: 0.5rem;
`;

export default BusCard;
