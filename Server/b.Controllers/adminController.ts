

export const updateRoleDeps = async (req, res) => {
    const { name, data } = req.body;
    console.log(name, data);

    const session = await mongoose.startSession(); // Start a transaction session
    session.startTransaction();
    try {
        const result = await updateHelper(name, data, session);
        if (!result) {
            await session.abortTransaction(); // Rollback changes
            session.endSession();
            console.error("Error updating", error);
            return res.status(404).json({ message: "Member not found" });
        }

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: `Successfully updated the ${name}`, show: true, data: result });
    } catch (e) {
        await session.abortTransaction(); // Rollback changes
        session.endSession();
        console.error("Error updating", e);
        res.status(500).json({ message: 'Internal server error' });
    }
}