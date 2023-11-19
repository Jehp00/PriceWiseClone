import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapedAmazonProduct } from "@/lib/scaper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

async function GET() {
  try {
    connectToDB()

    const product = await Product.find({})

    if (!product) throw new Error(`Error in GET: No product found`)

    // 1. SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
    const updatedProduct = Promise.all(
      product.map(async (currentProduct) => {
        const scrapedProduct = await scrapedAmazonProduct(currentProduct.url)

        if (!scrapedProduct) throw new Error(`Error in GET: no product found`)

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice }
        ]
  
        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        }
  
      const updatedProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
        product,
        { upsert: true, new: true }
      );

      // 2. CHECK PRODUCT'S STATUS & SEND AN EMAIL ACCORDINGLY
        const emailNotificationType = getEmailNotifType(scrapedProduct, currentProduct)

        if (emailNotificationType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          }
          const emailContent = await generateEmailBody(productInfo, emailNotificationType)

          const userEmails = updatedProduct.users.map((user:any) => user.email)

          await sendEmail(emailContent, userEmails)
        }
        return updatedProduct;
      })
    )
    return NextResponse.json({
      message: 'Ok', data: updatedProduct
  })
  } catch (error) {
    throw new Error(`Error in GET: ${error}`)
  }
}


export default GET;