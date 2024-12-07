import { z } from 'zod';
import { HttpError } from '../../utils/error.js';
import {
  formatZodError,
  validCursorSchema,
  validStringSchema
} from '../../utils/validation.js';
import { Continent } from '@prisma/client';

/** @import {Request,Response,NextFunction} from 'express' */

const validFlightQueryParams = z.object({
  departureAirportId: validStringSchema,
  destinationAirportId: validStringSchema,
  departureDate: z.string().date(),
  returnDate: z.string().date().optional(),
  cursor: validCursorSchema.optional()
});

/** @typedef {z.infer<typeof validFlightQueryParams>} ValidFlightQueryParams */

/**
 * @param {Request<unknown, unknown, unknown, ValidFlightQueryParams>} req
 * @param {Response} _res
 * @param {NextFunction} next
 */
function isValidFlightQueryParams(req, _res, next) {
  const { error } = validFlightQueryParams.safeParse(req.query);

  if (error) {
    throw new HttpError(
      400,
      formatZodError(error, {
        errorMessage: 'Invalid query params'
      })
    );
  }

  next();
}

const validFavoriteFlightQueryParams = z.object({
  continent: z.nativeEnum(Continent).optional(),
  nextCursor: validCursorSchema.optional()
});

/** @typedef {z.infer<typeof validFavoriteFlightQueryParams>} ValidFavoriteFlightQueryParams */

/**
 * @param {Request<
 *   unknown,
 *   unknown,
 *   unknown,
 *   ValidFavoriteFlightQueryParams
 * >} req
 * @param {Response} _res
 * @param {NextFunction} next
 */
function isValidFavoriteFlightQueryParams(req, _res, next) {
  const { error } = validFavoriteFlightQueryParams.safeParse(req.query);

  if (error) {
    throw new HttpError(
      400,
      formatZodError(error, {
        errorMessage: 'Invalid query params'
      })
    );
  }

  next();
}

export const FlightValidationMiddleware = {
  isValidFlightQueryParams,
  isValidFavoriteFlightQueryParams
};
