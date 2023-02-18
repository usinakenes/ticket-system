const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
router.use(express.json());

/**
 * @swagger
 * /api/user/addUser:
 *   post:
 *     tags: [user]
 *     description: Add a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A user was added!
 */
router.post("/addUser", async (req, res) => {
    const body = req.body;

    if (!body) res.status(400).json({ ok: false, error: "Body is missing." });

    try {

        const addedUser = await prisma.user.create({data: {name: body.name, email: body.email}})

        res.status(200).json({
            ok: true,
            message: "Database updated.",
            userId: addedUser.id
        });
    } catch (err) {
        res.status(503).json({ ok: false, error: "Database connection failed." });
    }
});

module.exports = router;
