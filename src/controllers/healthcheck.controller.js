import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const healthcheck = asyncHandler(async (req, res) => {
  //TODO: build a healthcheck response that simply returns the OK status as json with a message

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Ok", { message: "Healthcheck passed succesfully" })
    );
});

const allDBvideos = asyncHandler(async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find({});
    // console.log(videos);

    // Respond with the videos in the standard API response format

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "video fetched successfully"));
  } catch (error) {
    // Handle any errors and send a proper response

    console.log(error);
    return new ApiError(500, "Error while fetching videos ", error.message);
  }
});

export { healthcheck, allDBvideos };
