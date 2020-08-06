//establish routing with appropriate controller methods
const freezerController = require("../controllers/freezer.controller");

module.exports = (app) => {
    app.post("/api/freezer/new", freezerController.create);
    app.get("/api/freezer", freezerController.getAll);
    app.get("/api/freezer/:id", freezerController.getOne);
    app.get("/api/categories", freezerController.getCategories);        //to be used for Category dropdown input
    app.put("/api/freezer/:id", freezerController.update);
    app.delete("/api/freezer/:id", freezerController.delete);
    
};