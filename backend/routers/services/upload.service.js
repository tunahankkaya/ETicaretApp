const response = async (res, callback) => {
    try {
        await callback();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = response;