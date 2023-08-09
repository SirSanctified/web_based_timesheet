import { sequelize } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import Request from "../models/requests.js";

export async function createRequest(req, res) {
  const { firstName, lastName, email, phone, nationalId } = req.body;
  try {
    await Request.create({
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      id: uuidv4(),
    });
    res.status(200).json({ messege: "Request sent" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

export async function getRequests(req, res) {
  try {
    const requests = await Request.findAll({});
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

export async function getRequestById(req, res) {
  try {
    const request = await Request.findByPk(req.params.id);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}

export async function deleteRequest(req, res) {
  try {
    await Request.destroy({ where: { id: req.params.id } });
    res.status(204);
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
