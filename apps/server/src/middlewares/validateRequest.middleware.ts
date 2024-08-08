import { bookUserIdSchema, googleBooksApiQueriesSchema } from "@org-bookstore/app-configuration";

export const validateBookUserId = (req, res, next) => {
    const { error } = bookUserIdSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    next();
}

export const validateQueries  = (req, res, next) => {
    const { error } = googleBooksApiQueriesSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    next();
}

export default { validateBookUserId, validateQueries };