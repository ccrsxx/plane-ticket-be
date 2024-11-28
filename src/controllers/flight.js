import { FlightService } from '../services/flight.js';

/** @import {Request, Response} from 'express' */
/** @import {ValidFlightQueryParams, ValidFavoriteFlightQueryParams} from '../middlewares/validation/flight.js' */

/**
 * @param {Request<unknown, unknown, unknown, ValidFlightQueryParams>} req
 * @param {Response} res
 */
async function getFlights(req, res) {
  const flights = await FlightService.getFlights(req.query);

  res.status(200).json({ data: flights });
}

/**
 * @param {Request<
 *   unknown,
 *   unknown,
 *   unknown,
 *   ValidFavoriteFlightQueryParams
 * >} req
 * @param {Response} res
 */
async function getFavoriteFlights(req, res) {
  const flights = await FlightService.getFavoriteFlights(req.query);

  res.status(200).json({ data: flights });
}

export const FlightController = {
  getFlights,
  getFavoriteFlights
};
