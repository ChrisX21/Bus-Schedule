import React, { useState } from 'react';
import styled from 'styled-components';
import EditBusStation from './EditBusStation';

function BusCard({ busStation, isLoggedIn }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDeleteClick = async () => {
        try {
            await deleteBusStation(busStation._id);
        }
        catch (error) {
            console.error('Failed to delete bus station:', error);
        }
    };

    return (
        <CardContainer>
            {isEditing ? (
                <EditBusStation busStation={busStation} setIsEditing={setIsEditing} />
            ) : (
                <>
                    <CardTitle>{busStation.name}</CardTitle>
                    <BusList>
                        {Object.entries(busStation.buses).map(([busNumber, busTime]) => (
                            <BusListItem key={busNumber}>
                                Bus {busNumber} - {busTime} minutes
                            </BusListItem>
                        ))}
                    </BusList>
                    {isLoggedIn && (
                        <ButtonContainer>
                            <EditButton onClick={handleEditClick}>Edit</EditButton>
                            <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
                        </ButtonContainer>
                    )}
                </>
            )}
        </CardContainer>
    );
}

const deleteBusStation = async (id) => {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': localStorage.getItem('token')
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete bus station');
    }

    return response.json();
};

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
    display: flex;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;

const EditButton = styled.button`
    background-color: #61dafb;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: white;

    &:hover {
        background-color: #21a1f1;
    }
`;

const DeleteButton = styled.button`
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0.5rem 1rem;
    color: white;

    &:hover {
        background-color: #c82333;
    }
`;

export default BusCard;
