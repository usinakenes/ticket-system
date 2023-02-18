const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.json());

/** Vet ej ifall man bör ändra någonting här.------------*/

const selectData = {
  id: true,
  shortTitle: true,
  longTitle: true,
  description: true,
  startTime: true,
  releaseTime: true,
  eventPictureLink: true,
  location: {
    select: {
      id: false,
      title: true,
      address: true,
      lat: true,
      lng: true,
    },
  },
};

/**
 * @swagger
 * /api/event/GetAll:
 *   get:
 *     description: Get all event
 *     tags: [event]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       503:
 *         description: Error
 */
router.get("/GetAll", async (req, res) => {
  try {
    let events = await prisma.event.findMany({
      select: selectData,
    });

    let formatted = [];

    for (const event of events) {
      const standardTicket = await prisma.ticketType.findFirst({
        where: { eventId: event.id, standard: true },
      });
      formatted.push({
        ...event,
        locationUrl: `https://www.google.com/maps/search/?api=1&query=${event.location.lat}%2C${event.location.lng}`,
        price: standardTicket.price,
      });
    }

    return res.status(200).json({
      ok: true,
      results: formatted,
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      message: "Database connection failed.",
    });
  }
});

/**
 * @swagger
 * /api/event/{eventId}:
 *   get:
 *     description: Fetch single event by ID
 *     tags: [event]
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: path
 *        name: eventId
 *        description: ID of event that needs to be fetched
 *        required: true
 *        schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *       503:
 *         description: Error
 */
router.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) res.status(400).json({ error: "Parameter is missing." });

  try {
    const parsed = parseInt(eventId);
    const event = await prisma.event.findFirst({
      where: { id: parsed },
      select: selectData,
    });

    if (event) {
      const standardTicket = await prisma.ticketType.findFirst({
        where: { eventId: event.id, standard: true },
      });
      const formatted = {
        ...event,
        locationUrl: `https://www.google.com/maps/search/?api=1&query=${event.location.lat}%2C${event.location.lng}`,
        price: standardTicket.price,
      };

      res.status(200).json(formatted);
    } else {
      res.status(404).json({});
    }
  } catch (err) {
    res.status(503).json({ error: "Database connection failed." });
  }
});

/**
 * @swagger
 * /api/event/{eventId}/tickets:
 *   get:
 *     description: Fetch all ticket types for an event
 *     tags: [event]
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: path
 *        name: eventId
 *        description: ID of event that needs to be fetched
 *        required: true
 *        schema:
 *          type: integer
 *          format: int32
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketType'
 *       404:
 *         description: Event not found
 *       503:
 *         description: Error
 */
router.get("/:eventId/tickets", async (req, res) => {
  const { eventId } = req.params;

  if (!eventId) res.status(400).json({ error: "Parameter is missing." });

  try {
    const parsed = parseInt(eventId);
    const ticketTypes = await prisma.ticketType.findMany({
      where: { eventId: parsed },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        numTickets: true
      }
    });

    let data = []

    for (const ticket of ticketTypes) {
      const numBought = await prisma.ticket.count({ where: { ticketTypeId: ticket.id } })
      data.push({
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        price: ticket.price,
        numberAvailable: ticket.numTickets - numBought
      })
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(503).json({ error: "Database connection failed." });
  }
});

module.exports = router;
