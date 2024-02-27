import APIRequest from './APIRequest';

export const getIDs = async (offset = 0, limit = 50) => {
  const requestBody = {
    action: 'get_ids',
    params: {
      offset,
      limit,
    },
  };

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

export const getFields = async (field, offset, limit = 50) => {
  const requestBody = {
    action: 'get_fields',
    params: {
      field,
      offset,
      limit,
    },
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
