const pool = require("./pool");

async function insertUser(
    firstName,
    lastName,
    username,
    password
) {
    const userInsertQuery = `
        INSERT INTO users (firstname, lastname, username, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `;

    const userValues = [
        firstName,
        lastName,
        username,
        password
    ];

    try {
        const result = await pool.query(userInsertQuery, userValues);
        const userId = result.rows[0].id;
        console.log('User inserted successfully with ID:', userId);

        return userId;
    } catch(err) {
        console.error('Error inserting user:', err.message);
        throw new Error(`Error inserting user: ${err.message}`);
    }
}

async function updateMembership(username, newMembership) {
    const upgradeMembershipQuery = `
        UPDATE users
        SET membership = $1
        WHERE LOWER(username) = LOWER($2);
    `;

    try {
        await pool.query(upgradeMembershipQuery, [newMembership, username]);
        console.log(`Membership upgraded to ${newMembership} for user: ${username}`);
    } catch (err) {
        console.error('Error updating membership:', err.message);
        throw new Error(`Error updating membership: ${err.message}`);
    }
}

async function addMessage(userId, title, content) {
    const addMessageQuery = `
        INSERT INTO messages (title, content, user_id)
        VALUES($1, $2, $3);
    `;

    const messageValues = [
        title,
        content,
        userId
    ];

    try {
        await pool.query(addMessageQuery, messageValues);
        console.log('message inserted succesfully for user with ID:', userId);
    } catch(err) {
        console.error('Error inserting message:', err.message);
        throw new Error(`Error inserting message: ${err.message}`);
    }
}

async function getMessages() {
    const getMessagesQuery = `
    SELECT messages.title, messages.content, messages.timestamp, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id;
    `;

    try {
        const result = await pool.query(getMessagesQuery);
        return result.rows; 
    } catch(err) {
        console.error('Error receiving messages:', err.message);
        throw new Error(`Error receiving messages: ${err.message}`);
    }
}

module.exports = {
    insertUser,
    updateMembership,
    addMessage,
    getMessages
}



