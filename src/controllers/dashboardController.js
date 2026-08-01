import asyncHandler from "../utils/asyncHandler.js";
import { getDashboardService } from "../services/dashboardService.js";

/*
========================
GET DASHBOARD
========================
*/

export const getDashboard = asyncHandler(async (req, res) => {
  const dashboard = await getDashboardService(req.user.id);

  res.status(200).json({
    success: true,
    ...dashboard,
  });
});