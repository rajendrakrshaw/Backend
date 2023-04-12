const ideas = require("../models/idea.model");

//Search all idea
exports.fetchALLIdeas = (req, res) =>{
    res.status(200).send(ideas);
}

let idCount = 1;
//Create idea
exports.createIdea = (req, res) =>{
    //read the request body
    const idea = req.body;
    //need to generate the next idea id
    idea.id = ++idCount;
    //Save it in the list of existing idea
    ideas[idCount] = idea;
    //return the response
    res.status(201).send(ideas[idCount]);
}

//Update idea
exports.updateIdea = (req, res) =>{
    //i need to read the id passed in the path
    // 127.0.0.1:8080/ideaApp/v1/ideas/1
    const ideaId = req.params.id;
    
    //if the idea is present - modify else return error
    if(ideas[ideaId]){
        ideas[ideaId] = req.body;
        res.status(200).send(ideas[ideaId]);
    }else{
        res.status(400).send({
            message : 'idea Id passed was not correct'
        })
    }
}
//Delete idea

exports.deleteIdea = (req, res) =>{
    //check if present - yes delete , no return error message
    if(ideas[req.params.id]){
        delete ideas[req.params.id];
        res.status(200).send({
            message : "Successfully Deleted"
        })
    }else{
        res.status(400).send({
            message : "wrong idea id"
        })
    }
}