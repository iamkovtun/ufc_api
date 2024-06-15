"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const event_1 = require("../models/event");
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = req.query; // Optional filters can be accessed using req.query
    const events = yield event_1.Event.findAll({ where: filters });
    res.json(events);
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    const event = yield event_1.Event.findByPk(event_id);
    if (event) {
        res.json(event);
    }
    else {
        res.status(404).send('Event not found');
    }
});
exports.getEventById = getEventById;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAttributes = req.body;
    const event = yield event_1.Event.create(Object.assign({}, createdAttributes));
    res.json(event);
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    const updatedAttributes = req.body;
    const event = yield event_1.Event.findByPk(event_id);
    if (event) {
        Object.assign(event, updatedAttributes);
        yield event.save();
        res.json(event);
    }
    else {
        res.status(404).send('Event not found');
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event_id } = req.params;
    const event = yield event_1.Event.findByPk(event_id);
    if (event) {
        yield event.destroy();
        res.status(204).send();
    }
    else {
        res.status(404).send('Event not found');
    }
});
exports.deleteEvent = deleteEvent;
