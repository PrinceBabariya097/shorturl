import { URL } from "../model/url.js";
const uuid = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uuid = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uuid += characters.charAt(randomIndex);
  }
  return uuid;
};


const generateNewShortURL = async (req, res) => {
  try {
    const url = req.body.url || req.body;
    const newURL = await URL.create({
      url,
      shortUrl: uuid(),
      visitedHistory: [],
      owner:res.user?._id,
    });
    return res.status(201).json(newURL);
  } catch (error) {
    throw error;
  }
};

const redirectToURL = async (req, res) => {
  try {

    const shortUrl = req.params.shorturl;

    if (!shortUrl) return res.status(400).respons("url is requires");

    const urlObject = await URL.findOneAndUpdate(
      { shortUrl },
      {
        $push: { visitedHistory: { timestamps: Date.now() } },
      }
    );


    res.redirect(urlObject.url);

  } catch (error) {

    throw error;

  }
};

const getAnalytics = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const urlData = await URL.findOne(shortUrl);
    const urlClickedCount = urlData.visitedHistory.length;
    return res.status(200).json({ TotalClicked: urlClickedCount, urlData} );
  } catch (error) {
    throw error;
  }
};

export { generateNewShortURL, redirectToURL, getAnalytics };
