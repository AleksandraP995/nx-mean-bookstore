import { retrieveAllBooks } from "../model/books.model" 

export const retrieveAllBooksController = async (req, res) => {
  const { q, maxResults, startIndex } = req.query;
  try {
    const allBooks = await retrieveAllBooks(q, maxResults, startIndex);
    res.json(allBooks);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
};

export default { retrieveAllBooksController}
