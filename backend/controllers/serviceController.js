const Service = require("../models/Service");

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
};

exports.updateService = async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
};

exports.deleteService = async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json({ message: "Service deleted" });
};