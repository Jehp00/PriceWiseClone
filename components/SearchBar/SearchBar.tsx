"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { error } from "console";
import { FormEvent, useState } from "react"

const isValidAmazonProductUrl = (url: string) => {
  try {
    const parseUrl = new URL(url)
    const hostname = parseUrl.hostname;
    if (hostname.includes("amazon.com") || hostname.includes('amazon.') || hostname.endsWith("amazon")) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

const SearchBar = () => {
  const [SearchPrompt, SetSearchPrompt] = useState('')
  const [isLoading, setLoading] = useState(false);
  const handleSubmitting = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductUrl(SearchPrompt)

    if (!isValidLink) alert("Please provide a valid link")

    try {
      setLoading(true)

      // Scrapethe product page
      const product = await scrapeAndStoreProduct(SearchPrompt)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form 
      className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmitting}>
      <input type="text" value={SearchPrompt} onChange={(e) => SetSearchPrompt(e.target.value)} placeholder="Enter Product Link" className="searchbar-input" />
      <button type="submit" className="searchbar-btn" disabled={SearchPrompt === ''}>
        {isLoading ? "Searching..." : "Search"}
      </button>
      </form>
    </div>
  )
}

export default SearchBar
