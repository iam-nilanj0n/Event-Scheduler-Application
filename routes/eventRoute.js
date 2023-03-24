const eventRouter = require('express').Router();
const eventModel = require('../model/eventModel.js');

// post route is here
eventRouter.post('/v1/events', async (req, res)=>{
    try {
        const {title, description, location} = req.body;
        if(title.length===0){
            return res.status(400).json({
                error: "Validation error: title is required"
            })
        }else if(description.length===0){
            return res.status(400).json({
                error: "Validation error: description is required"
            })
        }else if(location.length===0){
            return res.status(400).json({
                error: "Validation error: location is required"
            })
        }
        const event = await eventModel.create(req.body)
        if(event){
            return res.status(201).send(event)
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
})

// get route for all events
eventRouter.get('/v1/events', async (req, res)=>{
    try {
        const events = await eventModel.find()
        if(events){
            return res.status(200).send(events)
        }
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
})

// get event with id
eventRouter.get('/v1/events/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const event = await eventModel.findById(id);
        if(event){
            return res.status(200).send(event)
        }else{
            return res.status(404).json({
                error: 'There is no event with that id'
            })
        }
    } catch (error) {
        res.status(400).send('Something went wrong')
    }
})

// delete event with id

eventRouter.delete('/v1/events/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const event = await eventModel.findById(id);
        if(!event){
            res.status(204).send()
        }else{
            await eventModel.findByIdAndDelete(id);
            return res.status(204).send()
        }
    } catch (error) {
        res.status(400).send('Something went wrong')
    }
})

// update event with id

eventRouter.put('/v1/events/:id', async (req, res)=>{
    try {
        const {title, description, location} = req.body;
        if(title.length===0){
            return res.status(400).json({
                error: "Validation error: title is required"
            })
        }else if(description.length===0){
            return res.status(400).json({
                error: "Validation error: description is required"
            })
        }else if(location.length===0){
            return res.status(400).json({
                error: "Validation error: location is required"
            })
        }
        const id = req.params.id;
        const event = await eventModel.findById(id);
        if(event){
            const updateEvent = await eventModel.findByIdAndUpdate(id, req.body)
            return res.status(200).json({
                status: 'Successfully updated',
                updateEvent: updateEvent
            })
        }
    } catch (error) {
        res.status(400).send('Something went wrong')
    }
})



module.exports = eventRouter