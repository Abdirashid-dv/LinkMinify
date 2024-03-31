const shortLink = require("shortlink");
const Link = require("../models/linkModel");
const fs = require("fs");

exports.shorten = async (req, res) => {
    try {
        const url = req.body.url;

        if (!url) {
            return res.status(400).send({ error: "Url is required" });
        }

        const shortCode = shortLink.generate(8);
        const shortUrl = `https://link-minify.vercel.app/${shortCode}`;
        const redirectCode = shortLink.decode(shortCode);

        const link = new Link({
            originalUrl: url,
            redirectCode,
            shortUrl,
        });

        await link.save();

        res.status(200).send({
            shortLink: `https://link-minify.vercel.app/${link.redirectCode}`,
        });
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const redirectCode = shortLink.decode(req.path.replace("/", "").trim());
        const link = await Link.findOne({ redirectCode });

        if (!link) {
            return res.status(404).send({ error: "Link not found" });
        }

        link.clickCount++;

        await link.save();

        res.redirect(link.originalUrl);
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
};
