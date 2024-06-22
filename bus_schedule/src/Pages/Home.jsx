import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BusCard from '../Components/BusCard';

function Home() {
    const [busInfo, setBusInfo] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                const response = await fetch('http://localhost:3030/jsonstore/bus/businfo');
                if (!response.ok) {
                    throw new Error('Failed to fetch bus info');
                }
                const data = await response.json();
                setBusInfo(data);
            }
            catch (error) {
                setError(error.message);
            }
        };

        const fetchScheduleData = async () => {
            try {
                const response = await fetch('http://localhost:3030/jsonstore/bus/schedule');
                if (!response.ok) {
                    throw new Error('Failed to fetch schedule');
                }
                const data = await response.json();
                setSchedule(data);
            }
            catch (error) {
                setError(error.message);
            }
        };

        fetchBusData();
        fetchScheduleData();
    }, []);

    if (error) {
        return <ErrorContainer>{error}</ErrorContainer>;
    }

    if (!busInfo || !schedule) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }

    return (
        <Container>
            <Section>
                <SectionTitle>Bus Stations</SectionTitle>
                <CardGrid>
                    {Object.entries(busInfo).map(([busId, busStation]) => (
                        <BusCard key={busId} busStation={busStation} />
                    ))}
                </CardGrid>
            </Section>
            <Section>
                <SectionTitle>Schedule</SectionTitle>
                <ScheduleList>
                    {Object.entries(schedule).map(([scheduleId, scheduleItem]) => (
                        <ScheduleItem key={scheduleId}>
                            <strong>{scheduleItem.name}</strong> - Next: {scheduleItem.next}
                        </ScheduleItem>
                    ))}
                </ScheduleList>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
`;

const ScheduleList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ScheduleItem = styled.li`
    margin-bottom: 0.5rem;
`;

const ErrorContainer = styled.div`
    color: red;
`;

const LoadingContainer = styled.div`
    font-size: 1.2rem;
    color: gray;
`;

export default Home;
