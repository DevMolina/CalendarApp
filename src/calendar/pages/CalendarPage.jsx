import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, NavBar } from "../";
import { addHours } from 'date-fns';
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';



export const CalendarPage = () => {
    
    const {openDateModal} = useUiStore();
    const {events} = useCalendarStore();
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected });
    }

    const onDoubleClick = (event) => {
        // console.log({ doubleClick: event });
        openDateModal();
    }

    const onSelect = (event) => {
        console.log({ click: event });
    }

    const onViewChanged = (event) => {
        console.log(event);
        localStorage.setItem('lastView', event);
        setLastView(event)
    }
    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px )' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <CalendarModal />

        </>
    )
}
