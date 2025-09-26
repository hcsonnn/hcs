class FoodRatings {
    constructor(foods, cuisines, ratings) {
        // Map để lưu trữ thông tin món ăn: food_name -> {cuisine, rating}
        this.foodInfo = new Map();

        // Map để lưu trữ danh sách món ăn theo cuisine: cuisine -> Array of food names
        this.cuisineToFoods = new Map();

        // Khởi tạo dữ liệu
        for (let i = 0; i < foods.length; i++) {
            const food = foods[i];
            const cuisine = cuisines[i];
            const rating = ratings[i];

            // Lưu thông tin món
            this.foodInfo.set(food, { cuisine, rating });

            // Nhóm món ăn theo cuisine
            if (!this.cuisineToFoods.has(cuisine)) {
                this.cuisineToFoods.set(cuisine, []);
            }
            this.cuisineToFoods.get(cuisine).push(food);
        }
    }

    changeRating(food, newRating) {
        const foodData = this.foodInfo.get(food);
        const cuisine = foodData.cuisine;

        // Cập nhật rating trong foodInfo
        this.foodInfo.set(food, { cuisine, rating: newRating });
    }

    highestRated(cuisine) {
        const cuisineFoods = this.cuisineToFoods.get(cuisine);

        let maxRating = -1;
        let bestFood = "";

        // Duyệt qua tất cả món ăn trong cuisine này
        for (const food of cuisineFoods) {
            const currentRating = this.foodInfo.get(food).rating;

            // Chọn món ăn có rating cao nhất, nếu bằng nhau thì chọn lexicographically smaller
            if (currentRating > maxRating ||
                (currentRating === maxRating && (bestFood === "" || food < bestFood))) {
                maxRating = currentRating;
                bestFood = food;
            }
        }

        return bestFood;
    }
}
