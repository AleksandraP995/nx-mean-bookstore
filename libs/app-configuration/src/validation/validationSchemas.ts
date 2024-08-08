import * as Joi from 'joi';

export const bookUserIdSchema = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required()
});

export const googleBooksApiQueriesSchema = Joi.object({
    q: Joi.string().required(),
    maxResults: Joi.string().required(), 
    startIndex: Joi.number().required(),
})