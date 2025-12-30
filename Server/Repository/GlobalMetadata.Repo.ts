import GlobalMetadataModel from "../Models/GlobalMetadata.js";
import {
  notFoundError,
  conflictError,
  badRequestError,
} from "../Errors/BaseError";

export const upsertMetaData = async (
  key: string,
  data: any,
  isIncrement: boolean = false
) => {
  try {
    if (isIncrement) {
      return await GlobalMetadataModel.findOneAndUpdate(
        { name: key },
        { $inc: { content: 1 } },
        { new: true, upsert: true }
      );
    }

    return await GlobalMetadataModel.findOneAndUpdate(
      { name: key },
      { content: data },
      { new: true, upsert: true }
    );
  } catch (error) {
     badRequestError(
      "Error inserting into GlobalMetadataModel:\n" + error
    );
  }
};

export const deleteMetadataByKey = async (key: string) => {
  return await GlobalMetadataModel.findOneAndDelete({ name: key });
};

export const deleteMetadataByValue = async (key: string,data:string) => {
  return await GlobalMetadataModel.findOneAndDelete({ name: key });
};

