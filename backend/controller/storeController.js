import { Store, Voucher } from '../models/db.js';

export const listStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        return res.status(200).json({ stores });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

export const getStoreById = async (req, res) => {
    try {
        const store = await Store.findOne({
            where: {id: req.params.id},
            include: [
                {
                    model: Voucher,
                    as: 'vouchers',
                }
            ]

        });
        const vouchers = await Voucher.findAll({
            where: { storeId: store.id }
        });
        if (!store) return res.status(404).json({ message: "Store not found" });
        return res.status(200).send({ store });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
