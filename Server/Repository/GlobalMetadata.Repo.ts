import { GlobalMetadataModel } from "../Models/GlobalMetadata";
import {
  badRequestError,
  conflictError,
  notFoundError,
  serverError,
} from "../Errors/BaseError";

/** 
 * Handles updation/deletion of array key value metadata pairs.
 * @param key - the key
 * @param data - the content to be added or removed
 * @param shouldAdd - controls the adding or deleting the data to key
*/
export const updateMetadataArray = async (
  key: string,
  data: string,
  shouldAdd: boolean
) => {

  let result, docExists;

  if (shouldAdd) {
    // Logic: Find doc with name 'key' AND where 'content' DOES NOT ($ne) contain 'data'
    result = await GlobalMetadataModel.findOneAndUpdate(
      { name: key, content: { $ne: data } },
      { $push: { content: data } },
      { new: true }
    );

  } else {

    result = await GlobalMetadataModel.findOneAndUpdate(
      { name: key },
      { $pull: { content: data } },
      { new: true }
    );

  }

  if (result) return result;

  docExists = await GlobalMetadataModel.exists({ name: key });

  if (!docExists) {
    throw notFoundError(`The metadata key '${key}' does not exist.`, true);
  }

  // 2. If doc exists, but update failed during ADD, it means it was a duplicate
  if (shouldAdd) {
    throw conflictError(`The value '${data}' already exists in '${key}'.`, true);
  }
  
  throw badRequestError('Update failed', true);
};

export const incrementId = async (
  key: string,
) => {
  return await GlobalMetadataModel.findOneAndUpdate(
    { name: key },
    { $inc: { content: 1 } },
    { new: true, upsert: true }
  );
};

export const deleteArraydataByKey = async (key: string, data: string) => {
  return await GlobalMetadataModel.findOneAndDelete({ name: key });
};

export const deleteMetadataByValue = async (key: string, data: string) => {
  return await GlobalMetadataModel.findOneAndDelete({ name: key });
};

