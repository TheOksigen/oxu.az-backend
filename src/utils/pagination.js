const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

const parsePositiveInteger = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const getPagination = (req, options = {}) => {
    const defaultLimit = options.defaultLimit || DEFAULT_LIMIT;
    const maxLimit = options.maxLimit || MAX_LIMIT;
    const page = parsePositiveInteger(req.query.page || req.params.page, DEFAULT_PAGE);
    const requestedLimit = parsePositiveInteger(req.query.limit, defaultLimit);
    const limit = Math.min(requestedLimit, maxLimit);
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

const getPaginationMeta = ({ page, limit, total }) => {
    const totalPages = Math.ceil(total / limit);

    return {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    };
};

module.exports = {
    getPagination,
    getPaginationMeta
};
