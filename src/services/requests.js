import APIRequest from './APIRequest';

export const getIDs = async (offset = 0, limit) => {
  const requestBody = {
    action: 'get_ids',
    params: {
      offset,
    },
  };

  if (limit) requestBody.params.limit = limit;

  return await APIRequest(requestBody);
};

export const getItems = async (ids = []) => {
  const requestBody = {
    action: 'get_items',
    params: {
      ids,
    },
  };

  return await APIRequest(requestBody);
};

export const getFields = async (field, offset, limit) => {
  const requestBody = {
    action: 'get_fields',
  };

  if (field || offset || limit) requestBody.params = {
    field,
    offset,
    limit,
  };

  return await APIRequest(requestBody);
};

export const filterProducts = async (field, value) => {
  const requestBody = {
    action: 'filter',
    params: {
      [field]: value,
    },
  };

  return await APIRequest(requestBody);
};
