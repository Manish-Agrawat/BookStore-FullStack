import Book from "../Models/bookSchema.js";

// Add a new book
export async function addBook(req, res) {
  try {
    const { title, author, price, category, description, stock } = req.body;
    const coverImage = req.file.path;

    await Book({
      title,
      author,
      price,
      category,
      description,
      coverImage,
      stock,
    }).save();
    return res.status(200).json({
      message: "Book added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}

// Get all books

export async function getBooks(req, res) {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: true,
      message: "Books found",
      books,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
