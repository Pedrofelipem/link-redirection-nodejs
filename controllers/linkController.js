
const Link = require('../models/Link')

const redirect = async (req, res, next) => {
    let title = req.params.title;

    try {
        let docs = await Link.findOneAndUpdate({ title }, { $inc: { click: 1 } });
        if (docs) {
            res.redirect(docs.url)   
        } else {
            next()
        }
    } catch (error) {
        res.status(500).send('Erro interno do servidor', error);
    }
}

const addLink = async (req, res) => {

    let link = new Link(req.body)

    try {
        let doc = await link.save()
        res.redirect('/')
    } catch (error) {
        res.render('index', {error, body: req.body})
    }
}

const allLinks = async (req, res) => {
    try {
        let links = await Link.find({});
        if (links) {
            res.render('all', { links })
        } else {
            res.status(404).send('Documentos não encontrado');
        }
    } catch (error) {
        res.status(500).send('Erro interno do servidor', error);
    }
}

const deleteLink = async (req, res) => {
    let id = req.params.id
    try {
        await Link.findByIdAndDelete(id)
        res.redirect('/')
    } catch (error) {
        res.status(404).send('Erro interno do servidor', error);
    }
}

const loadLink = async (req, res) => {
    let id = req.params.id
    try {
        const doc = await Link.findById(id)
        res.render('edit', {error: false, body: doc})
    } catch (error) {
        res.status(404).send('Erro interno do servidor', error);
    }
}

const editLink = async (req, res) => {

    let link = {}
    link.title = req.body.title
    link.description = req.body.description
    link.url = req.body.url

    let id = req.params.id

    if(!id){
        id = req.body.id
    }

    try {
        await Link.findByIdAndUpdate(id, link)
        res.redirect('/')
    } catch (error) {
        res.render('edit', {error, body: req.body})
    }    
}


module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink }