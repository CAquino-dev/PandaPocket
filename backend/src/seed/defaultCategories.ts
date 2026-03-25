import Category from "../models/category.model";

const defaultCategories = [
  { name: "Salary", type: "income" },
  { name: "Business", type: "income" },
  { name: "Investments", type: "income" },

  { name: "Food", type: "expense" },
  { name: "Transport", type: "expense" },
  { name: "Bills", type: "expense" },
  { name: "Shopping", type: "expense" },
  { name: "Entertainment", type: "expense" }
];

export const seedDefaultCategories = async () => {
  for (const category of defaultCategories) {
    const exists = await Category.findOne({
      name: category.name,
      type: category.type,
      userId: null
    });

    if (!exists) {
      await Category.create({
        ...category,
        userId: null
      });
    }
  }

  console.log("Default categories checked/seeded");
};