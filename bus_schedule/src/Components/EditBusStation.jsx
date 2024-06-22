import React, { useState } from 'react';
import styled from 'styled-components';

function EditBusStation({ busStation, setIsEditing }) {
    const [stationName, setStationName] = useState(busStation.name);
    const [buses, setBuses] = useState(busStation.buses);

    const handleSaveClick = async () => {
        try {
            await updateBusStation(busStation._id, { name: stationName, buses });
            setIsEditing(false);
        }
        catch (error) {
            console.error('Failed to update bus station:', error);
        }
    };

    const handleBusChange = (busNumber, newTime) => {
        setBuses({ ...buses, [busNumber]: newTime });
    };

    return (
        <EditContainer>
            <CardTitleInput type="text" value={stationName} onChange={(e) => setStationName(e.target.value)} />
            <BusList>
                {Object.entries(buses).map(([busNumber, busTime]) => (
                    <BusListItem key={busNumber}>
                        Bus {busNumber} - <BusTimeInput type="number" value={busTime} onChange={(e) => handleBusChange(busNumber, e.target.value)} />
                    </BusListItem>
                ))}
            </BusList>
            <ButtonContainer>
                <SaveButton onClick={handleSaveClick}>Save</SaveButton>
                <CancelButton onClick={() => setIsEditing(false)}>Cancel</CancelButton>
            </ButtonContainer>
        </EditContainer>
    );
}

const updateBusStation = async (id, data) => {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update bus station');
    }

    return response.json();
};

const EditContainer = styled.div`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    background-color: #f9f9f9;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

const CardTitleInput = styled.input`
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const BusList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const BusListItem = styled.li`
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
`;

const BusTimeInput = styled.input`
    margin-left: 0.5rem;
    padding: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 50px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const SaveButton = styled.button`
    background-color: #28a745;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: white;

    &:hover {
        background-color: #218838;
    }
`;

const CancelButton = styled.button`
    background-color: #6c757d;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: white;

    &:hover {
        background-color: #5a6268;
    }
`;

export default EditBusStation;
