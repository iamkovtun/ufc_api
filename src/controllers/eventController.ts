import { Request, Response } from 'express';
import { Event } from '../models/event';

interface EventRequest extends Request {
    body: {
        event_name: string;
        date: string;
        location: string;
        venue: string;
        attendance: number;
    };
    params: {
        event_id: string;
    };
    query: {
        event_name: string;
        date: string;
        location: string;
        venue: string;
        attendance: string;
    };
}

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
    const filters = req.query; // Optional filters can be accessed using req.query
    const events: Event[] | null = await Event.findAll({ where: filters });
    res.json(events);
};

export const getEventById = async (req: EventRequest, res: Response): Promise<void> => {
    const { event_id } = req.params;
    const event: Event | null = await Event.findByPk(event_id);
    if (event) {
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
};

export const createEvent = async (req: EventRequest, res: Response): Promise<void> => {
    const createdAttributes = req.body;
    const event: Event = await Event.create({
        ...createdAttributes
    });
    res.json(event);
};

export const updateEvent = async (req: EventRequest, res: Response): Promise<void> => {
    const { event_id } = req.params;
    const updatedAttributes = req.body;
    const event: Event | null = await Event.findByPk(event_id);
    if (event) {
        Object.assign(event, updatedAttributes);
        await event.save();
        res.json(event);
    } else {
        res.status(404).send('Event not found');
    }
};

export const deleteEvent = async (req: EventRequest, res: Response): Promise<void> => {
    const { event_id } = req.params;
    const event: Event | null  = await Event.findByPk(event_id);
    if (event) {
        await event.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Event not found');
    }
};
