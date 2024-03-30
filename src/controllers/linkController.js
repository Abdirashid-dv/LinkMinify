const shortLink = require("shortlink");
const fs = require("fs");

exports.shorten = (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.status(400).send({ error: "Url is required" });
    }

    const shortUrl = shortLink.generate(8);
    const decodedUrl = shortLink.decode(shortUrl);
    const data = {
        shortUrl,
        decodedUrl,
        originalUrl: url,
    };

    fs.writeFileSync("links.json", JSON.stringify(data, null, 2), {
        flag: "a",
    });

    res.status(200).send({
        shortLink: `https://link-minify.vercel.app/${shortUrl}`,
    });
};

exports.redirectUrl = (req, res) => {
    fs.readFile("links.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send({ error: "Internal Server Error" });
        }

        const links = JSON.parse(data);
        const shortUrl = req.path.replace("/", "");
        const decodedUrl = shortLink.decode(shortUrl);

        const findLink = links.find(
            (link) =>
                link.shortUrl === shortUrl && link.decodedUrl === decodedUrl
        );

        if (!findLink) {
            return res.status(404).send({ error: "Link not found" });
        }

        res.redirect(findLink.originalUrl);
    });
};
