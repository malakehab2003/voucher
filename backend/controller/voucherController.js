import { Voucher, Store } from "../models/db.js";

export const list = async (req, res) => {
    try {
        const vouchers = await Voucher.findAll({
            include: [
                {
                    model: Store,
                    as: 'store'
                }
            ],
        });

        if (!vouchers) return res.status(400).send({ message: "Can't get vouchers" });

        return res.status(200).send({
            vouchers,
        });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
}


export const getVoucher = async (req, res) => {
    try {
        const voucher = req.voucher;

        if (!voucher) return res.status(400).send({ message: "Can't get voucher" });
        return res.status(200).send({
            voucher,
        });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
}
