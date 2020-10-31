const authMiddleware = require('../middleware/auth');

module.exports = function (app) {

    const foodItemController = require('../controllers/foodItem.controller');


    // ***** Normal CRUD operations*****

    //  add food item
    // authMiddleware,
    app.post("/foodItem", foodItemController.addFoodItem);

    //  delete food item by id
    // authMiddleware,
    app.delete("/foodItem/:id", foodItemController.deleteFoodItemById);

    // get food item by id
    app.get("/foodItem/:id", foodItemController.getFoodItemById);

    // update food item by id
    app.put("/foodItem/:id", authMiddleware, foodItemController.updateFoodItemById);

    //get all the events in the db
    app.get("/foodItems", foodItemController.getAllFoodItems);

    // ****** Advance searches *****
    app.post("/foodItems/filter", foodItemController.getFoodItemsByFilter);

}