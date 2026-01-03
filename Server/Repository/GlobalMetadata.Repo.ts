import { GlobalMetadataModel } from "../Models/GlobalMetadata";
import {
  badRequestError,
  conflictError,
  notFoundError,
} from "../Errors/BaseError";
import { ClientSession } from "mongoose";

/** 
 * Handles updation/deletion of array key value metadata pairs.
 * @param key - the key
 * @param data - the content to be added or removed
 * @param shouldAdd - controls the adding or deleting the data to key
*/
export const updateMetadataArray = async (
  key: string,
  data: string,
  shouldAdd: boolean,
  session?:ClientSession
) => {

  let result, docExists;

  if (shouldAdd) {
    result = await GlobalMetadataModel.findOneAndUpdate(
      { name: key, content: { $ne: data } },
      { $push: { content: data } },
      { new: true,session }
    ).lean();
  } else {
    result = await GlobalMetadataModel.findOneAndUpdate(
      { name: key },
      { $pull: { content: data } },
      { new: true,session }
    ).lean();
  }

  if (result) return result;

  docExists = await GlobalMetadataModel.exists({ name: key });

  if (!docExists) {
    throw notFoundError(`The metadata key '${key}' does not exist.`, true);
  }

  if (shouldAdd) {
    throw conflictError(`The value '${data}' already exists in '${key}'.`, true);
  }
  
  throw badRequestError('Update failed', true);
};

/**
 * Fetches a metadata record by its name.
 * @param key - Metadata name used as lookup key
 * @returns The matching metadata document, or throws error
 */
export const fetchMetadataItem = async (key: string, session?: ClientSession) => {
  
  const data = await GlobalMetadataModel.findOne({ name: key }, null, { session }).lean();

  if (!data) {
    throw notFoundError("Key not found");
  }

  return data;
};

/**
 * Atomically increments a numeric metadata value and returns the updated document.
 * @param key - The unique identifier/name for the metadata item.
 * @param session - Optional MongoDB client session for transaction support.
 * @returns The updated or newly created metadata document.
 */
export const incrementId = async (
  key: string,
  session?: ClientSession
) => {
  const result = await GlobalMetadataModel.findOneAndUpdate(
    { name: key },
    { $inc: { content: 1 } },
    { 
      new: true,
      session
    }
  ).lean();

  if (!result) {
    throw notFoundError('Key Not Found');
  }

  return result;
};






