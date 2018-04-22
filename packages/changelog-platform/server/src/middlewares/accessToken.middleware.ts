export const tokenValidiator = (req, res, next) => {
    const token = req.headers.authorization;

    if (token === undefined || token === null) {
        res.status(401).json('Token required');
    } else {
        next();
    }
};
