function getProductsForLocation(location) {
    var locationsMap = new Array();
        locationsMap['1'] = [{
                title: "Sports",
                products: [
                    { title: "Arsenal TV" },
                    { title: "Chelsea TV" }]
            }];
        locationsMap['2'] = [{
                title: "Sports",
                products: [
                    { title: "Liverpool TV" }
                ]
            }, {
                title: "News",
                products: [
                    { title: "Liverpool News" }
                ]
            }];

    return locationsMap[location] ? locationsMap[location] : [];
}

function findCategoryBy(categories, categoryTitle) {
    for(var i = 0; i < categories.length; i++) {
        if (categories[i].title === categoryTitle) {
            return categories[i];
        }
    }
}

module.exports.getProducts = function(location) {

    var defaultProducts = {
            categories: [{
                title: "News",
                products: [{
                    title: "Sky News",
                    title: "Sky Sports News"
                }]
            }]
        };

    var additionalProducts = getProductsForLocation(location);
    additionalProducts.forEach(function(category) {
        var existingCategory = findCategoryBy(defaultProducts.categories, category.title);
        if (existingCategory) {
            existingCategory.products = existingCategory.products.concat(category.products);
        } else {
            defaultProducts.categories.push(category);
        }
    });

    return defaultProducts;
}