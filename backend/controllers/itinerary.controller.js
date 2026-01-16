import Itinerary from "../models/itinerary.js";

/* CREATE ITINERARY */
export const createItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.create(req.body);
    res.status(201).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: "Failed to create itinerary" });
  }
};

/* GET ALL ITINERARIES */
export const getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch itineraries" });
  }
};

/* GET SINGLE ITINERARY */

export const getItineraryById = async (req, res) => {
  try {
    const id = req.params.id;

    const itinerary = await Itinerary.findOne({
      $or: [
        { _id: id },               // Mongo ObjectId
        { legacyId: Number(id) }   // Frontend numeric id
      ]
    });

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(itinerary);
  } catch (err) {
    res.status(500).json({ message: "Error fetching itinerary" });
  }
};
