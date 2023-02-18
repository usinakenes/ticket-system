const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

const { isLoggedIn, initSession } = require("./auth");

router.use(express.json());
initSession(router);

const selectData = {
  event: {
    select: {
      id: true,
      shortTitle: true,
      startTime: true,
      eventPictureLink: true,
      location: {
        select: {
          title: true
        }
      }
    },
  },
  id: true,
  purchaseTime: true,
  tickets: {
    select: {
      ticketType: {
        select: {
          price: true,
          title: true,
        },
      },
    },
  },
};

/**
 * @swagger
 * /api/order/orders:
 *   get:
 *     tags: [order]
 *     security:
 *       - oAuth:
 *           - logged_in
 *     description: Get all orders for the logged in user
 *     responses:
 *       "200":
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   purchaseTime:
 *                     type: string
 *                   event:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       shortTitle:
 *                         type: string
 *                       startTime:
 *                         type: string
 *                       eventPictureLink:
 *                         type: string
 *                       location:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                   tickets:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         price:
 *                           type: integer
 *                         purchased:
 *                           type: integer
 *       "403":
 *         description: Not signed in
 *       "503":
 *         description: Server error
 */
router.get("/orders", isLoggedIn, async (req, res) => {
  try {
    let orders = await prisma.order.findMany({
      where: { user: { email: req.user.email } },
      select: selectData,
    });

    // Format tickets
    const formatted = orders.map((order) => {
      let tickets = order.tickets.reduce((acc, ticket) => {
        let purchased = 1;
        if (acc[ticket.ticketType.title]) {
          purchased = acc[ticket.ticketType.title].purchased + 1;
        }
        acc[ticket.ticketType.title] = {
          price: ticket.ticketType.price,
          purchased: purchased,
        };
        return acc;
      }, {});

      let ticketsAsArray = Object.keys(tickets).map((key) => ({
        ...tickets[key],
        name: key,
      }));
      return { ...order, tickets: ticketsAsArray };
    });

    // Return purchased tickets as an array
    return res.status(200).json({
      ok: true,
      results: formatted,
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      error: "Database connection failed.",
    });
  }
});

module.exports = router;
