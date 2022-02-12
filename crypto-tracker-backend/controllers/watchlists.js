const Watchlist = require('../models/Watchlist');


exports.getLists = async (req, res, next) => {
    try {
        const lists = await Watchlist.find();
        res.status(200).json({success: true, count: lists.length, data: lists})
    } catch (error) {
       res.status(400).json({success: false,}) 
    }
}

exports.getList = async (req, res, next) => {
    try {
        const list = await Watchlist.findById(req.params.id);
        if (!list){
            return res.status(400).json({success: false})
        }

        res.status(200).json({ success: true, data: list});
    } catch (error) {
        res.status(400).json({success: false,});
    }
}


exports.createList = async (req, res, next) => {
    try {
        const list = await Watchlist.create(req.body);

        res.status(201).json({success: true, data: list});
    } catch (error) {
        res.status(400).json({success: false})
        
    }
}

exports.updateList = async (req, res, next) => {
    try {
        let list;
        if (req.body.cryptoId){
            await Watchlist.findOneAndUpdate(
                {_id: req.params.id},
                { $pull: { cryptoList: { _id: req.body.cryptoId}}},
                {safe: true, multi: false},
            );
            return res.status(200).json({success: true, message: "Coin has been removed successfully."});

        } else if (req.body.ticker) {
            list = await Watchlist.findByIdAndUpdate(
                req.params.id,
                { $push: { "cryptoList": req.body}},
                {safe: true, upsert: true, new : false},
            );
        } else {
            list = await Watchlist.findByIdAndUpdate(req.params.id, req.body, {
                new: true, 
                runValidators: true,
            });
        }   
    if (!list) {
        return res.status(400).json({success: false});
    }

        res.status(200).json({success: true, data: list});
    } catch (error) {
        res.status(400).json({success: false});
    }
}

exports.deleteList = async (req, res, next) => {
    try {
        const list = await Watchlist.findByIdAndDelete(req.params.id);
        if (!list) {
            return res.status(400).json({success: false});
        }
        res.status(200).json({success: true, message: "List has been deleted successfully"});
    } catch (error) {
        res.status(400).json({success: false});        
    }
}

// exports.deleteCrypto = async (req, res, next) => {
//     console.log(req.route);
//     try {
//         await Watchlist.findOneAndUpdate(
//             {_id: req.params.listId},
//             { $pull: { cryptoList: { _id: req.params.id}}},
//             {safe: true, multi: false},
//         );
//         res.status(200).json({success: true, message: "Coin has been removed successfully."});
//     } catch (error) {
//         res.status(400).json({success: false});
//     }
// }



