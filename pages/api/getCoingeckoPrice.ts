import { NextApiRequest, NextApiResponse } from "next";
import { fetchFromCoinGecko } from "@/utils/apis/coingecko-utils";
import { handleApiError } from "@/utils/apis/handleApiError";

export default async function getCoingeckoPrice(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { symbol } = req.query;
  if (!symbol) {
    res.status(400).json({ error: "Missing symbol. Example: ?symbol=bitcoin" });
    return;
  }

  try {
    const data = await fetchFromCoinGecko(
      `/coins/markets?vs_currency=usd&ids=${symbol}`
    );
    res.status(200).json(data);
  } catch (error) {
    handleApiError(error, res);
  }
}
