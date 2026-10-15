const quoteElement = document.querySelector('#quote');
const authorElement = document.querySelector('#author');
const statusElement = document.querySelector('#status');
const quoteButton = document.querySelector('#newQuote');

async function loadQuote() {
  quoteButton.disabled = true;
  quoteButton.querySelector('span:first-child').textContent = 'Finding a quote...';
  statusElement.textContent = 'Connecting to the quote API...';

  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) {
      throw new Error(`Quote request failed with status ${response.status}`);
    }

    const quote = await response.json();
    if (!quote.quote || !quote.author) {
      throw new Error('The API returned an incomplete quote.');
    }

    quoteElement.textContent = `“${quote.quote}”`;
    authorElement.textContent = `— ${quote.author}`;
    statusElement.textContent = 'A fresh quote, just for you.';
  } catch (error) {
    quoteElement.textContent = 'Could not fetch a quote. Please check your connection and try again.';
    authorElement.textContent = '— Team Quote';
    statusElement.textContent = 'The quote service is unavailable right now.';
    console.error('Unable to load a quote:', error);
  } finally {
    quoteButton.disabled = false;
    quoteButton.querySelector('span:first-child').textContent = 'Find another quote';
  }
}

quoteButton.addEventListener('click', loadQuote);
