const query = require("./pool");

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
        const result = await query(userInsertQuery, userValues);
        const userId = result.rows[0].id;
        console.log('User inserted successfully with ID:', userId);

        return userId;
    } catch(err) {
        console.error('Error inserting user:', err.message);
        throw new Error(`Error inserting user: ${err.message}`);
    }
}

module.exports = {
    insertUser,
}



