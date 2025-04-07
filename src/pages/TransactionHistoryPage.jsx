// src/pages/TransactionHistoryPage.jsx
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Helper function to format receipt content (can be reused)
const formatReceiptHtml = (transaction) => {
  const itemsHtml = transaction.items.map(item => `
    <li>
      ${item.product.name} - ${item.quantity} x $${item.product.price.toFixed(2)} = $${(item.quantity * item.product.price).toFixed(2)}
    </li>
  `).join('');

  return `
    <html>
    <head>
      <title>Receipt - ${transaction.id}</title>
      <style>
        body { font-family: sans-serif; margin: 20px; }
        h2, h3 { margin-bottom: 5px; }
        ul { list-style: none; padding: 0; margin-top: 10px; }
        li { margin-bottom: 5px; }
        .total { margin-top: 15px; font-weight: bold; font-size: 1.1em; }
        hr { border: none; border-top: 1px dashed #ccc; margin: 15px 0; }
      </style>
    </head>
    <body>
      <h2>Receipt</h2>
      <p><strong>Transaction ID:</strong> ${transaction.id}</p>
      <p><strong>Timestamp:</strong> ${new Date(transaction.timestamp).toLocaleString()}</p>
      <hr />
      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>
      <hr />
      <p class="total">Total: $${transaction.total.toFixed(2)}</p>
      <p style="margin-top: 20px; font-size: 0.8em; text-align: center;">Thank you for your purchase!</p>
    </body>
    </html>
  `;
};


function TransactionHistoryPage() {
  // Load transactions from local storage
  const [transactions, setTransactions] = useLocalStorage('transactions', []);

  const formatDate = (isoString) => {
    // ... (keep existing formatDate function) ...
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleString(); // Formats date and time based on user's locale
    } catch (e) {
        return 'Invalid Date';
    }
  };

  // --- Button Handlers ---

  const handlePrintReceipt = (transaction) => {
    const receiptHtml = formatReceiptHtml(transaction);
    const printWindow = window.open('', '_blank', 'height=600,width=400');

    if (printWindow) {
      printWindow.document.write(receiptHtml);
      printWindow.document.close(); // Necessary for some browsers
      printWindow.focus(); // Focus on the new window
      // Use timeout to ensure content is loaded before printing
      setTimeout(() => {
            printWindow.print();
            // You might want to close the window after printing, but browsers might block this
            // printWindow.close();
        }, 500); // Adjust timeout if needed
    } else {
      alert('Could not open print window. Please check your popup blocker settings.');
    }
  };

  const handleEmailReceipt = (transaction) => {
    const email = window.prompt(`Enter the email address to send the receipt for Transaction ${transaction.id}:`);

    if (email && email.trim() !== '') { // Basic check if email is entered
      // In a real app, you'd likely want better email validation
      const receiptText = `
        Receipt\n
        Transaction ID: ${transaction.id}\n
        Timestamp: ${new Date(transaction.timestamp).toLocaleString()}\n
        --------------------\n
        Items:\n
        ${transaction.items.map(item => `- ${item.product.name} (${item.quantity} x $${item.product.price.toFixed(2)}) = $${(item.quantity * item.product.price).toFixed(2)}`).join('\n')}
        --------------------\n
        Total: $${transaction.total.toFixed(2)}\n
        --------------------\n
        Thank you!
      `;

      // ** SIMULATION **
      // Replace this console.log with an API call to your backend or an EmailJS call
      console.log(`****** SIMULATING EMAIL ******`);
      console.log(`To: ${email}`);
      console.log(`Subject: Your Receipt (Transaction ${transaction.id})`);
      console.log(`Body:\n${receiptText}`);
      console.log(`*****************************`);

      alert(`Simulation: Receipt for ${transaction.id} would be sent to ${email}. Check the console (F12) for details.`);

    } else if (email !== null) { // User clicked OK but entered nothing
        alert('No email address provided.');
    } else { // User clicked Cancel
        alert('Email receipt cancelled.');
    }
  };

  // --- Component Return ---

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <ul className="transaction-list">
          {[...transactions].reverse().map(transaction => (
            <li key={transaction.id} className="transaction-item">
              {/* Transaction Details */}
              <h3>Transaction ID: {transaction.id}</h3>
              <p>Timestamp: {formatDate(transaction.timestamp)}</p>
              <p><strong>Total: ${transaction.total.toFixed(2)}</strong></p>
              <p>Items:</p>
              <ul>
                {transaction.items.map(item => (
                  <li key={`${transaction.id}-${item.product.id}`}> {/* More specific key */}
                    {item.product.name} - {item.quantity} x ${item.product.price.toFixed(2)}
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="transaction-actions">
                <button onClick={() => handlePrintReceipt(transaction)}>
                  Print Receipt
                </button>
                <button onClick={() => handleEmailReceipt(transaction)}>
                  Email Receipt
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionHistoryPage;