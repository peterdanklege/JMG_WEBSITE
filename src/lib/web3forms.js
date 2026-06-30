const WEB3FORMS_ACCESS_KEY = '99e81c27-0440-41c3-a73c-f6b877089b95';

/**
 * Submits form data to Web3Forms, which emails it to the configured inbox.
 * Throws an Error if the submission fails so callers can show an error state.
 */
export async function sendContactForm({ subject, ...fields }) {
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject,
            ...fields,
        }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message');
    }

    return result;
}
