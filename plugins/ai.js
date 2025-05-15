const axios = require('axios');
const { OPENAI_API_KEY } = require('../config');  // config.js වෙතින් API Key එක ගන්න

// OpenAI API එකට request එකක් යැවීම
const getAIResponse = async (userQuery) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',  // You can change this based on your use case
                prompt: userQuery,  // User's query goes here
                max_tokens: 100,  // Maximum number of tokens for the response
                temperature: 0.7,  // Controls randomness of the output (0-1)
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,  // Authorization with API Key
                    'Content-Type': 'application/json',  // Setting the Content-Type to JSON
                },
            }
        );
        // AI response එක return කිරීම
        return response.data.choices[0].text.trim();  // Clean the response
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'Sorry, I could not process your request at the moment.';
    }
};

// AI response function export කිරීම
module.exports = { getAIResponse };
